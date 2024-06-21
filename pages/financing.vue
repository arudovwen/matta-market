<template>
  <NuxtPage :page-key="route => route.fullPath" />
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
