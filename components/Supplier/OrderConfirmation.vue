<template>
  <div class="container py-8">
    <div class="mb-8"><Breadcrumbs :manual="true" :links="crumbsData" /></div>
    <div class="mb-6">
      <HeaderComponent
        title="Confirm Order - INV098787"
        subtext="View order details and delivery status"
        class-name="!px-0 !border-none !py-0"
      />
    </div>
    <div class="flex gap-x-4">
      <div class="flex-1">
        <div class="w-full p-6 bg-white border border-[#F4F4F4] rounded-lg"></div>
      </div>
      <div class="bg-[#101828] py-7 px-5 rounded-lg w-[358px]">
        
      </div>
    </div>
  </div>
</template>

<script setup>
const crumbsData = ref([
  {
    title: "Store Orders",
    url: "/category/markets",
  },

  {
    title: "Order Confirmation",
    url: "/category/markets",
  },
  {
    title: "MT001",
    url: "#",
  },
]);
</script>
