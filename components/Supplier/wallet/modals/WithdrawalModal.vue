<template>
  <div class="max-w-[400px] py-10 px-6">
    <form @submit.prevent="onSubmit" v-if="stage === 1">
      <h1 class="text-lg font-semibold text-[#101828] mb-4">Withdrawal</h1>

      <div
        class="px-5 py-[14px] bg-[#182230] rounded-[5px] flex justify-between gap-x-40 relative mb-3"
      >
        <div class="flex gap-x-2 items-start">
          <AppIcon icon="quill:info" iconClass="text-white text-lg" />
          <p class="text-white text-xs max-w-[660px]">
            We need your BVN and date of birth to verify your account details.
          </p>
        </div>
      </div>

      <div class="grid gap-x-[25px] gap-y-4 mb-[50px]">
        <div class="">
          <Textinput
            placeholder="Enter your BVN"
            label="BVN"
            name="bvn"
            v-bind="bvnAtt"
            v-model="bvn"
            :error="errors.bvn"
          />
        </div>
        <div class="">
          <Textinput
            placeholder=""
            label="Date of Birth"
            name="dateOfBirth"
            v-bind="dateOfBirthAtt"
            v-model="dateOfBirth"
            :error="errors.dateOfBirth"
            type="date"
          />
        </div>
        <FormGroup
          label="How much do you require?"
          :error="errors.amount"
          name="amount"
        >
          <div class="flex items-center">
            <CurrencyInput
              min="1"
              :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                errors.amount ? 'border-red-500' : 'border-[#D0D5DD]'
              }`"
              placeholder="Amount"
              v-model="amount"
              :options="{
                currency: 'ngn',
                currencyDisplay: 'hidden',
              }"
            />
            <span class="absolute right-4">NGN</span>
          </div>
        </FormGroup>

        <FormGroup label="Bank name" :error="errors.bankName" name="bankName">
          <Select
            v-model="bankName"
            :options="options"
            placeholder="Select bank"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.bankName ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <div class="">
          <Textinput
            placeholder="Account number"
            label="Account number"
            name="accountNo"
            v-bind="accountNoAtt"
            v-model="accountNo"
            :error="errors.accountNo"
          />
        </div>
        <div class="">
          <Textinput
            placeholder="Account name"
            label="Account name"
            name="accountName"
            v-bind="accountNameAtt"
            v-model="accountName"
            :error="errors.accountName"
          />
        </div>
      </div>
      <div class="flex gap-x-4 items-center justify-end">
        <AppButton
          @click="handleClose"
          btnClass="bg-transparent text-white !px-[14px]  !text-sm !py-[10px] border !text-matta-black w-full"
          type="button"
          text="Cancel"
        />
        <AppButton
          :disabled="isLoading"
          :isLoading="isLoading"
          btnClass="bg-primary-500 text-white !px-[14px]  !text-sm !py-[10px] disabled:cursor-not-allowed w-full"
          type="submit"
          text="Submit"
        />
      </div>
    </form>
    <div v-if="stage === 2">
      <OTP />
    </div>
  </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

import OTP from "./OTP.vue";
import CurrencyInput from "~/components/CurrencyInput";
import { ref, reactive, inject } from "vue";
import { toast } from "vue3-toastify";
import { loginUser } from "~/services/authservices";

const stage = ref(1);
const handleWithdraw = inject("handleWithdraw");
const handleClose = inject("handleClose");
const details = inject("details");
const options = [
  {
    label: "Access bank",
    value: "access bank",
  },
];
const form = reactive({
  bankName: "",
  accountName: "",
  pin: "",
  accountNo: "",
  amount: null,
  bvn: "",
  dateOfBirth: null,
});
const formSchema = yup.object().shape({
  bankName: yup.string().required("Bank name is required"),
  accountName: yup.string().required("Account name is required"),
  accountNo: yup
    .string()
    .required("Account number is required")
    .matches(/^\d{10}$/, "Account number must be 10 digits"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number"),
  bvn: yup
    .string()
    .required("BVN is required")
    .matches(/^\d{11}$/, "BVN must be 11 digits")
    .test("isValidBvn", "Invalid BVN", (value) => {
      // You can add custom validation logic here if needed
      // For example, checking against a real BVN service
      return true; // Just returning true for demonstration
    }),
  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth must be in the past"),
});
const isLoading = ref(false);
const { handleSubmit, defineField, errors, setFieldError } = useForm({
  validationSchema: formSchema,
  initialValues: form,
});

const [amount] = defineField("amount");
const [bankName] = defineField("bankName");
const [accountNo, accountNoAtt] = defineField("accountNo");
const [dateOfBirth, dateOfBirthAtt] = defineField("dateOfBirth");
const [accountName, accountNameAtt] = defineField("accountName");
const [bvn, bvnAtt] = defineField("bvn");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  handleWithdraw();
});

function verifyAmount(){
  setFieldError("amount", "Insufficient funds");
}
watch(amount, () => {
  console.log("🚀 ~ watch ~ amount:", amount);
 
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
