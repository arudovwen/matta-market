<template>
  <div class="loader-container">
    <div
      class="loader border-t-4 border-blue-500 border-solid rounded-full h-8 w-8 animate-spin"
    ></div>
  </div>
</template>

<style scoped>
.loader-container {
  @apply flex items-center justify-center h-[300px];
}

.loader {
  @apply border-t-4 border-[#165ef0] border-solid rounded-full h-8 w-8 animate-spin;
}
</style>
