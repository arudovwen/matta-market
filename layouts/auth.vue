<template>
  <div
    class="bg-[#0C111D] grid grid-cols-1 lg:grid-cols-12 h-screen w-screen bg-contain bg-center"
    :style="{
      backgroundImage: `url('https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto/cuu0iqo5yhh8rzgqev13')`,
    }"
  >
    <div class="relative hidden lg:flex items-center lg:col-span-7">
      <div class="top-8 left-10 logo absolute z-10">
        <NuxtLink to="/">
          <NuxtImg
            src="/logo-matta-white.png"
            alt="Matta"
            class="w-[120px] h-auto"
        /></NuxtLink>
      </div>

      <div class="flex items-center text-white text-left container">
        <div class="px-10">
          <div class="max-w-[660px] 2xl:max-w-[700px] mb-10">
            <h1
              class="text-4xl leading-10 xl:text-5xl 2xl:text-[56px] font-bold mb-6 xl:leading-[1.2]"
            >
              Sell your chemicals, raw materials and finished goods easily on
              Matta
            </h1>
            <p class="text-base xl:text-xl 2xl:text-2xl">
              Discover and buy chemicals, raw materials, ingredients, and
              commodities all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white px-6 xl:px-10 flex flex-col lg:col-span-5 lg:justify-center h-full overflow-y-auto"
    >
      <div class="pt-6 pb-2 z-10 lg:hidden">
        <NuxtLink to="/">
          <NuxtImg
            src="/images/logo.png"
            width="100"
            height="26"
            alt="Matta"
            class="w-[100px] h-auto z-10"
        /></NuxtLink>
      </div>
      <div class="flex-1 flex flex-col justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthBg from "~/assets/images/authbg.png";
</script>
