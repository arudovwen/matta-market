<template>
  <div class="p-8 bg-white rounded-lg bg-img">
    <div class="mb-12"><Breadcrumbs :manual="true" :crumbs="crumbs" /></div>
    <div class="grid grid-cols-3 justify-between items-end mb-16">
      <h1
        class="text-[48px] leading-[56px] text-matta-black col-span-1 font-medium capitalize"
      >
        {{ product.name }}
      </h1>

      <div class="col-span-2 flex items-center justify-end gap-x-12">
        <div class="px-4 mr-6">
          <p class="text-xs text-[#ddd] font-normal uppercase">from</p>
          <p class="text-matta-black">
            <span class="font-medium text-xl"
              >₦{{
                defaultPackage ? formatMoney(defaultPackage.amount) : 0
              }} </span
            >/{{ defaultPackage ? defaultPackage.unit : "Kg" }}
          </p>
        </div>
        <div class="flex gap-x-2">
          <button
            class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
          >
            <ChatBubbleLeftIcon class="text-matta-black w-5 h-5" />
          </button>
          <button
            class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
          >
            <HeartIcon v-if="!liked" class="w-5 h-5 text-matta-black" />
            <HeartSolidIcon v-if="liked" class="w-5 h-5 text-primary" />
          </button>
        </div>
        <button
          :disabled="!product.sampleAvailable"
          :class="{ 'opacity-50 cursor-not-allowed': !product.sampleAvailable }"
          class="flex items-center uppercase whitespace-nowrap text-matta-black bg-transparent hover:text-white hover:bg-matta-black py-2 px-3 md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <span>Request a sample</span>
        </button>
        <button
          :disabled="!product.sampleAvailable"
          class="flex items-center uppercase whitespace-nowrap text-matta-black bg-transparent hover:text-white hover:bg-matta-black py-2 px-3 md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <span>Request a quote</span>
        </button>
      </div>
    </div>
    <CartCounter />
  </div>
</template>
<script setup>

import CartCounter from "./CartCounter.vue";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/vue/24/solid";
import { inject, onMounted } from "vue";
import { useRoute } from "vue-router";

const formatMoney = inject("formatMoney");
const product = inject("product");
const defaultPackage = inject("defaultPackage");
const liked = false;
const route = useRoute();
const crumbs = [
  { name: "markets", url: `/markets` },
  {
    name: route.params.market,
    url: `/category/market/${route.params.market}/${route.params.marketId}`,
  },
  { name: route.params.type, url: `#` },
];
onMounted(() => {});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
