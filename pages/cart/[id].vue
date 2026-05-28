<template>
    Carte
    </template>
<script setup>

definePageMeta({
  middleware: "auth",
})

onBeforeMount(() => {
  navigateTo('/cart')
})
</script>