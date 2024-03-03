<template>
  <div class="max-w-[400px] w-full min-w-[350px] py-10 px-6">
    <form @submit.prevent="onSubmit" v-if="stage === 1">
      <h1 class="text-lg font-semibold text-[#101828] mb-4">Withdrawal</h1>

      <div class="grid gap-x-[25px] gap-y-4 mb-[50px]">
        <FormGroup
          label="How much do you require?"
          :error="errors.amount"
          name="amount"
          classLabel="!normal-case"
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

        <FormGroup
          label="Bank name"
          :error="errors.bankCode"
          name="bankCode"
          v-if="!hasSettlement"
          classLabel="!normal-case"
        >
          <SelectVueSelect
            v-model="bankCode"
            :disabled="loadingBanks"
            :options="banks"
            :reduce="(bank) => bank.value"
            :placeholder="loadingBanks ? 'Fetching list' : 'Select bank'"
            :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
              errors.bankCode ? 'border-red-500' : 'border-[#D0D5DD]'
            }`"
          />
        </FormGroup>
        <div class="" v-if="!hasSettlement">
          <Textinput
            placeholder="Account number"
            label="Account number"
            name="accountNumber"
            v-bind="accountNumberAtt"
            v-model="accountNumber"
            :error="errors.accountNumber"
          />
        </div>
        <div class="" v-if="!hasSettlement">
          <Textinput
            placeholder="Account name"
            label="Account name"
            name="accountName"
            disabled
            v-model="form.accountName"
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
import {
  getBanks,
  viewSettlement,
  addSettlement,
} from "~/services/settlementservice";
import OTP from "./OTP.vue";
import CurrencyInput from "~/components/CurrencyInput";
import { ref, reactive, inject } from "vue";
import { toast } from "vue3-toastify";
import { validateAccount } from "~/services/walletservice";

const props = defineProps({
  balance: {
    default: 800,
  },
});
const banks = ref([]);
const loadingBanks = ref(false);
const stage = ref(1);
const handleWithdraw = inject("handleWithdraw");
const handleClose = inject("handleClose");

const queryParams = reactive({
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  Type: "",
});
const docLoading = ref(true);
function getSettlement() {
  docLoading.value = true;
  // viewSettlement(queryParams).then((res) => {
  //   if (res.data.data.length) {
  //     docLoading.value = false;
  //     setFieldValue("hasSettlement", true);
  //   } else {
  //     setFieldValue("hasSettlement", false);
  //   }
  // });
}
onMounted(() => {
  getSettlement();
  loadingBanks.value = true;
  getBanks().then((res) => {
    if (res.status === 200) {
      loadingBanks.value = false;
      banks.value = res.data.data.responseBody.map((i) => ({
        label: i.name,
        value: i.code.toString(),
      }));
    }
  });
});
const form = reactive({
  hasSettlement: false,
  bankCode: "",
  accountName: "",
  pin: "",
  accountNumber: "",
  amount: null,
  bvn: "",
  dateOfBirth: null,
  balance: props.balance,
});
const formSchema = yup.object().shape({
  balance: yup.number(),
  hasSettlement: yup.boolean(),
  bankCode: yup.string().when("hasSettlement", {
    is: false,
    then: (schema) => schema.required("Bank name is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  accountNumber: yup.string().when("hasSettlement", {
    is: false,
    then: (schema) =>
      schema
        .required("Account number is required")
        .matches(/^\d{10}$/, "Account number must be 10 digits")
        .test("test-account", "Invalid account number", function (value) {
          const bankCode = this.parent.bankCode; // Access bankCode directly
          if (value && value.length === 10 && bankCode) {
            return validateAccount({
              bankCode: bankCode,
              accountNumber: value,
            })
              .then((res) => {
                form.accountName = res.data.data.responseBody.accountName;
                return true; // Resolve the promise if validation is successful
              })
              .catch(() => {
                throw new schema.ValidationError(
                  "Invalid account number",
                  null,
                  "accountNumber"
                );
              });
          } else {
            return true; // Return true if the length is not 10 or bankCode is missing
          }
        }),
    otherwise: (schema) => schema.nullable(),
  }),
  amount: yup
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
const { handleSubmit, defineField, errors, setFieldError, setFieldValue } =
  useForm({
    validationSchema: formSchema,
    initialValues: form,
  });

const [amount] = defineField("amount");
const [bankCode] = defineField("bankCode");
const [accountNumber, accountNumberAtt] = defineField("accountNumber");
const [hasSettlement] = defineField("hasSettlement");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  addSettlement({ ...values, isPrimaryAccount: true }).then((res) => {
    if (res.status === 200) {
      handleWithdraw();
    }
  });
});

function verifyAmount() {
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
