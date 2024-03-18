<template>
  <div class="max-w-[400px] w-full min-w-[350px] py-10 px-6">
    <form @submit.prevent="onSubmit" v-if="stage === 1">
      <h1 class="text-lg font-semibold text-[#101828] mb-4">Withdrawal</h1>

      <div class="grid gap-x-[25px] gap-y-4 mb-[50px]">
        <FormGroup
          label="How much do you require?"
          :error="errors.withdrawalAmount"
          name="withdrawalAmount"
          classLabel="!normal-case"
        >
          <div class="flex items-center">
            <CurrencyInput
              min="1"
              :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
                errors.withdrawalAmount ? 'border-red-500' : 'border-[#D0D5DD]'
              }`"
              placeholder="Amount"
              v-model="withdrawalAmount"
              :options="{
                currency: 'ngn',
                currencyDisplay: 'hidden',
              }"
            />
            <span class="absolute right-4">NGN</span>
          </div>
        </FormGroup>
        <FormGroup label="Bank" :error="errors.bankCode" name="bankCode">
          <SelectVueSelect
            v-model="bankCode"
            :disabled="!banks.length"
            :options="banks"
            :reduce="(bank) => bank.value"
            :placeholder="!banks.length ? 'Fetching list' : 'Select bank'"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.bankCode ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <div class="">
          <Textinput
            placeholder="Account number"
            label="Account number"
            name="accountNumber"
            v-bind="accountNumberAtt"
            v-model="accountNumber"
            :error="errors.accountNumber"
          />
        </div>
        <div class="" v-if="form.accountName">
          <Textinput
            placeholder="Account name"
            label="Account name"
            name="accountName"
            v-model="form.accountName"
            disabled
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
  <ActionModal
    :open="isErrorOpen"
    type="reject"
    title="Request Failed"
    :text="errorText"
    btnText="Retry"
    :isCancel="false"
    @actionItem="() => (isErrorOpen = false)"
    @close="() => (isErrorOpen = false)"
  />
  <RequestLoader :open="isLoading" />
</template>
<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import OTP from "./OTP.vue";
import CurrencyInput from "~/components/CurrencyInput";
import { ref, reactive, inject } from "vue";
import { withdrawFunds } from "~/services/walletservice";

const isErrorOpen = ref(false);
const settlements = inject("settlements");
const errorText = ref("Wallet creation request failed");
const props = defineProps({
  balance: {
    default: 800,
  },
  hasSettlement: {
    default: true,
  },
  banks: {
    default: () => [],
  },
});

const stage = ref(1);
const handleClose = inject("handleClose");
const form = reactive({
  withdrawalAmount: null,
  narration: "withdraw",
  balance: props.balance,
  accountNumber: "",
  currency: "NGN",
  bankCode: "",
});

const formSchema = yup.object().shape({
  balance: yup.number(),
  bankCode: yup.string().when("hasSettlement", {
    is: false,
    then: (schema) => schema.required("Bank name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountNumber: yup.string().when("hasSettlement", {
    is: false,
    then: (schema) =>
      schema
        .matches(/^\d{10}$/, "Account number must be 10 digits")
        .test("test-account", "Invalid account number", function (value) {
          const { bankCode } = this.parent || {}; // Destructure bankCode safely
          if (value && value.length === 10 && bankCode) {
            return validateAccount({
              bankCode: bankCode,
              accountNumber: value,
            })
              .then((res) => {
                form.accountName = res.data.data.responseBody.accountName;
                return true; // Resolve the promise if validation is successful
              })
              .catch((err) => {
                throw new yup.ValidationError(
                  "Invalid account number",
                  null,
                  "accountNumber"
                );
              });
          } else {
            return true; // Return true if the length is not 10 or bankCode is missing
          }
        })
        .required("Account number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  customerName: yup.string().required("Customer name is required"),
  withdrawalAmount: yup
    .number()
    .required("Amount is required")
    .test("balance-validation", "Exceeded current balance", function (value) {
      const balance = this.parent.balance;

      if (value && balance) {
        return value <= balance;
      }
      return true; // Return true if no validation needed
    })
    .positive("Amount must be a positive number"),
});

const isLoading = ref(false);
const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: form,
});

const [withdrawalAmount] = defineField("withdrawalAmount");
const handleComplete = inject("handleComplete");
const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  withdrawFunds(values)
    .then((res) => {
      if (res.status === 200) {
        handleComplete("Your withdraw request is being processed");
      }
    })
    .catch((err) => {
      errorText.value =
        err.response.data.message ||
        JSON.parse(err.response.data.Message)?.responseMessage ||
        "Wallet creation request failed";
      isErrorOpen.value = true;
      isLoading.value = false;
    });
});
watch(props.banks, () => {
  if (props.banks.length) {
    const bankCode = props.banks.find(
      (i) =>
        i.label.toLowerCase() ===
        defaultsettlement.value?.bankName.toLowerCase()
    );
    console.log("🚀 ~ watch ~ bankCode:", bankCode.value);
    setFieldValue("bankCode", bankCode.value);
  }
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
