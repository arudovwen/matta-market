<template>
  <div class="">
   <select v-model="currentCurrency" class="px-2 outline-none cursor-pointer text-sm">
    <option v-for="n in options" :key="n.label" :value="n.label">{{ n.label }}</option>
   </select>
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
