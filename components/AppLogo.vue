<template>
  <NuxtLink to="/">
    <NuxtImg
      v-if="!dark"
      src="/images/logo.png"
      alt="flux"
      :class="className"
      format="webp"
    />
    <NuxtImg
      v-else
      src="/images/logo.png"
      alt="flux"
      :class="className"
      format="webp"
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
