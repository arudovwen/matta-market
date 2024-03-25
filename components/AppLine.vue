<template>
  <div class="bg-gray-100 rounded-full w-full">
    <span :style="{ width: `${value}%` }" class="bg-green-600 rounded-full p-[2px] block">
    </span>
  </div>
</template>

<script setup>
defineProps(["value"]);
</script>
