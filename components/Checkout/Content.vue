<template>
  <div>
    <div class="rounded-[10px]">
   
      <div class="flex flex-col gap-y-8">
        <CheckoutShippingOptions />
        <CheckoutCost />
        <CheckoutPayment />
      </div>
    </div>
  </div>
</template>
<script setup>
const refresh = ref(false)

provide("refresh",refresh)
</script>