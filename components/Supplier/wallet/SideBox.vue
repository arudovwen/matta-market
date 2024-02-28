<template>
  <div
    class="bg-white w-full border border-[#EAECF0] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] pt-5 pb-3 mb-8"
  >
    <div class="px-4 pb-4 border-b border-[#EAECF0]">
      <div
        class="lg:w-[311px] h-[160px] bg-gray-700 px-5 py-4 rounded-2xl flex flex-col justify-between bg-cover shadow-[7.873417377471924px_9.841772079467773px_15.746834754943848px_0px_rgba(0,0,0,0.05)]"
        :style="{ backgroundImage: `url('/images/card.png')` }"
      >
        <span class="flex items-center justify-between text-white">
          <span class="text-lg font-semibold">{{
            currencyFormat(details?.walletBalance)
          }}</span>
          <span></span> <img src="/images/pass.svg"
        /></span>

        <span class="font-medium text-sm text-white">Adeleke Laketu</span>
      </div>
    </div>
    <div class="px-4 pt-4 flex justify-end gap-x-4" v-if="!isLoading">
      <AppButton
        v-if="!hasWallet"
        @click="
          () => {
            handleClose();
            isCreatingWallet = isOpen = true;
          }
        "
        text="Request for wallet"
        btnClass="!px-[14px]  !py-[10px] text-sm text-[#98A2B3] bg-[#F2F4F7] border border-[#EAECF0] !rounded-lg"
      />
      <AppButton
        @click="
          () => {
            handleClose();
            isWithdraw = isOpen = true;
          }
        "
        v-if="hasWallet"
        text="Withdraw"
        btnClass="!px-[14px]  !py-[10px] text-sm text-[#344054] bg-transparent border border-[#D0D5DD] !rounded-lg"
      />
      <AppButton
        @click="
          () => {
            handleClose();
            isTopup = isOpen = true;
          }
        "
        v-if="hasWallet"
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
        <span class="flex gap-x-6 items-center">
          <span class="font-medium text-[#101828]">{{
            details[item.key]
          }}</span>
          <button
            v-if="item.key === 'accountNumber'"
            v-clipboard="details?.accountNumber"
            @click="toast.success('Copied')"
            class="cursor-pointer ml-2"
          >
            <i class="uil uil-copy text-[#101828]"></i></button
        ></span>
      </div>
    </div>
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="handleClose">
    <template #content>
      <div class="max-w-[800px]">
        <SupplierWalletModalsTopUp v-if="isTopup" :details="details" />
        <SupplierWalletModalsWithdrawalModal v-if="isWithdraw" />
        <SupplierWalletModalsCreateWallet
          @success="handleWalletCreation"
          v-if="isCreatingWallet"
        />
        <SupplierWalletModalsCreateKyc
          @success="handleWalletCreation"
          v-if="isAddingKyc"
        />
      </div>
    </template>
  </IndexModal>
  <ActionModal
    :open="isSuccessOpen"
    type="success"
    title="Request Successful"
    text="Your withdrawal request is being processed."
    btn-text="Okay"
    :isOkay="true"
    :isCancel="false"
    @actionItem="handleClose"
  />
</template>
<script setup>
import { toast } from "vue3-toastify";
import { getWalletDetails } from "~/services/walletservice";

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
function handleClose() {
  isWithdraw.value =
    isTopup.value =
    isCreatingWallet.value =
    isAddingKyc.value =
    isOpen.value =
    isSuccessOpen.value =
      false;
}
function handleWithdraw() {
  handleClose();
  isSuccessOpen.value = true;
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

onMounted(() => {
  handleWalletDetails();
});
provide("handleWithdraw", handleWithdraw);
provide("handleClose", handleClose);
provide("details", details);
</script>
