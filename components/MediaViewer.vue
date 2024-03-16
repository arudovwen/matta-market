<template>
  <IndexModal :is-open="open" @toggle-popup="emits('close')">
    <template #content>
      <div
        class="h-[80vh] w-[90vh] overflow-auto p-6 bg-white rounded-lg relative"
      >
        <button
          @click="emits('close')"
          type="button"
          class="absolute h-6 w-6 text-matta-black bg-[#F5F5F5] rounded-full flex items-center justify-center text-[13px] top-4 right-4"
        >
          <AppIcon icon="ph:x-bold" />
        </button>
        <PDFViewer
          style="height: 100%; width: 100%"
          v-if="media && fileType === 'pdf'"
          :source="media"
        ></PDFViewer>
        <img :src="media" class="w-full h-full object-contain" v-else />
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import PDFViewer from "pdf-viewer-vue";
import IndexModal from "@/components/IndexModal";
import AppIcon from "@/components/AppIcon";
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps(["media", "open"]);
const emits = defineEmits(["close"]);
const fileType = computed(() => {
  const temp = props?.media?.split(".");
  return temp?.pop()?.toLowerCase() || "jpg";
});
// const mediaTypes = ["jpg", "png", "jpeg", "svg"];
</script>
