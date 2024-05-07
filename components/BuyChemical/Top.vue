<template>
  <div class="container pt-[96px] pb-6   ">
    <h1 class="text-6xl font-semibold mb-6 max-w-[730px]">
      Source your {Chemicals} all in one place
    </h1>
    <p class="text-xl mb-12 max-w-[640px] text-[#475467]">
      Search products. Request samples. Request quotes. Explore flexible payment
      options. Enjoy fast delivery.
    </p>

    <div class="flex gap-x-4 mb-[64px]">
      <AppButton text="Free sign up" btnClass="bg-transparent border-[#D0D5DD] border !px-[18px] !py-3 text-[#344054]" />
      <AppButton text="Watch demo video" btnClass="bg-primary-500 text-white  border-primary-500  border !px-[18px] !py-3" />
    </div>

    <div class="top_image h-[516px]  w-full"></div>
  </div>
</template>
<style scoped>

.top_image{
  background-image: url("/top.png");
  background-size: cover;
  background-repeat: repeat;
}
</style>
