<template>
  <div class="grid gap-y-[30px]">
    <div class="bg-white rounded-[10px]">
      <div class="flex flex-col gap-y-5" v-if="cartStore?.cart?.length">
        <div
          v-for="item in cartStore?.cart"
          class="border-b last:border-none border-[#f3f3f3]"
        >
          <CartItem :detail="item" />
        </div>
      </div>

      <EmptyData v-else title="You have no item in your cart" />
      <CheckoutDiscount />
    </div>
   
  </div>
</template>
<script setup>
const cartStore = useCartStore();
</script>
