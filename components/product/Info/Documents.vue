<template>
  <div class="grid grid-cols-1 gap-x-[75px] gap-y-6">
    <div
      class="flex jus items-center"
      v-for="(n, id) in documentList"
      :key="id"
    >
      <div class="flex gap-x-2">
        <p class="text-sm font-medium">{{ n.fileName }}</p>
        <p class="text-[#A4A4A4] text-xs">
          {{ parseInt(n.fileSize / 1000) }}kb
        </p>
      </div>

      <div class="flex items-center gap-x-5 text-sm">
        <p class="flex-1 whitespace-nowrap">{{ n.category }}</p>
        <span class="text-gray-200 text-xl font-light">| </span>
        <div class="flex items-center">
          <button
            @click="downloadFile(n.documentUrl)"
            type="button"
            class="border border-gray-300 text-sm rounded-full h-7 w-7 flex items-center justify-center"
          >
            <i class="uil uil-import"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="text-gray-500 text-xs py-4" v-if="!documentList.length">
      No data available
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["detail"]);
const documentType = ref("");

const documentList = computed(() => {
  return props.detail?.filter((i) =>
    i.category.toLowerCase().includes(documentType.value.toLowerCase())
  );
});
</script>
