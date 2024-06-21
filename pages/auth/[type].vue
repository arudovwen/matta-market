<template>
  <div
    class="py-8 w-full h-full flex flex-col gap-y-8 max-h-max overflow-y-auto"
  >
    <div class="flex flex-col justify-center flex-1">
      <div class="w-full max-w-[650px] mx-auto py-2">
        <h1 class="text-[#333] darks:text-white mb-[10px] text-3xl font-bold">
          Create an account
        </h1>
        <p class="mb-10 text-sm text-[#666] darks:text-white/80">
          Enter your details to create an account.
        </p>
        <div class="mb-8 flex gap-x-6 items-center w-full">
          <button
            @click="navigateTo(n.url)"
            v-for="n in options"
            :key="n.title"
            class="flex flex-col justify-center gap-y-[6px] items-center rounded-xl p-6 flex-1"
            :class="
              n.type === type
                ? 'border-2 border-[#53B1FD] text-primary-500 shadow-[0px_4px_6px_-2px_#10182808_0px_12px_16px_-4px_#10182814]'
                : 'border border-[#D0D5DD]'
            "
          >
            <span class="block text-[28px]"><AppIcon :icon="n.icon" /></span>
            <span class="block font-medium text-sm">{{ n.title }}</span>
          </button>
        </div>
        <div>
          <AuthVendorSignUp v-if="type === 'vendor-register'" />
          <AuthBuyerSignUp v-if="type === 'register'" />
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
const route = useRoute();
const { type } = route.params;
const options = [
  {
    title: "Buyer account",
    icon: "ri:user-3-line",
    type: "register",
    url: "/auth/register",
  },
  {
    title: "Vendor account",
    icon: "solar:shop-linear",
    type: "vendor-register",
    url: "/auth/vendor-register",
  },
];
</script>
