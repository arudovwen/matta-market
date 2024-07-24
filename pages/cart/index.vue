<template>
  <div class="container py-10 w-full">
    <div class="mb-6">
      <AppButton
        link="/category/market/all products"
        icon="ion:arrow-back-sharp"
        text="Back to shopping"
        btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold"
      />
    </div>
    <div class="flex gap-x-5 w-full flex-col lg:flex-row gap-y-8 lg:gap-y-0">
      <div class="flex-1">
        <CartContent />
      </div>
      <div>
        <CartSide />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
useHead({
  title: "Cart | Matta",
  meta: [{ name: "description", content: "Cart" }],
});
const authOpen = ref(false);
const cartStore = useCartStore();

cartStore.getMyCart()
provide("authOpen", authOpen);
</script>
