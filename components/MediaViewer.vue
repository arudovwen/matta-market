<template>
  <IndexModal :is-open="open" @toggle-popup="emits('close')">
    <template #content>
      <div
        class="h-[80vh] w-[90vh] overflow-auto p-6 bg-white rounded-lg relative"
      >
        <!-- <button
          @click="emits('close')"
          type="button"
          class="absolute h-6 w-6 text-matta-black bg-[#F5F5F5] rounded-full flex items-center justify-center text-[13px] top-4 right-4"
        >
          <AppIcon icon="ph:x-bold" />
        </button> -->
        <!-- <embed
          style="height: 100%; width: 100%"
          v-if="media && fileType === 'pdf'"
          :src="media"
        ></embed> -->
        <VuePdf
          v-if="media && fileType.includes('pdf')"
          v-for="page in numOfPages"
          :key="page"
          :src="media"
          :page="page"
        />
        <img :src="media" class="w-full h-full object-contain" v-else />
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { VuePdf, createLoadingTask } from "vue3-pdfjs/esm";
// import PDFViewer from "pdf-viewer-vue";

const numOfPages = ref(1);
onMounted(() => {
  const loadingTask = createLoadingTask(props.media);
  loadingTask.promise.then((pdf) => {
    numOfPages.value = pdf.numPages;
  });
});
const props = defineProps(["media", "open"]);
const emits = defineEmits(["close"]);
const fileType = computed(() => {
  const temp = props?.media?.split(".");
  if (temp?.pop()?.toLowerCase().includes("pdf")) {
    const loadingTask = createLoadingTask(props.media);
    loadingTask.promise.then((pdf) => {
      numOfPages.value = pdf.numPages;
    });
  }
  return temp?.pop()?.toLowerCase() || "jpg";
});
// const mediaTypes = ["jpg", "png", "jpeg", "svg"];
</script>
