<template>
  <div
    data-testid="deal-container"
    class="bg-[#1849A9] text-xs sm:text-sm py-3"
  >
    <div class="container flex items-center justify-between gap-x-6">
      <div
        class="flex font-normal text-left text-white gap-x-2 md:items-center"
      >
        <AppIcon icon="gravity-ui:seal-percent" iconClass="text-lg" />
        <span class="" data-testid="promo"
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
      <span class="items-center hidden text-sm md:flex gap-x-4">
        <template v-if="authStore.isLoggedIn">
          <NotificationComponent
        /></template>
        <button
          type="button"
          aria-label="cart"
          @click="navigateTo('/cart')"
          class="relative flex items-center"
        >
          <span
            class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center"
          >
            <AppIcon
              class="text-base md:text-lg text-[#484848]"
              icon="lucide:shopping-cart"
            />
            <span
              v-if="cartStore?.cartTotal > 0"
              class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
              >{{ cartStore?.cartTotal }}</span
            >
          </span>
        </button>
        <span lass="text-sm"><CurrencyChanger /></span>
        <span class="hidden text-sm text-white lg:inline">
          <GoogleTranslateSelect
            :fetch-browser-language="false"
            trigger="click"
            @select="handleGoogleTranslateSelect"
          />
        </span>
      </span>
    </div>
  </div>
</template>
<script setup>
import { toast } from "vue3-toastify";
import GoogleTranslateSelect from "@google-translate-select/vue3";

const cartStore = useCartStore();
const authStore = useAuthStore()
const handleGoogleTranslateSelect = (language) => {
  console.log(language);
};
</script>
