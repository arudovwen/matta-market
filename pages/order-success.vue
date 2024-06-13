<template>
  <div class="items-center flex justify-center p-6">
    <div class="bg-white rounded-[10px] p-5 md:p-9 text-center max-w-[500px]">
      <img src="/images/success.png" class="mx-auto mb-[10px]" alt="success" />
      <h1 class="text-2xl mb-[27px] font-bold">
        {{ !order_type ? "Order Successful" : "Order Request Submitted" }}
      </h1>
      <p class="mb-8 md:mb-10 text-sm text-[#444] leading-[21px]">
        Your order has been sent and is being processed. You will be contacted
        by one of our sales reps within the next 24hrs.
      </p>
      <p>You can also proceed to make payment for your order.</p>
      <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-[14px]">
        <AppButton
          link="/category/market/all products"
          text="Continue shopping"
          btnClass="text-[#2176FF] bg-[#165EF014] w-full !text-sm !font-normal !py-3"
        />
        <AppButton
          link="/category/market/all products"
          text="Make payment"
          btnClass="bg-[#2176FF] text-white w-full !text-sm !font-normal !py-3"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "custom",
});
useHead({
  title: "Order success | Matta",
});

const route = useRoute();
const { orderId, order_type } = route.query;
</script>
