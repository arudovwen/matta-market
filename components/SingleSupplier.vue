<template>
  <div
    class="rounded-[20px] bg-white p-5 md:p-8 text-left w-full h-full hover:shadow-md"
    v-animate-onscroll="'fade-in-bottom delay-500'"
  >
    <div class="relative flex justify-between">
      <div class="flex gap-x-4 items-center">
        <span
          class="w-16 md:w-20 h-16 md:h-20 rounded-lg bg-white shadow p-4 flex items-center justify-center"
        >
           <img class="" alt="logo" :src="supplier.logo" />
        </span>
        <div>
          <p
            class="font-medium text-sm md:text-base text-matta-black mb-1 capitalize max-w-[200px] truncate"
          >
            {{ supplier.name }}
          </p>
          <p class="font-normal text-sm text-matta-black md:mb-3">
            <i class="uil uil-map-marker"></i> {{ supplier.city }},
            {{ supplier.country }}
          </p>
        </div>
      </div>
      <span>
        <HeartIcon v-if="!supplier.isLiked" class="w-5 h-5 text-matta-black" />
        <HeartSolidIcon v-if="supplier.isLiked" class="w-5 h-5 text-primary"
      /></span>
    </div>
    <div class="">
      <div class="">
        <div class="">
          <hr class="my-4" />
          <p
            class="text-xs md:text-sm font-normal text-matta-black flex flex-col gap-y-2"
          >
            <span class="">
              <i class="uil uil-award mr-1"></i> Member since
              {{ moment(supplier.activeDate).format("ll") }}</span
            >

            <!-- <span>
              <i class="uil uil-box mr-1"></i>
              {{ supplier.productCount || 0 }} products available</span
            > -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/vue/24/solid";
import { defineProps } from "vue";
import moment from "moment";
defineProps(["supplier"]);
</script>
