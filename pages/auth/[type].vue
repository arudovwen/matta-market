<template>
  <div
    class="pb-6 w-full h-full flex flex-col gap-y-8 max-h-max overflow-y-auto"
  >
    <div class="flex flex-col justify-center flex-1">
      <div class="w-full max-w-[650px] mx-auto py-2">
        <div v-if="step == 1">
          <h1 class="text-[#333] darks:text-white mb-[4px] text-2xl font-bold">
            Create an account
          </h1>
          <p class="mb-10 text-sm text-[#666] darks:text-white/80">
            Enter your details to create an account.
          </p>
        </div>
        <div class="mb-8 flex gap-x-6 items-center w-full" v-if="step == 1">
          <button
            @click="navigateTo(n.url)"
            v-for="n in options"
            :key="n.title"
            class="flex flex-col justify-center gap-y-[6px] items-center rounded-xl py-4 px-8 flex-1 border"
            :class="
              n.type === type
                ? ' border-[#1570EF] text-white bg-[#1570EF] shadow-[0px_4px_6px_-2px_#10182808_0px_12px_16px_-4px_#10182814]'
                : 'border-[#D0D5DD]'
            "
          >
            <span class="block text-[24px]"><AppIcon :icon="n.icon" /></span>
            <span class="block font-medium text-sm">{{ n.title }}</span>
            <span
              class="block font-medium text-[11px]"
              :class="n.type === type ? 'text-white' : 'text-[#667085]'"
              >{{ n.sub }}</span
            >
          </button>
        </div>
        <div>
          <AuthVendorSignUp />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "register",
  middleware: "auth",
});
const step = ref(1);
const route = useRoute();
const { type } = route.params;
const options = [
  {
    title: "Buyer account",
    icon: "ri:user-3-line",
    type: "register",
    url: "/auth/register",
    sub: "Search, buy and place orders for products",
  },
  {
    title: "Vendor account",
    icon: "solar:shop-linear",
    type: "vendor-register",
    url: "/auth/vendor-register",
    sub: "For merchants who wants to sell their products",
  },
];

provide("step", step);
</script>
