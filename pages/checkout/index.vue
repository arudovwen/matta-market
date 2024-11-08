<template>
  <div class="container py-10 w-full">
    <div class="mb-6">
      <AppButton
        link="/category/market/all"
        icon="ion:arrow-back-sharp"
        text="Back to market"
        btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold"
      />
    </div>
    <div class="flex gap-x-5 w-full flex-col lg:flex-row gap-y-8 lg:gap-y-0">
      <div class="flex-1 grid gap-y-4">
        <CartContent />
        <CheckoutContent />
      </div>
      <div>
        <CheckoutSide />
      </div>
    </div>
  </div>
</template>
<script setup>
const isPopOpen = ref(false);
const authOpen = ref(false);
const activeMethod = ref("card");
definePageMeta({
  layout: "default",
  middleware: "auth",
});
useHead({
  title: "Checkout | Matta",
  meta: [{ name: "description", content: "Checkout" }],
});
const cartStore = useCartStore();

onMounted(()=>{
  cartStore.getMyCart();

})
provide("isPopOpen", isPopOpen);
provide("authOpen", authOpen);
provide("activeMethod", activeMethod);
</script>
