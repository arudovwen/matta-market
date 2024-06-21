<template>
  <section class="w-full">
    <NuxtPage />
  </section>
</template>
<script setup>
import { useRoute } from "vue-router";
const store = useAuthStore();
const route = useRoute();
</script>
