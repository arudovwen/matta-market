<template>
  <div>
    <p class="font-medium text-[#475467] text-sm mb-1">{{ title }}</p>
    <p class="font-normal text-[#667085] text-sm mb-6">
      {{ text }}
    </p>

    <div class="border rounded-lg bg-white px-4 py-5 text-center">
       <img alt="file upload" src="~/assets/img/upload.svg" class="mx-auto mb-3" />
      <span class="text-sm text-[#667085]"
        ><span class="text-[#1570EF]">Click to upload</span> or drag and drop
        files here</span
      >
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  text: {
    default: "You can upload more than 1",
  },
  title: {
    default: "",
  },
});
</script>
