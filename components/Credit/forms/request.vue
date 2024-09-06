<template>
  <div class="bg-[#F9FAFB] border border-[#EAECF0] rounded-lg p-6 text-[#344054] mb-10">
    <p class="mb-6">
      The credit wallet allows you to buy now, and pay later on Matta’s
      marketplace. If your request is approved, you will be given a line of
      credit which we believe is important for your business.
    </p>

    <p>
      You will get a notification via email if your request is approved and you
      can start using your credit wallet to buy on Matta.
    </p>
  </div>
  <div class="flex gap-x-4 items-center justify-end">
    <AppButton
      :disabled="isLoading"
      :isLoading="isLoading"
      @click="active++"
      btnClass="bg-primary-500 text-white !px-12  !text-sm !py-[10px] disabled:cursor-not-allowed"
      type="button"
      text="Proceed"
    />
  </div>
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
const formData = inject("formData");
const schema = yup.object({
  amountRequired: yup
    .number()
    .typeError("invalid value")
    .min(100, "Minimum amount is 100 naira")
    .required("Amount is required"),
  tenor: yup.string().required("Tenor is required"),
  whereDidYouHearAboutUs: yup.string(),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    amountRequired: formData.amountRequired,
    tenor: formData.tenor,
    whereDidYouHearAboutUs: formData.whereDidYouHearAboutUs,
  },
});

const [amountRequired] = defineField("amountRequired");
const [tenor] = defineField("tenor");
const [whereDidYouHearAboutUs, whereDidYouHearAboutUsAtt] = defineField(
  "whereDidYouHearAboutUs"
);

const onSubmit = handleSubmit((values) => {
  formData.amountRequired = values.amountRequired;
  formData.tenor = values.tenor;
  formData.whereDidYouHearAboutUs = values.whereDidYouHearAboutUs;
  active.value = 2;
});

const options = [
  {
    label: "7 days",
    value: 7,
  },
  {
    label: "14 days",
    value: 14,
  },
  {
    label: "30 days",
    value: 30,
  },
  {
    label: "60 days",
    value: 60,
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
