<template>
  <h3 class="font-medium text-2xl mb-6">Remove user</h3>
  <p class="mb-12">Are you sure you want to remove this user?</p>

  <div class="flex items-center gap-x-4">
    <button
      @click="togglePopup"
      type="button"
      class="text-[13px] uppercase text-matta-black px-2 py-2 hover:text-primary/80 w-full"
    >
      cancel
    </button>
    <button
      type="button"
      @click="removeUser()"
      class="border text-[13px] border-primary- uppercase w-full text-white bg-primary-500 rounded-lg px-2 py-3 hover:bg-primary/80"
    >
      remove
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";

const togglePopup = inject("togglePopup");
const removeUser = inject("removeUser");
</script>
