<template>
  <div>
    <div class="rounded-[10px] pb-20">
      <div class="flex flex-col gap-y-8">
        <CheckoutShippingOptions />
        <CheckoutCost />
        <div v-if="cartStore?.cartTotalAmount > minCartAmount">
          <CheckoutPayment />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const cartStore = useCartStore();
</script>
