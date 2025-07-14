<template>
  <NuxtLink to="/">
    <NuxtImg
      v-if="!dark"
      src="/images/logo.png"
      alt="flux"
      :class="className"

    />
    <NuxtImg
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
