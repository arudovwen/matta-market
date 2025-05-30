<template>
  <div class="">
    <Select
      v-model="currentCurrency"
      :options="options"
      placeholder="Select currency"
      classInput="px-2 outline-none cursor-pointer text-sm !border-none !shadow-none !w-[80px] md:!text-white"
    />
  </div>
</template>

<script setup>
const currentCurrency = inject("currentCurrency");
const options = [
  {
    label: "NGN",
    value: "NGN",
  },

  {
    label: "USD",
    value: "USD",
  },
];
</script>
