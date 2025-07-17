<template>
  <div class="">
    <h2 class="py-5 font-bold text-2xl border-b border-[#f3f3f3]">
      Payment Method
    </h2>
    <div class="p-[30px] w-full bg-white rounded-[10px]">
      <div class="grid w-full gap-y-4">
        <div
          v-for="n in data"
          :key="n.title"
          class="overflow-hidden rounded-lg"
          :class="`${
            'credit' === n.key
              ? 'bg-[#1849A9] border-[#2E90FA] !text-white'
              : 'border-[#ECECEC] text-matta-black'
          } ${
            !n?.disabled ? '' : 'opacity-50 cursor-not-allowed '
          } w-full  border  `"
        >
          <label
            @click="activeMethod = n.key"
            :class="`${
              'credit' === n.key ? ' !text-white' : ' text-matta-black'
            } ${n?.disabled ? 'opacity-60' : ''} `"
            class="flex items-center justify-between p-4"
          >
            <div class="flex items-center gap-x-3">
              <span class="flex items-center">
                <input
                  :value="n.key"
                  type="radio"
                  v-model="activeMethod"
                  class="hidden peer"
                  :disabled="n?.disabled"
                />
                <span :class="'hidden peer-checked:inline'">
                  <AppIcon
                    icon="fa6-solid:circle-dot"
                    :iconClass="`${
                      n.key === 'credit' ? 'text-white' : 'text-[#1570EF]'
                    }`"
                /></span>
                <span :class="'inline peer-checked:hidden'">
                  <AppIcon
                    icon="fa-regular:circle"
                    :iconClass="'text-[#D0D5DD]'"
                  />
                </span>
              </span>

              <AppIcon class="ml-1 text-2xl" :icon="n.icon" />
              <p class="text-sm font-bold">{{ n.title }}</p>
            </div>
            <p class="text-sm font-semibold" v-if="n.key === 'credit'">
              {{ currencyFormat(creditDetail?.availableCredit) }}
            </p>
          </label>
          <div
            v-if="'credit' === n.key"
            :class="`${
              'credit' === n.key ? ' !text-white' : ' text-matta-black'
            }  `"
            class="py-4 border-t border-[#FFFFFF24] px-4 text-xs flex justify-between items-end gap-x-16"
          >
            <div class="flex-1">
              <span class="block mb-1 text-xs font-bold">{{ n.text }}</span>
              <span>{{ n.subtext }}</span>
            </div>
            <AppButton
            @click=" window.open('https://dev.oxide.matta.trade/credit', '_blank')"
              text="Apply now"
              btnClass="bg-white !text-[#1570EF] !text-xs !py-[6px] !px-[10px] font-semibold"
            />
          </div>
        </div>
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
    title: "Pay With Wallet Balance",
    icon: "ion:wallet-outline",
    url: "",
    key: "wallet",
    text: "Make payment with funds from your Matta wallet",
    value: 1,
    disabled: true,
  },
  {
    title: "Buy Now Pay Later",
    icon: "uil:credit-card",
    text: " Get the materials you need today — pay later at your convenience.",
    subtext:
      " With our flexible Buy Now Pay Later option, you can complete your procurement instantly and spread your payments over time. It's fast, secure, and designed to support your business growth without cash flow disruptions.",
    key: "credit",
    value: 3,
    disabled: false,
  },
  {
    title: "Submit Order Only",
    icon: "famicons:cart-outline",
    key: "card",
    url: "",
    text: "Pay instantly and securely with your credit/debit card",
    value: 0,
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
