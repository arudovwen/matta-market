<template>
  <div class="bg-[#F4F4F4] darks:bg-gray-800 relative">
    <EmptyHeader />
    <div class="h-[calc(100vh-90px)]">
      <slot />
    </div>
  </div>
</template>
<script setup>
useHead({
  title: "Onboarding | Matta",
  meta: [{ name: "description", content: "Onboarding" }],
});
</script>
