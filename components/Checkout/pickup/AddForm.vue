<template>
  <div class="bg-white w-full md:min-w-[520px]">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      Add Pickup location
    </legend>
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 xl:grid-cols-2 gap-x-[18px] gap-y-4 w-full"
    >
      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Location name"
          type="text"
          name="locationName"
          v-bind="locationNameAtt"
          v-model="locationName"
          :error="errors.locationName"
        />
      </div>
      <div>
        <FormGroup label="Phone number">
          <FormsPhoneCodes v-model="phone" />
        </FormGroup>
      </div>
      <FormGroup label="Country" :error="errors.country" name="country">
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

      <FormGroup label="State" :error="errors.state" name="state">
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
        v-if="country?.toLowerCase() == 'nigeria'"
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
        />
      </FormGroup>
      <div class="xl:col-span-2">
        <Textinput
          placeholder=""
          label="Address"
          name="street"
          classInput="!h-[45px]"
          v-model="street"
          v-bind="streetAtt"
          :error="errors.street"
        />
      </div>
     

      <div class="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5  mb-9 mt-8">
        <AppButton
          type="button"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          @click="isOpen = false"
          text="Cancel"
          btnClass="normal-case bg-transparent border !border-gray-200 rounded-lg !py-3"
        />
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Update location"
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
import { addshipping } from "~/services/cartservice";
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "@/utils/countries.json";
import Lgas from "@/utils/lgastate.json";

const isOpen = inject("isOpen");
const shippingStore = useShippingStore();
const isLoading = ref(false);
const formValues = {
  locationName: "",
  lastName: "",
  street: "",
  country: "",
  state: "",
  lga: "",
  phone: "",
  isDefault: false,
};

const schema = yup.object({
  locationName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  street: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  phone: yup.string().required("Postal code is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [locationName, locationNameAtt] = defineField("locationName");
const [lastName, lastNameAtt] = defineField("lastName");
const [street, streetAtt] = defineField("street");
const [country, countryAtt] = defineField("country");
const [state, stateAtt] = defineField("state");
const [phone, phoneAtt] = defineField("phone");
const [lga, lgaAtt] = defineField("lga");
const [isDefault, isDefaultAtt] = defineField("isDefault");

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

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  addshipping(values)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Address added");
        shippingStore?.getAlladdress();
        isOpen.value = false;
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if (err.response.data.message || err.response.data.Message) {
        toast.error(err.response.data.message || err.response.data.Message);
      }
    });
});
</script>
