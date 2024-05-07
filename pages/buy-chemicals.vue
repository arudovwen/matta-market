<template>
  <section class="bg-white">
    <div class="pattern">
      <BuyChemicalTop />
    </div>
    <LandingBrands title="Supplies from brands you can trust" />
    <BuyChemicalSearch />
    <BuyChemicalRequest />
    <BuyChemicalAccess />
    <BuyChemicalLove />
    <BuyChemicalTraditional />
    <BuyChemicalFaqs />
  </section>
</template>
<script setup>
useHead({
  title: "Buy Chemicals | Matta",
});
</script>
<style scoped>
.pattern {
  background-image: url("/pattern.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
