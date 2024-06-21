<template>
  <div class="p-8 text-center mt-24">
    <CheckCircleIcon class="h-20 w-20 text-green-400 mb-8 mx-auto" />
    <p class="text-xl font-medium">Request has been sent</p>
    <p class="text-xs mb-5">
      We will notify you as soon as we receive your request.
    </p>
    <button
      @click="isComplete = false"
      type="button"
      class="appearance-none border border-matta-black leading-none px-[14px] py-[10px] rounded-lg text-white bg-matta-black hover:opacity-70 text-[13px] uppercase"
    >
      Request another
    </button>
  </div>
</template>
<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { inject } from "vue";

const isComplete = inject("isComplete");
</script>
