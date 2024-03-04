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
import { getBanks } from "~/services/settlementservice";
import OTP from "./OTP.vue";
import CurrencyInput from "~/components/CurrencyInput";
import { ref, reactive, inject } from "vue";

const props = defineProps({
  balance: {
    default: 800,
  },
  hasSettlement: {
    default: true,
  },
});

const stage = ref(1);
const handleWithdraw = inject("handleWithdraw");
const handleClose = inject("handleClose");

const form = reactive({
  amount: null,
  balance: props.balance,
});
const formSchema = yup.object().shape({
  balance: yup.number(),

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
const { handleSubmit, defineField, errors} =
  useForm({
    validationSchema: formSchema,
    initialValues: form,
  });

const [amount] = defineField("amount");

const onSubmit = handleSubmit((values) => {
  handleWithdraw();
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
