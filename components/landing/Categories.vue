<template>
  <div>
    <div class="container py-10 md:py-20">
      <div
        class="flex flex-col md:flex-row gap-y-9 xl:gap-y-0 justify-between sm:mb-[90px] md:gap-x-10"
      >
        <h1
         
          class="max-w-[633px] text-[#222] darks:text-white text-3xl xl:text-[49px] font-bold leading-[44.6px] xl:leading-[67.6px]"
        >
        Explore our wide range of solutions, designed for your specific business needs

        </h1>

        <div class="grid grid-cols-2 gap-5 md:min-w-[250px]">
          <div
            class="px-5 border-l-4 border-[rgba(81,32,11,0.05)]"
            v-for="n in content"
            :key="n.text"
            
          >
            <span
              class="block font-bold text-[#2176FF] text-2xl xl:text-[44px] mb-2 xl:mb-[15px]"
              >{{ n.title }}</span
            >
            <span
              class="block font-normal text-[#333] darks:text-white/80 text-sm xl:text-[20px]"
              >{{ n.text }}</span
            >
          </div>
        </div>
      </div>

      <div
       
        class="hidden lg:grid grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-5 justify-center max-h-[350px] overflow-y-auto no-scrollbar"
      >
        <NuxtLink
          v-for="(n, idx) in store?.marketsData"
          :key="idx"
          :to="`/category/market/${encodeURIComponent(n.title.toLowerCase())}/${n.id}`"
        >
          <span
            class="mx-auto cursor-pointer px-5 flex flex-col w-[100px] md:w-[140px] h-[100px] md:h-[140px] border-2 border-[#EAEAEA] rounded-full items-center justify-center hover:border-[#777] hover:bg-[rgba(33,118,255,0.04)]"
          >
            <AppIcon
              :icon="`fa6-solid:${n.imagePath}`"
              class="text-base md:text-[40px] text-[#444444] darks:text-white/80 mb-[6px]"
            />
            <span
              class="text-[10px] md:text-xs text-[#333] darks:text-white text-center"
              >{{ n.title }}</span
            >
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMarketStore } from "~/stores/markets";


const store = useMarketStore();
const content = [
  {
    title: "1000+",
    text: "Products",
  },
  {
    title: "200+",
    text: "Suppliers",
  },
  {
    title: "16",
    text: "Product categories",
  },
  {
    title: "5",
    text: "Countries served",
  },
];


</script>
