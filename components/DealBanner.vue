<template>
  <div
    data-testid="deal-container"
    class="bg-[#1849A9] text-xs sm:text-sm py-3"
  >
    <div class="container flex gap-x-2 items-center text-white font-normal">
      <AppIcon icon="gravity-ui:seal-percent" iconClass="text-lg" />
      <span data-testid="promo"
        >Get N50,000 off when you sign up and make your first purchase. &nbsp;
        Use the code
        <span
          v-clipboard="'1ST50KOFF'"
          @click="toast.success('Copied')"
          class="md:border md:border-white rounded-[4px] md:px-1 md:py-[2px] cursor-pointer font-semibold md:font-bold text-xs"
          >1ST50KOFF</span
        >
        on checkout</span
      >
    </div>
  </div>
</template>
<script setup>
import { toast } from 'vue3-toastify';
</script>