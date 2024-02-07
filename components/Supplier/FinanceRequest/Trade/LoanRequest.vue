<template>
  <form @submit.prevent="onSubmit" class="w-full mt-6">
    <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <FormGroup label="How much do you require?" :error="errors.amountRequired">
        <CurrencyInput
          min="1"
          :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.amountRequired ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
          v-model="amountRequired"
          :options="{
            currency: 'ngn',
            currencyDisplay: 'hidden',
          }"
        />
      </FormGroup>

      <FormGroup label="Tenor" :error="errors.tenor" name="tenor">
        <Select
          v-model="tenor"
          :options="options"
          placeholder="Select tenor"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.tenor ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>
      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Where did you hear about us?"
          name="whereDidYouHearAboutUs"
          v-bind="whereDidYouHearAboutUsAtt"
          v-model="whereDidYouHearAboutUs"
          :error="errors.whereDidYouHearAboutUs"
        />
      </div>
    </div>
    <div class="flex gap-x-4 items-center justify-end">
      <AppButton
        :disabled="isLoading"
        :isLoading="isLoading"
        btnClass="bg-primary-500 text-white !px-16  !text-sm !py-[10px] disabled:cursor-not-allowed"
        type="submit"
        text="Next"
      />
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const isLoading = ref(false);
const formValues = reactive({
  amountRequired: null,
  tenor: "",
  whereDidYouHearAboutUs: "",
});
const active = inject("active");

const schema = yup.object({
  amountRequired: yup.string().required("amountRequired is required"),
  tenor: yup.string().required("Tenor is required"),
  whereDidYouHearAboutUs: yup.string().required("whereDidYouHearAboutUs is required"),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [amountRequired, amountRequiredAtt] = defineField("amountRequired");
const [tenor, tenorAtt] = defineField("tenor");
const [whereDidYouHearAboutUs, whereDidYouHearAboutUsAtt] = defineField("whereDidYouHearAboutUs");
const formData = inject("formData")
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  formData = {...formData, ...values}
  active.value = 2
});

const options = [
  {
    label: "1 month",
    value: 0,
  },
  {
    label: "3 month",
    value: 1,
  },
];
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
