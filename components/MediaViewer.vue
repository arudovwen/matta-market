<template>
  <IndexModal :is-open="open" @toggle-popup="emits('close')">
    <template #content>
      <div
        class="h-[80vh] w-[90vh] p-6 bg-white rounded-lg relative flex flex-col gap-y-2"
      >
        <div class="flex-1 w-full overflow-auto h-full">
          <div v-if="loading && media.includes('.pdf')" class="h-full w-full flex items-center justify-center" >
            <AppIcon icon="fa:spinner" iconClass="fa-spin text-[80px]" />
          </div>
          <VuePdf
            v-if="media.includes('.pdf')"
            v-for="page in numOfPages"
            :key="page"
            :src="media"
            :page="page"
          />
          <img :src="media" class="w-full h-full object-contain" v-else />
        </div>
        <div class="flex justify-end">
          <button
            @click="downloadFile(media)"
            type="button"
            class="bg-primary-500 rounded-lg text-white text-sm px-[14px] py-[10px]"
          >
            Download file
          </button>
        </div>
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { VuePdf, createLoadingTask } from "vue3-pdfjs/esm";
// import PDFViewer from "pdf-viewer-vue";

const numOfPages = ref(1);
const loading = ref(true);
onMounted(() => {
  const loadingTask = createLoadingTask(props.media);
  loadingTask.promise.then((pdf) => {
    loading.value = false;
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
