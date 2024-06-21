<template>
  <div class="grid gap-y-3 mb-6 mt-12">
    <label
      @click="active = n"
      :class="`${
        sampleForm.documentCategories.includes(n.value)
          ? 'bg-matta-black text-white'
          : 'bg-[#F1F3F5] '
      } text-[13px] py-[13px] px-6 rounded-lg uppercase flex items-center cursor-pointer justify-between`"
      v-for="n in detail"
      :key="n.value"
    >
      <span class="w-full">
        <input
          type="checkbox"
          v-model="sampleForm.documentCategories"
          :value="n.value"
          class="hidden"
        />
        <span class="capitalize"> {{ n.item }}</span></span
      >
      <CheckIcon
        v-show="sampleForm.documentCategories.includes(n.value)"
        class="w-3 h-3 text-white"
      />
    </label>
  </div>
  <div class="mb-6">
    <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Description</label>
    <textarea
      v-model="sampleForm.description"
      placeholder="Describe documents you'd like to request..."
      row="3"
      class="rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] placeholder:text-xs focus:outline-matta-black/20"
    ></textarea>
  </div>
</template>
<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";
import { inject } from "vue";

const sampleForm = inject("sampleForm");
const detail = [
  {
    item: "Certificate of analysis (COA)",
    value: "Certificate of analysis",
  },
  {
    item: "Material safety data sheet (MSDS)",
    value: "Material safety data sheet (MSDS)",
  },
  {
    item: "Technical data sheet (TDS)",
    value: "Technical data sheet (TDS)",
  },
  {
    item: "other",
    value: "other",
  },
];
</script>
