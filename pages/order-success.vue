<template>
  <div class="items-center flex justify-center h-[85vh] w-screen p-6">
    <div class="bg-white rounded-[10px] p-5 md:p-9 text-center max-w-[500px]">
      <img src="/images/success.png" class="mx-auto mb-[10px]" alt="success" />
      <h1 class="text-2xl mb-[27px] font-bold">
        {{ !order_type ? "Order Successful" : "Order Request Submitted" }}
      </h1>
      <p class="mb-8 md:mb-10 text-sm text-[#444] leading-[21px]">
        Your order will be processed as soon as possible. Your order no is
        <span class="font-medium text-[#333]">{{ orderId }} </span>. You will
        receive an email shortly with the response for your order.
      </p>
      <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-[14px]">
        <AppButton
          link="/procurement/my-orders"
          text="Proceed to dashboard"
          btnClass="text-[#2176FF] bg-[#165EF014] w-full !text-sm !font-normal !py-3"
        />
        <AppButton
          link="/category/market/all products"
          text="Continue shopping"
          btnClass="bg-[#2176FF] text-white w-full !text-sm !font-normal !py-3"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: "Order success | Matta",
});

const route = useRoute();
const { orderId, order_type } = route.query;
</script>
