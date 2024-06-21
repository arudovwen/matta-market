<template>
  <div
    class="overflow-hidden rounded h-full border border-[#E7E7E7] bg-white flex items-center"
  >
    <button
      type="button"
      :disabled="counter  <= 1"
      @click="counter--"
      :class="btnClass"
      class="h-full px-[15px] flex items-center justify-center bg-white disabled:opacity-60 border-r border-[#E7E7E7]"
    >
      <AppIcon icon="lucide:minus" :class="`text-lg ${iconClass}`" />
    </button>
    <div class="flex-1 flex items-center">
      <input
        v-model="counter"
        class="h-full bg-transparent rounded font-medium text-center outline-none w-full px-1 min-w-[50px]"
        :class="textClass"
      />
    </div>
    <button
      type="button"
      @click="counter++"
      class="h-full px-[15px] flex items-center justify-center bg-white border-l border-[#E7E7E7]"
      :class="btnClass"
    >
      <AppIcon icon="lucide:plus" :class="`text-lg ${iconClass}`" />
    </button>
  </div>
</template>
<script setup>
const counter = inject("counter");
defineProps(["iconClass", "btnClass", "textClass"]);
</script>
