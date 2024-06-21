<template>
  <form class="mt-12">
    <legend class="text-lg font-medium mb-2">Usage Details</legend>
    <p class="text-xs text-[#ABABAB] mb-8">
      This information will help us get you the right materials.
    </p>
    <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Number of Samples</label>
      <div class="flex relative">
        <div class="flex relative items-center w-full">
          <select
            :value="request1$.numberofSamples.$model"
            disabled
            :class="{ 'border-red-500 ': request1$.numberofSamples.$error }"
            class="rounded-lg appearance-none px-[14px] py-[10px] h-11 border w-full bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          >
            <option v-for="z in 10" :key="z" :value="z">
              <span class="flex gap-x-6">
                <span> {{ z }}</span></span
              >
            </option>
          </select>
          <!-- <i class="uil uil-sort absolute right-3 pointer-events-none"></i> -->
        </div>
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.numberofSamples.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block"
        >What quantity would you purchase?
      </label>
      <div class="flex relative">
        <!-- <div class="flex relative items-center w-full">
          <select
            v-model="request1$.expectedAnualUsage.$model"
            :class="{ 'border-red-500 ': request1$.expectedAnualUsage.$error }"
            class="rounded-lg appearance-none px-[14px] py-[10px] h-11 border w-full bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          >
            <option :value="1">1 year</option>
            <option :value="2">2 years</option>
            <option :value="3">5 years</option>
            <option :value="4">10 years</option>
          </select>
          <i class="uil uil-sort absolute right-3 pointer-events-none"></i>
        </div> -->
        <div
          class="flex h-[60px] w-full items-center gap-x-3 lg:gap-x-4 rounded-lg bg-[#F1F3F5] relative py-4 md:py-5 text-xs lg:text-[13px] px-4 lg:px-4 uppercase text-matta-black"
        >
          <button
            class="disabled:opacity-20 disabled:cursor-not-allowed p-2"
            type="button"
            @click="sampleForm.expectedAnualUsage -= 1"
            :disabled="sampleForm.expectedAnualUsage <= 1"
          >
            <i class="uil uil-minus text-lg"></i>
          </button>
          <input
            min="1"
            class="min-w-[30px] md:min-w-[50px] text-center text-xs md:text-base bg-transparent focus:outline-matta-black/10 flex-1 p-2"
            v-model="sampleForm.expectedAnualUsage"
          />
          <button
            type="button"
            @click="sampleForm.expectedAnualUsage += 1"
            class="p-2"
          >
            <i class="uil uil-plus"></i>
          </button>
        </div>
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.expectedAnualUsage.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <!-- <div class="mb-6">
      <label class="mb-2 font-medium text-sm text-[#344054] block text-left">Description</label>
      <textarea
        v-model="request1$.description.$model"
        :class="{ 'border-red-500 ': request1$.description.$error }"
        placeholder="Describe intended use to help us route  your request..."
        row="4"
        class="rounded-lg px-[14px] py-[10px] w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] placeholder:text-xs focus:outline-matta-black/20"
      ></textarea>
      <div
        class="text-red-500 mt-1"
        v-for="error of request1$.description.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div> -->
  </form>
</template>
<script setup>
import { inject } from "vue";

const request1$ = inject("request1$");
const sampleForm = inject("sampleForm");
</script>
