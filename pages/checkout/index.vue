<template>
  <div class="container py-10 w-full">
    <div class="mb-6">
      <AppButton
        link="/cart"
        icon="ion:arrow-back-sharp"
        text="Back to cart"
        btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold"
      />
    </div>
    <div class="flex gap-x-5 w-full flex-col lg:flex-row gap-y-8 lg:gap-y-0">
      <div class="flex-1">
        <CheckoutContent />
      </div>
      <div>
        <CheckoutSide />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
useHead({
  title: "Checkout | Matta",
  meta: [{ name: "description", content: "Checkout" }],
});
</script>
