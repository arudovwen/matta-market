<template>
  <div
    class="p-4 rounded-xl w-full sm:min-w-[200px] max-w-[250px] fixed bg-white top-20 right-0 md:right-5 shadow-[5px_12px_35px_rgba(44,44,44,0.12)] fade-in-right z-[999]"
  >
    <div class="flex items-center justify-between mb-4">
      <span class="text-[13px] text-gray-500 font-bold">ADDED TO CART</span>
      <span @click="emits('close')"><XMarkIcon class="w-4 h-4" /></span>
    </div>
    <div>
      <div v-if="selectedPackage">
        <div class="text-xs mb-2 font-medium max-w-max truncate">{{ name }}</div>
        <div class="flex justify-between items-center">
          <div class="text-[10px] capitalize">
            <span class="">{{ selectedPackage.title }}</span>
            <span class="h-1 w-1 rounded-full bg-gray-300"></span>
            <span>{{ selectedPackage.price }}</span>
          </div>
          <span class="text-[10px]">x {{ quantity }}</span>
        </div>
        <hr class="border-gray-200 my-2" v-if="!hidePrice" />
        <div class="flex justify-between items-center" v-if="!hidePrice">
          <span class="text-xs text-gray-400">Total</span>
          <span class="text-xs font-medium"
            >{{ currencyFormat(totalAmount) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

const emits = defineEmits("close");
defineProps([
  "name",
  "selectedPackage",
  "totalAmount",
  "quantity",
  "hidePrice",
]);
</script>
