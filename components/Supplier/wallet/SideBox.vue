<template>
  <div
    class="bg-white w-full border border-[#EAECF0] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] pt-5 pb-3 mb-8"
  >
    <div class="px-4 pb-4 border-b border-[#EAECF0]">
      <div
        class="lg:w-[311px] h-[160px] bg-gray-100 px-5 py-4 rounded-2xl flex flex-col justify-between bg-cover shadow-[7.873417377471924px_9.841772079467773px_15.746834754943848px_0px_rgba(0,0,0,0.05)]"
        :style="{ backgroundImage: `url('/images/card.png')` }"
      >
        <span class="flex items-center justify-between text-white">
          <span class="text-lg font-semibold">{{
            currencyFormat(balance.availableBalance)
          }}</span>
          <span></span> <img src="/images/pass.svg"
        /></span>

        <span class="font-medium text-sm text-white capitalize">
          {{ authStore.userInfo?.firstName }}
          {{ authStore.userInfo?.lastName }}</span
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
  </div>
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
    isSuccessOpen.value =
      false;
}
function handleComplete(text, type = null) {
  checkSettlement();
  handleWalletDetails();
  getLedgersTrans()
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
</script>
