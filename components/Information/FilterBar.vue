<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-x-1">
      <button
        class="flex gap-x-2 items-center uppercase hover:text-white hover:bg-matta-black py-2 px-3 md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        :class="
          filter
            ? 'text-white bg-matta-black'
            : 'text-matta-black bg-transparent'
        "
      >
        <span class=""><i class="uil uil-list-ui-alt text-sm"></i></span>
        <span>All Filters</span>
        <span
          v-if="filter"
          class="bg-white w-4 h-4 text-[10px] rounded-full text-matta-black hover:text-matta-black flex items-center justify-center"
          >5</span
        >
      </button>
      <div class="relative flex items-center">
        <select
          class="appearance-none uppercase text-matta-black bg-transparent py-2 px-3 min-w-[100px] cursor-pointer md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
        >
          <option>Price</option>
        </select>
        <i class="uil uil-angle-down absolute right-2 appearance-none"></i>
      </div>
      <div class="relative flex items-center">
        <select
          class="appearance-none uppercase text-matta-black bg-transparent cursor-pointer py-2 px-3 min-w-[100px] md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
        >
          <option>Area of application</option>
        </select>
        <i class="uil uil-angle-down absolute right-2"></i>
      </div>
      <div class="relative flex items-center">
        <select
          class="appearance-none uppercase text-matta-black bg-transparent cursor-pointer py-2 px-3 min-w-[100px] md:py-3 md:px-6 border rounded-full border-[#ddd] md:leading-5 text-[10px] sm:text-[13px] shadow-sm focus:outline-gray-200"
        >
          <option>producer</option>
        </select>
        <i class="uil uil-angle-down absolute right-2"></i>
      </div>
    </div>

    <div class="flex gap-x-2">
      <button
        class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
      >
        <i class="uil uil-bookmark"></i>
      </button>
      <button
        class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
      >
        <NuxtImg src="/assets/img/sorting.svg" alt="alt" />
      </button>
    </div>
  </div>
</template>
<script setup>
const filter = 5;
</script>
