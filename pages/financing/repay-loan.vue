<template>
  <div
    v-if="!isSuccessOpen"
    class="bg-white w-full md:min-w-[400px] text-[#344054]"
  >
    <legend class="block text-[20px] font-bold mb-8 text-left">
      Loan Repayment
    </legend>
    <form @submit.prevent="onSubmit" class="grid gap-y-4 w-full">
      <FormGroup
        label="Repayment type"
        :error="errors.repaymentType"
        name="repaymentType"
        isCumpulsory
      >
        <SelectVueSelect
          v-model="repaymentType"
          :options="options"
          :reduce="(repaymentType) => repaymentType.value"
          placeholder="Select repayment type"
          :clearable="false"
          :classInput="`min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !h-11 cursor-pointer ${
            errors.repaymentType ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
        />
      </FormGroup>

      <FormGroup
        label="Amount"
        :error="errors.amount"
        name="amount"
        :isCumpulsory="true"
      >
        <CurrencyInput
          min="1"
          :class="`outline-none px-[14px] py-[10px] min-w-[180px] w-full !bg-white border !rounded-lg !text-[#475467] !h-11 cursor-pointer placeholder:text-[14px] ${
            errors.amount ? 'border-red-500' : 'border-[#D0D5DD]'
          }`"
          v-model="amount"
          :options="{
            currency: 'ngn',
            currencyDisplay: 'hidden',
          }"
          :placeholder="`Amount left: ${currencyFormat(
            detail?.repaymentAmount - detail?.totalPayed
          )}`"
        />
        <div
          v-if="amount > balance?.availableBalance && active === 'wallet'"
          class="mt-2 text-sm text-red-500"
        >
          amount is more than your wallet balance
        </div>
      </FormGroup>

      <div class="grid gap-y-4">
        <div
          v-for="n in content"
          :key="n.label"
          @click="
            () => {
              active = n.value;
            }
          "
          class="border border-[#D0D5DD] rounded-xl p-5 flex justify-between items-center"
        >
          <span class="flex gap-x-3 items-center">
            <span class="text-xl"><AppIcon :icon="n.icon" /></span>
            <span class="text-sm font-medium">
              <span class="block font-medium">{{ n.label }}</span>
              <span v-if="n.value === 'wallet'" class="text-xs font-normal"
                >Balance:
                {{ currencyFormat(balance?.availableBalance || 0) }}</span
              >
            </span>
          </span>

          <span :class="active === n.value ? 'text-primary-500' : ''"
            ><AppIcon
              :icon="
                active === n.value
                  ? 'fa-solid:dot-circle'
                  : 'pepicons-pencil:circle-big'
              "
          /></span>
        </div>
      </div>
      <div class="mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AppButton
            type="button"
            :isDisabled="isLoading"
            @click="isOpen = false"
            text="Cancel"
            btnClass="normal-case bg-transparent border border-[#D0D5DD] rounded-lg !py-3"
          />
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="
              isLoading ||
              (amount > balance?.availableBalance && active === 'wallet')
            "
            text="Make payment"
            btnClass="normal-case btn-primary !py-3"
          />
        </div>
      </div>
    </form>
  </div>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Request Successful"
    text="Your payment is being processed, you will be notified as soon as it is completed"
    btn-text="Done"
    :isOkay="true"
    :isCancel="false"
    :canClose="false"
    @actionItem="
      () => {
        isOpen = false;
        isSuccessOpen = false;
      }
    "
  />
</template>
<script setup>
import { nanoid } from "nanoid";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { getWalletBalance, walletRepayment } from "~/services/walletservice";
import { payWithMonnify } from "~/utils/monnify";

const authStore = useAuthStore();
const active = ref("monnify");
const isOpen = inject("isOpen");
const isLoading = ref(false);
const data = ref(null);
const props = defineProps(["detail"]);
const isSuccessOpen = ref(false);
const formValues = {
  id: "",
  amount: null,
  repaymentType: "partial",
  max: props.detail?.repaymentAmount - props.detail?.totalPayed,
};
const options = [
  {
    label: "Partial payment",
    value: "partial",
  },
  {
    label: "Full payment",
    value: "full",
  },
];
const schema = yup.object({
  amount: yup.number().required("Amount is required").max(yup.ref("max")),
  repaymentType: yup.string().required("Country is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [amount] = defineField("amount");
const [repaymentType] = defineField("repaymentType");

const content = [
  {
    label: "Pay with Monnify",
    value: "monnify",
    icon: "streamline:bank",
  },
  {
    label: "Pay with Wallet Balance",
    value: "wallet",
    icon: "ph:wallet-bold",
  },
];
const loading = ref(false);
function onSuccess(response) {
  if (response.status.toLowerCase() === "success") {
    isSuccessOpen.value = true;
    loading.value = false;
  }
}
function onModalClose() {
  loading.value = false;
  toast.error("Payment cancelled");
}
function makePayment(values) {
  loading.value = true;
  data.value = {
    email: authStore.userInfo?.email,
    name: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`,
    amount: values?.amount,
    phoneNumber: authStore.userInfo?.phoneNumber,
    reference: `RPM-${props?.detail?.financeRequestNo}-${nanoid(6)}`,
    ...values,
  };

  if (active.value === "monnify") {
    payWithMonnify(data.value, onModalClose, onSuccess);
  } else {
    walletRepayment({
      ...values,
      financeRequestNo: props?.detail?.financeRequestNo,
    })
      .then((res) => {
        if (res.status === 200) {
          isSuccessOpen.value = true;
          loading.value = false;
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.response.data.Message);
      });
  }
}

const onSubmit = handleSubmit((values) => {
  makePayment(values);
});
const balance = ref(null);
onMounted(() => {
  getWalletBalance().then((res) => {
    if (res.status === 200) {
      balance.value = res.data.data;
    }
  });
});
</script>
