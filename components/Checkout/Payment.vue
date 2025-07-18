<template>
  <div class="" v-if="cartStore?.cartTotalwithTax">
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
            !n?.disabled ? '' : 'opacity-60 cursor-not-allowed '
          } w-full  border  `"
        >
          <label
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
            <div v-if="n.key === 'credit'">
              <p
                class="text-sm font-semibold"
                v-if="authStore.userBalance?.creditDetail?.hasCredit"
              >
                {{
                  currencyFormat(
                    authStore.userBalance?.creditDetail?.availableCredit
                  )
                }}
              </p>
              <AppButton
                v-if="!authStore.userBalance?.creditDetail?.hasCredit"
                @click="openCreditPage"
                text="Apply now"
                btnClass="bg-white !text-[#1570EF] !text-xs !py-[6px] !px-[10px] font-semibold"
              />
            </div>
            <p class="text-sm font-semibold" v-if="n.key === 'wallet'">
              {{
                currencyFormat(authStore.userBalance?.balance?.availableBalance)
              }}
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
              <span class="block mb-1 text-xs font-bold">{{
                handleMessageTitle(
                  cartStore?.cartTotalwithTax >
                    authStore.userBalance?.creditDetail?.availableCredit,
                  hasCredit,
                  authStore.userBalance?.creditDetail?.creditWalletStatus
                )
              }}</span>
              <span>{{
                handleMessage(
                  cartStore?.cartTotalwithTax >
                    authStore.userBalance?.creditDetail?.availableCredit,
                  hasCredit,
                  authStore.userBalance?.creditDetail?.creditWalletStatus
                )
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ authStore.userBalance }} -->
  <CheckoutCreditPopup
    v-if="isPopOpen"
    @close="isPopOpen = false"
    :open="isPopOpen"
    :available="hasCredit"
    :insufficient="
      cartStore?.cartTotalwithTax >
      authStore.userBalance?.creditDetail?.availableCredit
    "
    :creditDetail="{
      ...authStore.userBalance?.creditDetail,
      balance:
        authStore.userBalance?.creditDetail?.creditLimit -
        authStore.userBalance?.creditDetail?.creditUsed,
      amountToPay: cartStore?.cartTotalwithTax,
    }"
  />
</template>
<script setup>
import { getCreditDetail } from "~/services/creditservice";
import { getWalletBalance } from "~/services/walletservice";

const cartStore = useCartStore();
const activeMethod = inject("activeMethod");
const isPopOpen = inject("isPopOpen");
const creditDetail = ref(null);
const details = ref(null);
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
    disabled: false,
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
function openCreditPage() {
  window.open('https://dev.oxide.matta.trade/credit', '_blank');
}
watch(activeMethod, () => {
  activeMethod.value === "credit"
    ? (isPopOpen.value = true)
    : (isPopOpen.value = false);
});

async function handleWalletDetails() {
  isLoading.value = true;

  try {
    const [creditRes, walletRes] = await Promise.allSettled([
      getCreditDetail(),
      getWalletBalance(),
    ]);

    if (creditRes.status === "fulfilled" && creditRes.value.status === 200) {
      creditDetail.value = creditRes.value.data.data;
      hasCredit.value = true;
    } else {
      hasCredit.value = false;
    }

    if (walletRes.status === "fulfilled" && walletRes.value.status === 200) {
      details.value = walletRes.value.data.data;
    }
  } catch (error) {
    // Optional: global unexpected error handling
    console.error("Unexpected error:", error);
    hasCredit.value = false;
  } finally {
    isLoading.value = false;
  }
}
const authStore = useAuthStore();
onMounted(() => {
  // handleWalletDetails();
  authStore.getUserBalance();
});
</script>
