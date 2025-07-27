<template>
  <div v-if="cartStore?.cartTotalwithTax">
    <h2 class="py-5 font-bold text-2xl border-b border-[#f3f3f3]">
      Payment Method
    </h2>
    <div class="p-[30px] w-full bg-white rounded-[10px]">
      <div class="grid w-full gap-y-4">
        <div
          v-for="n in data"
          :key="n.key"
          class="w-full overflow-hidden border rounded-lg"
          :class="[
            activeMethod === 'credit' && n.key === 'credit'
              ? 'bg-[#1849A9] border-[#2E90FA] !text-white'
              : 'border-[#ECECEC] text-matta-black',
            n.disabled ? 'opacity-60 cursor-not-allowed' : '',
          ]"
        >
          <label
            class="flex items-center justify-between p-4"
            :class="[
              activeMethod === 'credit' && n.key === 'credit'
                ? '!text-white'
                : 'text-matta-black',
              n.disabled ? 'opacity-60' : '',
            ]"
          >
            <div class="flex items-center gap-x-3">
              <span class="flex items-center">
                <input
                  type="radio"
                  class="hidden peer"
                  :value="n.key"
                  v-model="activeMethod"
                  :disabled="n.disabled"
                />
                <span class="hidden peer-checked:inline">
                  <AppIcon
                    icon="fa6-solid:circle-dot"
                    :iconClass="
                      activeMethod === 'credit' && n.key === 'credit'
                        ? 'text-white'
                        : 'text-[#1570EF]'
                    "
                  />
                </span>
                <span class="inline peer-checked:hidden">
                  <AppIcon
                    icon="fa-regular:circle"
                    iconClass="text-[#D0D5DD]"
                  />
                </span>
              </span>
              <AppIcon :icon="n.icon" class="ml-1 text-2xl" />
              <p class="text-sm font-bold">{{ n.title }}</p>
            </div>

            <!-- Wallet Balance -->
            <p v-if="n.key === 'wallet'" class="text-sm font-semibold">
              {{
                currencyFormat(authStore.userBalance?.balance?.availableBalance)
              }}
            </p>

            <!-- Credit Option -->
            <div v-if="n.key === 'credit'" class="text-right">
              <p
                v-if="authStore.userBalance?.creditDetail?.hasCredit"
                class="text-sm font-semibold"
              >
                {{
                  currencyFormat(
                    authStore.userBalance?.creditDetail?.availableCredit
                  )
                }}
              </p>
              <AppButton
                v-else
                text="Apply now"
                @click="openCreditPage"
                btnClass="bg-white !text-[#1570EF] !text-xs !py-[6px] !px-[10px] font-semibold"
              />
              <p
                class="mt-1 text-xs"
                :class="insufficient ? 'text-red-600' : 'text-white/70'"
                v-if="authStore.userBalance?.creditDetail?.hasCredit"
              >
                {{ insufficient ? "Insufficient" : "Available" }} credit
              </p>
            </div>
          </label>

          <!-- Additional Credit Info -->
          <div
            v-if="n.key === 'credit' && activeMethod === 'credit'"
            class="py-4 border-t border-[#FFFFFF24] px-4 text-xs flex justify-between items-end gap-x-16"
            :class="
              activeMethod === 'credit' && n.key === 'credit'
                ? '!text-white'
                : 'text-matta-black'
            "
          >
            <div class="flex-1">
              <span class="block mb-1 text-xs font-bold">
                {{
                  handleMessageTitle(
                    cartStore?.cartTotalwithTax >
                      authStore.userBalance?.creditDetail?.availableCredit,
                    hasCredit,
                    authStore.userBalance?.creditDetail?.creditWalletStatus
                  )
                }}
              </span>
              <span>
                {{
                  handleMessage(
                    cartStore?.cartTotalwithTax >
                      authStore.userBalance?.creditDetail?.availableCredit,
                    hasCredit,
                    authStore.userBalance?.creditDetail?.creditWalletStatus
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <CheckoutCreditPopup
    v-if="isPopOpen"
    @close="isPopOpen = false"
    :open="isPopOpen"
    :available="hasCredit"
    :insufficient="cartStore?.cartTotalwithTax > authStore.userBalance?.creditDetail?.availableCredit"
    :creditDetail="{
      ...authStore.userBalance?.creditDetail,
      balance: authStore.userBalance?.creditDetail?.creditLimit - authStore.userBalance?.creditDetail?.creditUsed,
      amountToPay: cartStore?.cartTotalwithTax
    }"
  /> -->
</template>
<script setup>
import { getCreditDetail } from "~/services/creditservice";
import { getWalletBalance } from "~/services/walletservice";

const cartStore = useCartStore();
const authStore = useAuthStore();

const activeMethod = inject("activeMethod");
// const isPopOpen = inject("isPopOpen");

const creditDetail = ref(null);
const details = ref(null);
const hasCredit = ref(true);
const insufficient = ref(false);
const isLoading = ref(false);

const data = [
  {
    title: "Pay With Wallet Balance",
    icon: "ion:wallet-outline",
    key: "wallet",
    text: "Make payment with funds from your Matta wallet",
    value: 1,
    disabled: false,
  },
  {
    title: "Buy Now Pay Later",
    icon: "uil:credit-card",
    key: "credit",
    value: 3,
    text: "Get the materials you need today — pay later at your convenience.",
    subtext:
      "With our flexible Buy Now Pay Later option, you can complete your procurement instantly and spread your payments over time.",
    disabled: false,
  },
  {
    title: "Submit Order Only",
    icon: "famicons:cart-outline",
    key: "card",
    text: "Pay instantly and securely with your credit/debit card",
    value: 0,
    disabled: false,
  },
];

function openCreditPage() {
  window.open("https://dev.oxide.matta.trade/credit", "_blank");
}

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
    console.error("Unexpected error:", error);
    hasCredit.value = false;
  } finally {
    isLoading.value = false;
  }
}

// Optional: fetch if needed
onMounted(() => {
  authStore.getUserBalance();
});

// Dynamically watch for insufficiency
watchEffect(() => {
  insufficient.value =
    cartStore?.cartTotalwithTax >
    authStore.userBalance?.creditDetail?.availableCredit;
});
</script>
