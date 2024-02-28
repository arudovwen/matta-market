<template>
  <div class="gap-y-2 flex flex-col rounded-[10px] pb-10">
    <!-- Top bar   -->
    <HeaderComponent
      title="Wallet"
      subtext="Fund and withdraw money from your account"
      className="border-[rgba(234,236,240,1)] !px-0"
    />
    <VerificationBox />
    <div class="py-[30px] flex gap-x-4">
      <div class="max-w-[365px]">
        <SideBox />
      </div>
      <div class="flex-1"><SupplierWalletTransactionPage /></div>
    </div>
  </div>
</template>

<script setup>
import SideBox from "./SideBox.vue";
</script>
