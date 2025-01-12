<template>
  <NuxtLink to="/">
    <img
      v-if="!dark"
     src="/images/logo.png"
      alt="flux"
      :class="className"
    />
    <img
      v-else
     src="/images/logo.png"
      alt="flux"
      :class="className"
    />
  </NuxtLink>
</template>

<script setup>
defineProps({
  className: {
    default: "w-[80px] h-auto",
    type: String,
  },
  dark: {
    default: false,
  },
});
</script>
