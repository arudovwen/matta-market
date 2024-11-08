<template>
  <div class="bg-white w-full">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      {{ detail ? "Update" : "Add" }} Shipping address
    </legend>
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-4 w-full"
    >
      <div>
        <Textinput
          placeholder=""
          label="First name"
          type="text"
          name="firstName"
          v-bind="firstNameAtt"
          v-model="firstName"
          :error="errors.firstName"
          isCumpulsory
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Last name"
          type="text"
          name="lasttName"
          v-bind="lastNameAtt"
          v-model="lastName"
          :error="errors.lastName"
          isCumpulsory
        />
      </div>

      <FormGroup
        label="Country"
        isCumpulsory
        :error="errors.country"
        name="country"
      >
        <SelectVueSelect
          v-model="country"
          :options="allcountries"
          :reduce="(country) => country.value"
          placeholder="Select country"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.country ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup label="State" isCumpulsory :error="errors.state" name="state">
        <SelectVueSelect
          v-model="state"
          :disabled="!country"
          :options="states"
          :reduce="(state) => state.value"
          placeholder="Select state"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.state ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <FormGroup
        v-if="country.toLowerCase() === 'nigeria'"
        label="LGA"
        isCumpulsory
        :error="errors.lga"
        class="lg:col-span-2"
      >
        <SelectVueSelect
          class="w-full"
          v-model.value="lga"
          :options="lgasOption"
          placeholder="Select your lga"
          name="lga"
          :reduce="(lga) => lga.value"
          :disabled="country?.toLowerCase() !== 'nigeria'"
        />
      </FormGroup>

      <FormGroup
        class="lg:col-span-2"
        isCumpulsory
        label="Street"
        :error="errors.street"
      >
        <SelectSearchSelect
          class="w-full"
          v-model.value="street"
          :options="addressOptions"
          placeholder=""
          name="street"
          :reduce="(address) => address.value"
        />
      </FormGroup>

      <div
        class="flex items-center text-[#333] text-xs md:text-sm gap-x-[2px] max-w-max"
      >
        <input
          type="checkbox"
          label=""
          labelClass="text-xs md:text-sm"
          v-model="isDefault"
        />
        Set as default
      </div>

      <div class="lg:col-span-2 grid gap-y-[22px] mb-9 mt-4">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Submit"
          btnClass="normal-case btn-primary !py-3"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import {
  addshipping,
  editshipping,
  addressSearch,
} from "~/services/cartservice";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "~/utils/countries.json";
import Lgas from "~/utils/lgastate.json";

const isOpen = inject("isOpen");
const detail = inject("detail");
const type = inject("type");
const isLoading = ref(false);
const shippingStore = useShippingStore();
const formValues = {
  id: "",
  firstName: "",
  lastName: "",
  street: "",
  country: "Nigeria",
  state: "",
  lga: "",
  postalCode: "1000",
  city: "lagos",
  isDefault: false,
};
onMounted(() => {
  if (detail?.value) {
    setValues(detail.value);
  }
});

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  street: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("Lga is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  postalCode: yup.string().required("Postal code is required"),
});

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [street, streetAtt] = defineField("street");
const [country, countryAtt] = defineField("country");
const [state, stateAtt] = defineField("state");
const [lga, lgaAtt] = defineField("lga");
const [postalCode, postalCodeAtt] = defineField("postalCode");
const [isDefault] = defineField("isDefault");

const allcountries = computed(() => {
  return CountryList.map((item) => {
    return {
      id: "",
      label: `${item.name}`,
      value: item.name,
    };
  });
});
const mystates = computed(() => {
  if (!country.value) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == country?.value?.toLowerCase()
  ).states;
});

const states = computed(() => {
  return mystates.value.map((item) => {
    return {
      id: item.code,
      label: item.name.toLowerCase().includes("abuja") ? "Abuja FCT" : item.name,
      value: item.name.toLowerCase().includes("abuja") ? "Abuja FCT" : item.name,
    };
  });
});
const lgasOption = computed(() => {
  return Lgas.find(
    (i) => i?.state?.toLowerCase() === state?.value?.toLowerCase()
  )?.lgas?.map((i) => {
    return { label: i, value: i };
  });
});

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  (!detail?.value ? addshipping : editshipping)(values)
    .then((res) => {
      if (res.status === 200) {
        toast.info(detail?.value ? "Address updated" : "Address added");
        isOpen.value = false;
        shippingStore.getAlladdress();
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err?.response?.data?.message || err?.response?.data?.Message) {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message
        );
      }
    });
});

const addressOptions = ref([]);
watch(street, () => {
  const values = {
    address: street.value,
    state: state.value,
    lga: lga.value,
  };
  addressSearch(values).then((res) => {
    if (res.status === 200) {
      addressOptions.value = res.data.map((i) => ({
        label: i.label,
        value: i.label,
      }));
    }
  });
});
</script>
