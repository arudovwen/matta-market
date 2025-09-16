<template>
  <div class="rounded-[10px] overflow-hidden relative group aspect-[1440/248] w-full">
    <!-- Skeleton Loader -->
    <div
      v-if="!isLoaded"
      class="absolute inset-0 bg-gray-300 animate-pulse rounded-[10px] z-0"
    ></div>

    <!-- NuxtLink wrapper -->
    <NuxtLink :to="link" class="block h-full w-full relative z-10">
      <!-- Image -->
      <img
        v-if="isImage"
        :src="url"
        alt="media"
        crossorigin
        loading="lazy"
        @load="handleLoad"
        class="w-full h-full object-cover rounded-[10px]"
      />

      <!-- Video -->
      <video
        v-else-if="isVideo"
        :src="url"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        @loadeddata="handleLoad"
        class="w-full h-full object-cover rounded-[10px]"
      ></video>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  url: {
    type: String,
    default:
      "https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto/v0q5ahswrqzvtqrfkp9g",
  },
  link: {
    type: String,
    default:
      "https://matta.trade/product/ASPARTAME/3009649000015519001?categoryId=",
  },
  type: {
    type: String,
    default: "image",
    validator: (val) => ["image", "video"].includes(val),
  },
});

const isLoaded = ref(false);
const isImage = computed(() => props.type === "image");
const isVideo = computed(() => props.type === "video");

function handleLoad() {
  isLoaded.value = true;
}
</script>
