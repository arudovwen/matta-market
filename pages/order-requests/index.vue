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
        <OrderRequestContent />
      </div>
      <div>
        <OrderRequestSide />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
useHead({
  title: "Order Requests | Matta",
  meta: [{ name: "description", content: "Order Requests" }],
});
</script>
