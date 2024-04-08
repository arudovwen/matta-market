<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-x-2">
      <div class="relative flex items-center" v-if="showing === 'products'">
        <input
          v-model="productParams.Search"
          :class="
            productParams.Search.length && 'pl-3 pr-10 rounded-lg w-[250px]'
          "
          class="focus:pl-3 focus:pr-10 border border-[#D0D5DD] rounded-full focus:rounded-lg h-11 bg-transparent peer focus:w-[280px] focus:outline-none w-12 transition ease-in-out duration-300"
          type="search"
        />
        <span class="absolute right-4 peer-focus:right-3 pointer-events-none"
          ><i class="uil uil-search"></i
        ></span>
      </div>
      <div class="relative flex items-center" v-if="showing === 'suppliers'">
        <input
          v-model="supplierParams.Search"
          :class="
            supplierParams.Search.length && 'pl-3 pr-10 rounded-lg w-[250px]'
          "
          class="focus:pl-3 focus:pr-10 border border-[#D0D5DD] rounded-full focus:rounded-lg h-11 bg-transparent peer focus:w-[280px] focus:outline-none w-12 transition ease-in-out duration-300"
          type="search"
        />
        <span class="absolute right-4 peer-focus:right-3 pointer-events-none"
          ><i class="uil uil-search"></i
        ></span>
      </div>
      <div class="relative flex items-center" v-if="showing === 'products'">
        <select
          v-model="productParams.SortOrder"
          class="appearance-none uppercase text-matta-black bg-transparent py-2 px-3 min-w-[100px] cursor-pointer md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
        >
          <option value="">Price</option>
          <option value="a">Low - High</option>
          <option value="d">High to Low</option>
        </select>
        <i class="uil uil-angle-down absolute right-2 appearance-none"></i>
      </div>
      <!-- <div class="relative flex items-center">
        <select
          class="appearance-none uppercase text-matta-black bg-transparent cursor-pointer py-2 px-3 min-w-[100px] md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
        >
          <option>Area of application</option>
        </select>
        <i class="uil uil-angle-down absolute right-2"></i>
      </div> -->
      <div class="relative flex items-center" v-if="showing === 'products'">
        <select
          v-model="productParams.Manufacturer"
          class="appearance-none uppercase text-matta-black bg-transparent cursor-pointer py-2 px-3 min-w-[100px] md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
        >
          <option value="">Producer</option>
          <option :value="p.title" v-for="(p, id) in producers" :key="id">
            {{ p.title }}
          </option>
        </select>
        <i class="uil uil-angle-down absolute right-2"></i>
      </div>
    </div>

    <div class="flex gap-x-2">
      <SortFilter @onGetData="onGetData">
        <template #content>
          <button
            class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
          >
             <img
              src="~/assets/img/sorting.svg"
              alt="sorting"
            /></button></template
      ></SortFilter>
    </div>
  </div>
</template>
<script setup>
import { defineProps, inject, watch } from "vue";
import debounce from "lodash/debounce";
import SortFilter from "~/components/forms/SortFilter";

defineProps(["showing"]);

const getAllProducts = inject("getAllProducts");
const productParams = inject("productParams");
const supplierParams = inject("supplierParams");
const producers = inject("producers");
const debounceSearch = debounce(() => {
  getAllProducts();
}, 1500);
watch(
  () => productParams.Search,
  () => {
    debounceSearch();
  }
);
function onGetData(val) {
  productParams.sortOrder = val;
}
</script>
