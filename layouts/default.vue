<template>
  <div
    class="bg-[#F4F4F4] relative w-screen flex flex-col min-h-screen overflow-y-auto"
  >
    <AppHeader :showlang="true" />
    <div class="flex-1">
      <slot />
    </div>
    <AppFooter />
    <a
      data-testid="whatsapp link"
      href="https://wa.me/+2349169982190"
      target="_blank"
      class="z-[99999]"
    >
      <button
        class="fixed bottom-10 transition duration-300 right-4 opacity-80 hover:opacity-100 hover:scale-[1.1]"
      >
        <img
          src="~/assets/img/whatsapp.png"
          width="60"
          height="60"
          alt="whatsapp link"
          class="drop-shadow-lg"
        />
      </button>
    </a>
  </div>
</template>
<script setup>
// const cartStore = useCartStore();

// onMounted(() => {
//   cartStore.getMyCart();
// });
</script>
