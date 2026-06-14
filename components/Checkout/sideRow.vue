<template>
  <div class="flex justify-between">
    <p class="text-sm text-[#E1E1E1]">{{ label }}</p>
    <p
      :class="['text-xs', isBold ? 'font-medium' : 'font-normal', textColor]"
    >
      {{ isNegative ? "-" : "" }} {{ currencyFormat(value) }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], required: true },
  isNegative: { type: Boolean, default: false },
  isBold: { type: Boolean, default: false },
  textColor: { type: String, default: "text-white" },
});
</script>
