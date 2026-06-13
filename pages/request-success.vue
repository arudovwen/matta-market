<template>
  <div class="items-center flex justify-center h-[85vh] w-screen p-6">
    <div class="bg-white rounded-[10px] p-5 md:p-9 text-center max-w-[500px]">
      <NuxtImg
        src="/images/success.png"
        class="mx-auto mb-[10px]"
        alt="success"
      />
      <h1 class="text-2xl mb-[27px] font-bold">Request Sent</h1>
      <p class="mb-8 md:mb-10 text-sm text-[#444] leading-[21px]">
        Your order will be reviewed and you will be contacted by one of our
        sales managers
      </p>
      <div class="flex justify-center">
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
const { orderId } = route.query;
</script>
