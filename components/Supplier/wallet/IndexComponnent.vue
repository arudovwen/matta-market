<template>
  <div class="gap-y-2 flex flex-col rounded-[10px] pb-10">
    <!-- Top bar   -->
    <HeaderComponent
      title="Wallet"
      subtext="Fund and withdraw money from your account"
      className="border-[rgba(234,236,240,1)] !px-4 lg:!px-0"
    />
    <VerificationBox />
    <div class="py-[30px] flex lg:gap-x-4 gap-y-8 lg:gap-y-0 flex-col lg:flex-row px-4 lg:px-0">
      <div class="lg:max-w-[365px]">
        <SideBox />
      </div>
      <div class="flex-1"><SupplierWalletTransactionPage /></div>
    </div>
  </div>
</template>

<script setup>
import SideBox from "./SideBox.vue";
</script>
