<template>
  <div class="bg-white w-full">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      Shipping address
    </legend>
    <form
      @submit.prevent="onSubmit"
      class="grid grid-cols-1 xl:grid-cols-2 gap-x-[18px] gap-y-4 w-full"
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
        />
      </div>

      <div>
        <Textinput
          placeholder=""
          label="Country"
          type="tel"
          name="country"
          classInput="!h-[45px]"
          v-model="country"
          v-bind="countryAtt"
          :error="errors.country"
        />
      </div>
    
      <div>
        <Textinput
          placeholder=""
          label="City"
          type="text"
          name="city"
          classInput="!h-[45px]"
          v-model="city"
          v-bind="cityAtt"
          :error="errors.city"
        />
      </div>  <div class="xl:col-span-2">
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
      <div>
        <Textinput
          placeholder=""
          label="Postal code"
          type="tel"
          name="postalCode"
          classInput="!h-[45px]"
          v-model="postalCode"
          v-bind="postalCodeAtt"
          :error="errors.postalCode"
        />
      </div>
      <div
        class="flex items-center text-[#333] darks:text-slate-400 text-xs md:text-sm gap-x-[2px]"
      >
        <Checkbox
          label="Set default"
          labelClass="text-xs md:text-sm"
          v-model="isDefault"
          v-bind="isDefaultAtt"
        />
      </div>

      <div class="xl:col-span-2 grid gap-y-[22px] mb-9 mt-4">
        <AppButton
          type="submit"
          :isLoading="isLoading"
          :isDisabled="isLoading"
          text="Update address"
          btnClass="normal-case btn-primary !py-3"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from 'vue3-toastify';
import { editshipping, } from "~/services/cartservice";

const isOpen = inject("isOpen");
const detail = inject("detail")
const type = inject("type")
const isLoading = ref(false);
const formValues = {
  id:"",
  firstName: "",
  lastName: "",
  street: "",
  country: "",
  city: "",
  postalCode: "",
  isDefault: false,
};
onMounted(() => {
  setValues(detail.value)
})
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  street: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Postal code is required"),
});

const { handleSubmit, defineField, errors,setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [firstName, firstNameAtt] = defineField("firstName");
const [lastName, lastNameAtt] = defineField("lastName");
const [street, streetAtt] = defineField("street");
const [country, countryAtt] = defineField("country");
const [city, cityAtt] = defineField("city");
const [postalCode, postalCodeAtt] = defineField("postalCode");
const [isDefault, isDefaultAtt] = defineField("isDefault");


const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  editshipping(values)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Address updated");
        isOpen.value = false;
        useshippingStore.getAlladdress()
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if ((err.response.data.message || err.response.data.Message)) {
        toast.error((err.response.data.message || err.response.data.Message));
      }
    });
});
</script>
