<template>
  <div class="py-10 container hidden lg:block">
    <h2
      data-aos="fade-up"
      data-aos-once="true"
      class="text-xl font-semibold mb-10 text-center darks:text-white/80"
    >
      Trusted by Leading Global Customers & Suppliers
    </h2>

    <div
      class="grid grid-cols-3 lg:grid-cols-6 gap-6 justify-between items-center"
    >
      <img
        data-aos="fade-up"
        data-aos-once="true"
        v-for="n in brands"
        :src="n"
        :alt="n"
        width="150"
        class="mb-1 mx-auto w-100% h-auto"
      />
    </div>
  </div>
</template>

<script setup>
const Brand1 = "/images/coke.png";
const Brand2 = "/images/cormart.png";
const Brand3 = "/images/honywell.png";
const Brand4 = "/images/basf.png";
const Brand5 = "/images/liquide.png";
const Brand6 = "/images/cargill.svg";
const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6];
</script>
