<template>
  <div
    class="bg-[#333] rounded-[10px] py-[30px] px-5 w-full lg:w-[250px] xl:w-[360px]"
  >
    <div class="font-semibold text-2xl text-white pb-6">Request Summary</div>
    <div class="flex flex-col gap-y-5">
      <div
        class="flex justify-between"
        v-for="item in orderRequestStore?.orderRequestItems"
      >
        <div>
          <p class="font-semibold text-sm text-white mb-[2px]">
            {{ item.product }}
          </p>
          <p class="text-xs text-[#959595]">
            Qty: {{ item.quantity }} {{ item.selectedPackage }}
          </p>
        </div>
        <p class="font-medium text-sm text-white">
          {{ currencyFormat(item.packagePrice) }}
        </p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />

    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>

      <p class="text-white font-bold">
        {{ currencyFormat(orderRequestStore?.orderAmountTotal) }}
      </p>
    </div>

    <AppButton
      :isDisabled="!orderRequestStore?.orderRequestItems"
      text="Submit order request"
      btnClass="bg-primary-500  w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm"
    />
  </div>
</template>
<script setup>
const orderRequestStore = useOrderRequestStore();
</script>
