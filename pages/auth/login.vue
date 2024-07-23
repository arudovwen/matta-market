<template>
  <AuthLogin />
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Login | Matta",
  meta: [{ name: "description", content: "Login | Matta" }],
});

</script>
