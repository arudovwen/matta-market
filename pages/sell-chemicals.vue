<template>
  <section class="bg-white">
    <div class="pattern">
      <SellChemicalTop />
    </div>
    <SellChemicalFaster />
    <SellChemicalRequest />
  </section>
</template>

<script setup>
useHead({
  title: "Sell Chemicals | Matta",
});
</script>
<style scoped>
.pattern {
  background-image: url("/pattern.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
