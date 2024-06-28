<template>
  <div
    class="rounded-[20px] bg-white p-5 md:p-8 text-left w-full h-full hover:shadow-md"
    v-animate-onscroll="'fade-in-bottom delay-500'"
  >
    <div class="mb-8 relative flex justify-between">
      <span
        class="w-16 md:w-20 h-16 md:h-20 rounded-lg bg-white shadow p-4 flex items-center justify-center"
      >
         <img
          class=""
          alt="product"
          width="80"
          height="80"
          :src="
            manufacturer.logo
              ? manufacturer.logo
              : require('~/assets/img/logo.svg')
          "
        />
      </span>

      <!-- <i
        class="uil uil-arrow-up-right text-xl text-matta-black hover:text-matta-black/70 hover:ring-offset-8 hover:ring-1 ring-gray-100 rounded-full"
      ></i> -->
      <span
        class="text-base text-matta-black hover:text-matta-black/70ring-offset-8 ring-1 ring-gray-100 rounded-full"
        >{{ index < 9 ? 0 : "" }}{{ index + 1 }}</span
      >
    </div>
    <div class="">
      <div class="">
        <div class="">
          <p class="font-medium text-sm md:text-lg text-matta-black md:mb-3">
            {{ manufacturer.title }}
          </p>
          <p
            class="text-xs md:text-sm font-normal text-matta-black flex justify-between md:justify-start items-center"
          >
            <span
              ><i class="uil uil-map-marker"></i>
              {{ manufacturer.location || "Not available" }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["manufacturer", "index"]);
</script>
