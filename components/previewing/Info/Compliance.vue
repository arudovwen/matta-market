<template>
    <div class="grid grid-cols-2 gap-x-[75px] gap-y-6">
      <div v-for="n in data">
        <p class="text-[#A4A4A4] text-xs">{{ n.title }}</p>
        <p class="text-sm font-medium">{{ n.value }} {{ n.unit }}</p>
      </div>
    </div>
    <div class="text-gray-500 text-xs py-4" v-if="!data.length">
      No data available
    </div>
  </template>
  <script setup>

  defineProps(["detail"])
  const data = [
    {
      title: "Melting Point",
      value: "49.3",
      unit: "°C",
      key: "mp",
    },
    {
      title: "Industrial Cleaning Agent",
      value: "13.3",
      unit: "(1 % soln/water)",
      key: "ica",
    },
  ];
  </script>
  