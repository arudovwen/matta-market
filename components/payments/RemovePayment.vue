<template>
  <h3 class="font-medium text-2xl mb-6">Remove payment method</h3>
  <p class="mb-8">Are you sure you want to remove this payment method?</p>
  <div
    class="group p-4 mb-8 rounded-2xl flex justify-between h-[100px] items-center hover:bg-matta-black hover:text-white border border-[#ddd]"
  >
    <div class="flex items-center gap-x-3">
       <img src="~/assets/img/master.svg" class="" />
      <!--  <img src="~/assets/img/visa.svg" v-else class="" /> -->
      <div>
        <div class="flex items-center mb-2 gap-x-2">
          <p class="font-medium text-matta-black">Visa **** 4536</p>
        </div>
        <p class="flex gap-x-4 items-center text-sm">
          <span class="text-matta-black">Expiry 05/24</span>
        </p>
      </div>
    </div>
  </div>
  <div class="flex items-center gap-x-4">
    <button
      @click="togglePopup"
      type="button"
      class="text-[13px] uppercase text-matta-black px-2 py-2 hover:text-primary/80 w-full"
    >
      cancel
    </button>
    <button
      @click="removeCard"
      type="button"
      class="border text-[13px] border-primary- uppercase w-full text-white bg-primary-500 rounded-lg px-2 py-3 hover:bg-primary/80"
    >
      remove
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";
const togglePopup = inject("togglePopup");
const removeCard = inject("removeCard");
</script>
