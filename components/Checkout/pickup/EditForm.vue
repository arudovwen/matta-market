<template>
  <div class="bg-white w-full">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      {{ detail ? "Update" : "Add" }} Pickup location
    </legend>
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-4 w-full"
    >
      <div class="lg:col-span-2">
        <Textinput
          placeholder=""
          label="Location name"
          type="text"
          name="storeName"
          v-bind="storeNameAtt"
          v-model="storeName"
          :error="errors.storeName"
          isCumpulsory
        />
      </div>
      <div>
        <FormGroup label="Phone number" isCumpulsory  :error="errors.phoneNumber">
          <FormsPhoneCodes v-model="phoneNumber" />
        </FormGroup>
      </div>
      <FormGroup
        label="Country"
        :error="errors.country"
        name="country"
        isCumpulsory
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

      <FormGroup label="State" :error="errors.state" name="state" isCumpulsory>
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
        isCumpulsory
        label="LGA"
        :error="errors.lga"
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
        isCumpulsory
        class="lg:col-span-2"
        label="Address"
        :error="errors.address"
      >
        <SelectSearchSelect
          class="w-full"
          v-model.value="address"
          :options="addressOptions"
          placeholder=""
          name="address"
          :reduce="(address) => address.value"
        />
      </FormGroup>

      <div
        class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 mb-9 mt-8"
      >
        <AppButton
          type="button"
          :isDisabled="isLoading"
          @click="isOpen = false"
          text="Cancel"
          btnClass="normal-case bg-trnasparent border border-gray-100 rounded-lg !py-3"
        />
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
  addPickupLocation,
  editPickupLocation,
  addressSearch,
} from "~/services/cartservice";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "~/utils/countries.json";
import Lgas from "~/utils/lgastate.json";

const isOpen = inject("isOpen");
const detail = inject("detail");
// const type = inject("type");
const isLoading = ref(false);
const pickupStore = usePickupStore();
const formValues = {
  id: "",
  storeName: "",
  address: "",
  country: "Nigeria",
  state: "",
  lga: "",
  phoneNumber: "",
};
onMounted(() => {
  if (detail?.value) {
    setValues(detail.value);
  }
});
const schema = yup.object({
  storeName: yup.string().required("First name is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().when("country", {
    is: "Nigeria",
    then: (schema) => schema.required("Lga is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phoneNumber: yup.string().required("Phone number is required"),
});

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [storeName, storeNameAtt] = defineField("storeName");
const [country] = defineField("country");
const [state] = defineField("state");
const [phoneNumber] = defineField("phoneNumber");
const [lga] = defineField("lga");
const [address, addressAtt] = defineField("address");

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
    (item) => item.name.toLowerCase() == country.value.toLowerCase()
  ).states;
});

const states = computed(() => {
  return mystates.value.map((item) => {
    return {
      id: item.code,
      label: item.name,
      value: item.name,
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
const addressOptions = ref([]);
watch(address, () => {
  addressSearch({ text: address.value }).then((res) => {
    if (res.status === 200) {
      addressOptions.value = res.data.map((i, index) => ({
        label: i.label,
        value: `${i.label}-${index}`,
      }));
    }
  });
});
const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  (detail?.value ? editPickupLocation : addPickupLocation)(values)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Address updated");
        isOpen.value = false;
        pickupStore.getAlladdress();
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
</script>
