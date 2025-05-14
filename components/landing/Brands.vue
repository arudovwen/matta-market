<template>
  <div class="py-10 container hidden lg:block">
    <h3
     
      class="text-xl font-semibold mb-10 text-center darks:text-white/80"
    >
      {{title}}
    </h3>

    <div
      class="grid grid-cols-3 lg:grid-cols-6 gap-6 justify-between items-center"
    >
      <img
       
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
defineProps({
  title:{
    default:"Trusted by Leading Global Customers & Suppliers"
  }
})

const Brand1 = "/images/cormart.png";
const Brand2 = "/images/dow.png";
const Brand3 = "/images/nycil.png";
const Brand4 = "/images/basf.png";
const Brand5 = "/images/dairy.png";
const Brand6 = "/images/cargill.svg";
const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6];
</script>
