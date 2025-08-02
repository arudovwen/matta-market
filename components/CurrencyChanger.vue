<template>
  <div v-if="currencyStore.currencies?.length" class="">
    <Select
      v-model="currentCurrency"
      :options="currencyStore.currencies"
      placeholder="Select currency"
      classInput="px-2 outline-none cursor-pointer text-sm !border-none !shadow-none !w-[80px] md:!text-white"
    />
  </div>
</template>

<script setup>
const currencyStore = useCurrencyStore();
const currentCurrency = inject("currentCurrency");

onMounted(() => {
  currencyStore.getCurrencies();
});
watchEffect(() => {
  currencyStore.setActiveCurrency(currentCurrency.value);
});
watchEffect(() => {
  currentCurrency.value = currencyStore.defaultCurrency;
});
</script>
