<template>
  <div class="">
    <div
      class="bg-white w-full border border-[#EAECF0] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] pt-5 pb-3 mb-8"
    >
      <div class="px-6 pb-4 border-b border-[#EAECF0] mb-10">
        <div
          class="lg:w-[311px] h-[180px] bg-[#16B364] bg-no-repeat bg-bottom bg-contain relative px-5 py-5 rounded-2xl flex flex-col justify-between shadow-[0px_6px_2px_#344054]"
          :style="{ backgroundImage: `url('/lines.png')` }"
        >
          <div class="flex flex-col gap-y-3">
            <div class="flex items-center justify-between text-white">
              <div>
                <span class="text-[17px] font-semibold block">{{
                  currencyFormat(creditDetail?.availableCredit)
                }}</span>
                <span
                  class="text-[10px] font-normal flex items-center gap-x-[2px]"
                  >Available credit
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Available credit"
                    class="cursor-pointer h-3 w-3 flex items-center justify-center"
                  >
                    <AppIcon icon="quill:info" /> </span
                ></span>
              </div>
            </div>
            <div class="flex items-center justify-between text-white">
              <div>
                <span class="text-[17px] font-semibold block">{{
                  currencyFormat(creditDetail?.creditUsed)
                }}</span>
                <span
                  class="text-[10px] font-normal flex items-center gap-x-[2px]"
                  >Credit used
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Ledger balance"
                    class="cursor-pointer h-3 w-3 flex items-center justify-center"
                  >
                    <AppIcon icon="quill:info" /> </span
                ></span>
              </div>

              <span class="absolute top-4 right-4">
                <NuxtImg src="/images/pass.svg" class="w-4" alt="side"
              /></span>
            </div>
          </div>
          <span
            class="font-normal text-xs text-white capitalize flex justify-between items-center"
          >
            <span
              >{{ authStore?.userInfo?.firstName }}
              {{ authStore?.userInfo?.lastName }}</span
            >
          </span>
        </div>
      </div>
      <!-- <div class="px-4 pt-4 flex justify-end gap-x-4" v-if="!isLoading">
        <AppButton
          v-if="hasCredit"
          @click="
            () => {
              handleClose();
              type = 'repay';
              isRepay = isOpen = true;
            }
          "
          type="button"
          text="Repay credit"
          btnClass="!px-[14px]  !py-[10px] text-sm text-[#344054] bg-transparent border border-[#D0D5DD] !rounded-lg"
        />
        <AppButton
          v-if="!hasCredit"
          @click="navigateTo('/credit/request')"
          type="button"
          text="Request credit"
          btnClass="!px-[14px]  !py-[10px] text-sm text-[#344054] bg-transparent border border-[#D0D5DD] !rounded-lg"
        />
      </div> -->
      <SupplierWalletCreditTransactions />
    </div>
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import { getWalletDetails } from "~/services/walletservice";
import RepayLoan from "~/pages/financing/repay-loan.vue";
import { getCreditDetail } from "~/services/creditservice";

const detail = ref(null);
const creditDetail = ref(null);
const isRepay = ref(false);
const authStore = useAuthStore();
const completeText = ref("Your withdrawal request is being processed.");
const data = ref(null);
const isSuccessOpen = ref(false);
const isLoading = ref(true);
const details = ref([]);
const hasWallet = ref(false);
const hasCredit = ref(false);
const isOpen = ref(false);
const route = useRoute();
const isTopup = ref(false);
const isWithdraw = ref(false);
const isCreatingWallet = ref(false);
const isAddingKyc = ref(false);
const hasSettlement = ref(false);
const type = ref("");

function handleWalletDetails() {
  getWalletDetails()
    .then((res) => {
      details.value = res.data.data;
      hasWallet.value = true;
      isLoading.value = false;
    })
    .catch(() => {
      hasWallet.value = false;
      isLoading.value = false;
    });
  getCreditDetail()
    .then((res) => {
      creditDetail.value = res.data.data;
      hasCredit.value = true;
      isLoading.value = false;
    })
    .catch(() => {
      hasCredit.value = false;
      isLoading.value = false;
    });
}

onMounted(() => {
  handleWalletDetails();
});

provide("details", details);
provide("isOpen", isOpen);
</script>

<style scoped>
.bg1 {
  background-color: linear-gradient(45deg, #42307d 0%, #7f56d9 100%);
}
</style>
