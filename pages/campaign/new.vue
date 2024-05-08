<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <HeaderComponent title="New Campaign" :canGoback="true" />
    <div>
      <div class="flex gap-x-[76px] pt-[30px] px-4 lg:px-[30px] flex-col lg:flex-row gap-y-7 lg:gap-y-">
        <div class="w-[250px]">
          <h2 class="text-sm text-[#101828] font-semibold">Campaign Details</h2>
          <p class="text-xs text-[#475467]">
            Provide the required campaign information
          </p>
        </div>
        <form @submit.prevent="onSubmit" class="flex-1">
          <div class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
            <Textinput
              placeholder=""
              label="Campaign Name"
              name="about"
              v-bind="aboutAtt"
              v-model="about"
              :error="errors.about" isCumpulsory
            />

            <FormGroup isCumpulsory label="Discount type" :error="errors.tenor" name="tenor">
              <Select
                v-model="tenor"
                :options="options"
                placeholder="Select tenor"
                :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                  errors.tenor ? 'border-red-500' : 'border-[#D0D5DD]'
                }`"
              />
            </FormGroup>

            <FormGroup isCumpulsory label="Discount value" :error="errors.amount">
              <CurrencyInput
                min="1"
                :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                  errors.amount ? 'border-red-500' : 'border-[#D0D5DD]'
                }`"
                v-model="amount"
                :options="{
                  currency: 'ngn',
                  currencyDisplay: 'hidden',
                }"
              />
            </FormGroup>
            <FormGroup isCumpulsory label="Number of usage per user" :error="errors.amount">
              <CurrencyInput
                min="1"
                :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                  errors.amount ? 'border-red-500' : 'border-[#D0D5DD]'
                }`"
                v-model="amount"
                :options="{
                  currency: 'ngn',
                  currencyDisplay: 'hidden',
                }"
              />
            </FormGroup>
            <Textinput isCumpulsory
              placeholder=""
              label="Expiration Date"
              type="date"
              name="about"
              v-bind="aboutAtt"
              v-model="about"
              :error="errors.about"
            />

            <Textinput
              placeholder=""
              label="Code Use Limit (Optional)"
              name="about"
              v-bind="aboutAtt"
              v-model="about"
              :error="errors.about"
            />
            <div class="md:col-span-2">
              <FormGroup label="User types" :error="errors.tenor" name="tenor">
                <Select
                  v-model="tenor"
                  :options="options"
                  placeholder="Select tenor"
                  :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                    errors.tenor ? 'border-red-500' : 'border-[#D0D5DD]'
                  }`"
                />
              </FormGroup>
            </div>
          </div>
          <div class="flex gap-x-4 items-center justify-end">
            <AppButton
              :disabled="isLoading"
              :isLoading="isLoading"
              btnClass="bg-primary-500 text-white !px-8  !text-sm !py-[10px] disabled:cursor-not-allowed"
              type="submit"
              text="Create campaign"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const isLoading = ref(false);
const formValues = reactive({
  amount: null,
  tenor: "",
  about: "",
});


const schema = yup.object({
  amount: yup.string().required("Amount is required"),
  tenor: yup.string().required("Tenor is required"),
  about: yup.string().required("About is required"),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [amount, amountAtt] = defineField("amount");
const [tenor, tenorAtt] = defineField("tenor");
const [about, aboutAtt] = defineField("about");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);

  active.value = 2;
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
