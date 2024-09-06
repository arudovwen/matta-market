<template>
  <div class="flex gap-x-8">
    <div
      class="bg-white w-full border border-[#EAECF0] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] pt-5 pb-3 mb-8"
    >
      <div class="px-6 pb-4 border-b border-[#EAECF0]">
        <div
          class="lg:w-[311px] h-[180px] bg-[#42307D] bg-no-repeat bg-bottom relative px-5 py-5 rounded-2xl flex flex-col justify-between bg-contain shadow-[0px_6px_2px_#344054]"
          :style="{ backgroundImage: `url('/lines.png')` }"
        >
          <div class="flex flex-col gap-y-4">
            <div class="flex items-center justify-between text-white">
              <div>
                <span class="text-xl font-semibold block">{{
                  currencyFormat(balance.availableBalance)
                }}</span>
                <span
                  class="text-[11px] font-normal flex items-center gap-x-[2px]"
                  >Ledger balance
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Ledger balance"
                    class="cursor-pointer h-3 w-3 flex items-center justify-center"
                  >
                    <AppIcon icon="quill:info" /> </span
                  >: {{ currencyFormat(balance.ledgerBalance) }}</span
                >
              </div>

              <span class="absolute top-4 right-4">
                <img src="/images/pass.svg" class="w-4" alt="side"
              /></span>
            </div>
          </div>
          <span
            class="font-normal text-xs text-white capitalize flex justify-between items-center"
          >
            <span>{{ details?.accountNumber }}</span>

            <span class="font-semibold">{{ details.bankName }}</span></span
          >
        </div>
      </div>
      <div class="px-4 pt-4 flex justify-end gap-x-4" v-if="!isLoading">
        <AppButton
          @click="
            () => {
              handleClose();
              type = 'withdraw';
              !hasWallet
                ? (isCreatingWallet = isOpen = true)
                : (isWithdraw = isOpen = true);
            }
          "
          text="Withdraw"
          btnClass="!px-[14px]  !py-[10px] text-sm text-[#344054] bg-transparent border border-[#D0D5DD] !rounded-lg"
        />
        <AppButton
          @click="
            () => {
              handleClose();
              type = 'fund';
              isTopup = isOpen = true;
            }
          "
          text="Fund wallet"
          btnClass="!px-[14px]  !py-[10px] text-sm text-white bg-primary-500 border border-primary-500 !rounded-lg"
        />
      </div>
    </div>

    <div
      class="bg-white w-full border border-[#EAECF0] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] pt-5 pb-3 mb-8"
    >
      <div class="px-6 pb-4 border-b border-[#EAECF0]">
        <div
          class="lg:w-[311px] h-[180px] bg-[#16B364] bg-no-repeat bg-bottom bg-contain relative px-5 py-5 rounded-2xl flex flex-col justify-between shadow-[0px_6px_2px_#344054]"
          :style="{ backgroundImage: `url('/lines.png')` }"
        >
          <div class="flex flex-col gap-y-3">
            <div class="flex items-center justify-between text-white">
              <div>
                <span class="text-[17px] font-semibold block">{{
                  currencyFormat(balance.availableBalance)
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
                  currencyFormat(balance.ledgerBalance)
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
                <img src="/images/pass.svg" class="w-4" alt="side"
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
      <div class="px-4 pt-4 flex justify-end gap-x-4" v-if="!isLoading">
        <AppButton
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
      </div>
    </div>
  </div>
  <!-- <div
    v-if="hasWallet"
    class="border border-[#EAECF0] bg-[#F2F4F7] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] pt-5 pb-4 px-4"
  >
    <p class="text-sm text-[#344054] font-semibold mb-3">
      Bank Transfer Information
    </p>

    <div class="grid gap-y-1">
      <div
        class="flex gap-x-2 items-center text-xs"
        v-for="item in bankData"
        :key="item.title"
      >
        <span class="font-normal text-[#667085]">{{ item.title }}: </span>
        <span class="flex gap-x-4 items-center">
          <span class="font-medium text-[#101828]">{{
            details[item.key]
          }}</span>
          <button
            v-if="item.key === 'accountNumber'"
            v-clipboard="details?.accountNumber"
            @click="toast.success('Copied')"
            class="cursor-pointer"
          >
            <i class="uil uil-copy text-[#101828]"></i></button
        ></span>
      </div>
    </div>
  </div> -->
  <IndexModal :isOpen="isOpen" @togglePopup="handleClose">
    <template #content>
      <div class="max-w-[800px]">
        <SupplierWalletModalsTopUp
          v-if="isTopup"
          :details="details"
          :hasWallet="hasWallet"
          @activate="activateWallet"
        />
        <SupplierWalletModalsWithdrawalModal
          v-if="isWithdraw"
          :hasSettlement="hasSettlement"
          :balance="balance"
          :banks="banks"
        />
        <SupplierWalletModalsCreateWallet
          :hasSettlement="hasSettlement"
          v-if="isCreatingWallet"
          :type="type"
          :banks="banks"
        />
        <div class="bg-white p-6 rounded-lg">
          <RepayLoan v-if="isRepay" :detail="detail" type="credit" />
        </div>
      </div>
    </template>
  </IndexModal>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Request Successful"
    :text="completeText"
    btn-text="Okay"
    :isOkay="true"
    :isCancel="false"
    @actionItem="handleClose"
  />
</template>
<script setup>
import { toast } from "vue3-toastify";
import { getWalletDetails } from "~/services/walletservice";
import { getBanks, viewSettlement } from "~/services/settlementservice";
import RepayLoan from "~/pages/financing/repay-loan.vue";

const detail = ref(null);
const isRepay = ref(false);
const balance = inject("balance");
const authStore = useAuthStore();
const getLedgersTrans = inject("getLedgersTrans");
const settlements = ref([]);
const completeText = ref("Your withdrawal request is being processed.");
const data = ref(null);
const isSuccessOpen = ref(false);
const isLoading = ref(true);
const details = ref([]);
const hasWallet = ref(false);
const isOpen = ref(false);
const route = useRoute();
const isTopup = ref(false);
const isWithdraw = ref(false);
const isCreatingWallet = ref(false);
const isAddingKyc = ref(false);
const hasSettlement = ref(false);
const type = ref("");
const bankData = [
  {
    title: "Bank name",
    key: "bankName",
  },
  {
    title: "Account name",
    key: "accountName",
  },
  {
    title: "Account number",
    key: "accountNumber",
  },
];
const banks = ref([]);
async function activateWallet() {
  type.value = "fund";
  isTopup.value = false;
  isCreatingWallet.value = true;
}
function handleClose() {
  isWithdraw.value =
    isTopup.value =
    isCreatingWallet.value =
    isAddingKyc.value =
    isOpen.value =
    isRepay.value =
    isSuccessOpen.value =
      false;
}
function handleComplete(text, type = null) {
  checkSettlement();
  handleWalletDetails();
  getLedgersTrans();
  if (type === "withdraw") {
    isCreatingWallet.value = false;
    isWithdraw.value = true;
  } else if (type === "fund") {
    isCreatingWallet.value = false;
    isTopup.value = true;
  } else {
    completeText.value = text;
    handleClose();
    isSuccessOpen.value = true;
  }
}
function handleWalletCreation() {
  isLoading.value = true;
  handleClose();
  handleWalletDetails();
}

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
}
function checkSettlement() {
  viewSettlement().then((res) => {
    if (res.status && res.data.data.length > 0) {
      hasSettlement.value = true;
      settlements.value = res.data.data;
    } else {
      hasSettlement.value = false;
    }
  });
}
onMounted(() => {
  handleWalletDetails();
  checkSettlement();
  getBanks().then((res) => {
    if (res.status === 200) {
      banks.value = res.data.data.responseBody.map((i) => ({
        label: i.name,
        value: i.code.toString(),
      }));
    }
  });
});

provide("handleComplete", handleComplete);
provide("handleClose", handleClose);
provide("details", details);
provide("settlements", settlements);
provide("isOpen", isOpen);
</script>

<style scoped>
.bg1 {
  background-color: linear-gradient(45deg, #42307d 0%, #7f56d9 100%);
}
</style>
