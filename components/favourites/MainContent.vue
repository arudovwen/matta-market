<template>
  <div class="flex flex-col gap-y-12">
    <div class="">
      <div class="flex gap-x-4">
        <button
          @click="toggleTab('products')"
          :class="
            showing === 'products'
              ? 'text-white bg-matta-black'
              : 'text-matta-black'
          "
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
          data-testid="products-tab"
        >
          <i class="uil uil-box hidden md:inline"></i>
          <span class="hidden md:inline">| </span>
          <span>favourites products</span>
          <span
            class="px-3 py-1 rounded-full text-[13px]"
            :class="
              showing === 'products'
                ? 'bg-white text-matta-black'
                : 'bg-matta-black text-white'
            "
            >{{ products?.length }}</span
          >
        </button>

        <button
          @click="toggleTab('suppliers')"
          :class="
            showing === 'suppliers'
              ? 'text-white bg-matta-black'
              : 'text-matta-black'
          "
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
          data-testid="suppliers-tab"
        >
          <i class="uil uil-shop hidden md:inline"></i>
          <span class="hidden md:inline">| </span>
          <span>favourites suppliers</span>
          <span
            class="px-3 py-1 rounded-full text-[13px]"
            :class="
              showing === 'suppliers'
                ? 'bg-white text-matta-black'
                : 'bg-matta-black text-white'
            "
            >{{ suppliers.length }}</span
          >
        </button>
      </div>
    </div>
    <FilterBar :showing="showing" />
    <div v-if="showing === 'products'" data-testid="products"><Products /></div>
    <div v-if="showing === 'suppliers'" data-testid="suppliers"><SuppliersContent /></div>
  </div>
</template>

<script setup>
import Products from "./ProductsContent";
import SuppliersContent from "./SuppliersContent";
import { ref, inject } from "vue";
import FilterBar from "./FilterBar";

const showing = ref("products");
function toggleTab(val) {
  showing.value = val;
}

const products = inject("products");
const suppliers = inject("suppliers");
</script>
