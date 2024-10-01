<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
      Payment Method
    </h2>
    <div class="p-[30px]">
      <div class="flex flex-wrap gap-y-6 md:gap-y-0 gap-x-6">
        <button
          v-for="n in data"
          :key="n.title"
          @click="activeMethod = n.key"
          :disabled="n?.disabled"
          :class="`${
            activeMethod === n.key
              ? 'bg-[#165EF01F] border-[#165EF080]'
              : 'border-[#E7E7E780]'
          } ${
            !n?.disabled ? '' : 'opacity-50 cursor-not-allowed'
          } shadow-[0px_0px _4px_0px_rgba(0,0,0,0.11)] min-w-[180px] mx-auto lg:mx-0 w-[200px] lg:w-[180px] rounded-[10px] py-6 lg:py-5 px-[16px] flex flex-col justify-center items-center border-2`"
        >
          <AppIcon class="text-4xl mb-2" :icon="n.icon" />
          <p class="text-xs">{{ n.title }}</p>
          <p class="text-[9px] font-bold" v-if="n.key==='credit'">{{ currencyFormat(creditDetail?.availableCredit) }}</p>
        </button>
      </div>
    </div>
  </div>

  <CheckoutCreditPopup
    v-if="isPopOpen"
    @close="isPopOpen = false"
    :open="isPopOpen"
    :available="hasCredit"
    :insufficient="cartStore?.cartTotalwithTax > creditDetail?.availableCredit"
    :creditDetail="{
      ...creditDetail,
      balance: creditDetail?.creditLimit - creditDetail?.creditUsed,
      amountToPay: cartStore?.cartTotalwithTax,
    }"
  />
</template>
<script setup>
import { getCreditDetail } from "~/services/creditservice";

const cartStore = useCartStore();
const activeMethod = inject("activeMethod");
const isPopOpen = inject("isPopOpen");
const creditDetail = ref(null);
const hasCredit = ref(true);
const isLoading = ref(false);
const data = [
  {
    title: "Card / Bank Transfer",
    icon: "uil:credit-card",
    key: "card",
    url: "",
    text: "Pay instantly and securely with your credit/debit card",
    value: 0,
    disabled: false,
  },
  {
    title: "Matta Wallet",
    icon: "ion:wallet-outline",
    url: "",
    key: "wallet",
    text: "Make payment with funds from your Matta wallet",
    value: 1,
    disabled: true,
  },
  // {
  //   title: "Pay with Trade Finance",
  //   icon: "teenyicons:credit-card-outline",
  //   url: "",
  //   key: "trade",
  //   text: "Make payment with trade finance",
  //   value: 2,
  // },
  {
    title: "Credit Wallet",
    icon: "ph:hand-coins-bold",
    text: "Pay with your buy now ,pay later wallet",
    key: "credit",
    value: 3,
    disabled: false,
  },
];
watch(activeMethod, () => {
  activeMethod.value === "credit"
    ? (isPopOpen.value = true)
    : (isPopOpen.value = false);
});
function handleWalletDetails() {
  isLoading.value = true;
  getCreditDetail()
    .then((res) => {
      if (res.status === 200) {
        creditDetail.value = res.data.data;
        hasCredit.value = true;
        isLoading.value = false;
      }
    })
    .catch(() => {
      hasCredit.value = false;
      isLoading.value = false;
    });
}
onMounted(() => {
  handleWalletDetails();
});
</script>
