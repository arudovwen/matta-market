<template>
  <div class="rounded-[20px] bg-white p-4">
    <div class="mb-4 sm:mb-8 relative h-[100px] sm:h-[150px]">
      <img
        alt="cover image"
        class="h-[100px] sm:h-[150px] w-full rounded-[20px] object-cover z-[2] relative"
        :src="
          product.converPhoto && product.converPhoto !== 'null'
            ? product.converPhoto
            : require('../assets/img/img1.png')
        "
      />
      <div
        class="bg-gray-200 animate-pulse h-[100px] sm:h-[150px] w-full rounded-[20px] z-[1] absolute top-0"
      ></div>
      <span
        class="w-16 sm:w-20 h-16 sm:h-20 rounded-lg bg-white shadow p-4 flex items-center justify-center absolute left-5 -bottom-10 z-[2]"
      >
        <img
          alt="prod image"
          class=""
          src="../assets/img/logo.svg"
          width="80"
          height="80"
        />
      </span>
    </div>
    <div class="px-3">
      <div class="flex justify-end mb-4">
        <HeartIcon v-if="!product.liked" class="w-5 h-5 text-matta-black" />
        <HeartSolidIcon v-if="product.liked" class="w-5 h-5 text-primary" />
      </div>
      <div class="">
        <div class="min-h-[60px] sm:min-h-[75px] mb-1">
          <p
            class="font-medium text-base sm:text-lg lg:text-xl text-matta-black mb-1 leading-[1.4]"
          >
            {{ product.title }}
          </p>
          <p
            class="font-normal text-xs lg:text-[13px] text-matta-black uppercase mb-4"
          >
            {{ product.manufacturer }}
          </p>
        </div>
        <div class="min-h-[40px] sm:min-h-[45px]">
          <div v-if="product.isAvailable && !product.hidePrice">
            <p
              class="font-normal text-xs lg:text-[13px] text-[#B6B7B9] uppercase mb-1"
            >
              from
            </p>
            <p
              class="font-medium text-base sm:text-lg lg:text-xl text-matta-black"
            >
              {{ currencyFormat(product.price) }}
              <span class="font-normal text-xs lg:text-[13px] uppercase"
                >/{{ product.unit }}</span
              >
            </p>
          </div>
          <span
            v-else-if="product.isAvailable && product.hidePrice"
            class="border border-[#ddd] px-2 py-2 text-xs text-matta-black rounded"
            >Request Quote</span
          >
          <span
            v-else
            class="border border-[#ddd] px-2 py-2 text-xs text-matta-black rounded"
            >Not Available</span
          >
        </div>

        <hr class="my-3 sm:my-4 border-[#E7EBEE]" />
        <div>
          <div class="flex justify-start gap-x-2 items-center">
            <p class="font-normal text-sm text-matta-black">
              <i class="uil uil-box mr-1"></i> {{ product.optionCount }} options
            </p>
            <span class="bg-[#ddd] rounded-full h-1 w-1"></span>
            <p class="font-normal text-sm text-matta-black">
              {{ product.packType }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/vue/24/solid";
import { defineProps, inject } from "vue";

defineProps(["product"]);
</script>
