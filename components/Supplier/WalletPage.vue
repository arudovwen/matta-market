<template>
  <div class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10">
    <!-- Top bar   -->
    <HeaderComponent title="Wallet">
      <template #button>
        <div class="flex justify-end gap-x-4">
          <button
            @click="
              () => {
                isAddingKyc = isCreatingWallet = isWithdraw = false;
                isTopup = isOpen = true;
              }
            "
            :disabled="!hasWallet"
            class="w-full sm:w-auto border border-matta-black py-[10px] text-xs md:text-[13px] px-3 sm:px-6 flex justify-center text-matta-black rounded-lg items-center hover:bg-matta-black/80 capitalize font-normal leading-[normal] gap-x-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <i class="uil uil-top-arrow-to-top"></i> Top up
          </button>
          <button
            @click="
              () => {
                isAddingKyc = isCreatingWallet = isTopup = false;
                isWithdraw = isOpen = true;
              }
            "
            :disabled="!hasWallet"
            class="w-full sm:w-auto border border-matta-black bg-matta-black py-[10px] text-xs md:text-[13px] px-3 sm:px-6 flex justify-center text-white rounded-lg items-center hover:bg-matta-black/80 capitalize font-normal leading-[normal] gap-x-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <i class="uil uil-arrow-to-bottom text-white"></i> Withdraw
          </button>
        </div>
      </template></HeaderComponent
    >
    <div class="py-[30px]">
      <div>
        <div class="flex justify-between flex-col gap-y-4 sm:flex-row">
          <div class="w-full sm:w-auto">
            <button
              v-if="hasWallet && !details?.kycCompleted"
              @click="
                () => {
                  isTopup = isCreatingWallet = isWithdraw = false;
                  isAddingKyc = isOpen = true;
                }
              "
              :disabled="!hasWallet"
              class="w-full sm:w-auto border border-matta-black py-3 text-xs md:text-[13px] px-6 flex justify-center text-matta-black rounded-lg items-center hover:bg-matta-black/80 capitalize font-normal leading-[normal] gap-x-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <i class="uil uil-plus"></i> Update KYC
            </button>
          </div>
        </div>
      </div>

      <div
        class="grid sm:grid-cols-2 lg:grid-cols-2 gap-2"
        v-if="hasWallet && !isLoading"
      >
        <div class="p-6 lg:p-8 bg-white rounded-lg">
          <span class="font-medium text-sm block mb-4">Wallet Balance</span>
          <span class="font-bold block text-4xl">{{
            currencyFormat(details.walletBalance)
          }}</span>
        </div>
        <div class="p-6 lg:p-8 bg-white rounded-lg">
          <span class="font-bold text-[15px] block mb-3">Wallet details</span>
          <div class="grid grid-cols-2 mb-1 gap-x-4">
            <span class="text-sm font-medium">Bank name :</span>
            <span class="text-base">{{ details.bankName }}</span>
          </div>
          <div class="grid grid-cols-2 mb-1 gap-x-4">
            <span class="text-sm font-medium">Account name :</span>
            <span class="text-base">{{ details.accountName }}</span>
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <span class="text-sm font-medium">Account number :</span>
            <span class="text-base"
              ><span>{{ details.accountNumber }}</span
              ><button
                v-clipboard="details.accountNumber"
                @click="toast.success('Copied')"
                class="cursor-pointer ml-2"
              >
                <i class="uil uil-copy"></i></button
            ></span>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-x-2" v-if="hasWallet && !isLoading">
        <div class="p-6 lg:p-8 bg-white rounded-lg">
          <SupplierWalletLastTransactions />
        </div>
        <div class="p-6 lg:p-8 bg-white rounded-lg">
          <SupplierWalletBeneficiaryPage />
        </div>
      </div>
      <div
        class=""
        v-if="!hasWallet && !isLoading"
      >
        <EmptyData
          title="You don't have an active wallet"
          btnText="Create your wallet"
          @btnFunction="
            () => {
              isWithdraw = isTopup = false;
              isCreatingWallet = isOpen = true;
            }
          "
        />
      </div>
      <div class="text-center p-6 lg:p-8 my-24" v-if="isLoading">
        <AppLoader />
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
</template>

<script setup>
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

import { getWalletDetails } from "~/services/walletservice";

const isOpen = ref(false);

const route = useRoute();
const isTopup = ref(false);
const isLoading = ref(true);
const isWithdraw = ref(false);
const hasWallet = ref(false);
const isCreatingWallet = ref(false);
const isAddingKyc = ref(false);
const details = ref(null);

function handleClose() {
  isWithdraw.value =
    isTopup.value =
    isCreatingWallet.value =
    isAddingKyc.value =
    isOpen.value =
      false;
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
provide("details", details);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
