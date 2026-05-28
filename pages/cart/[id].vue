<template>
  <div class="flex items-center justify-center h-screen w-screen">
    <AppLoaderV2 />
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "auth",
});

onBeforeMount(() => {
  navigateTo("/cart");
});
</script>
