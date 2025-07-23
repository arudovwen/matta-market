<template>
  <NuxtLink :to="productUrl" class="block w-full">
    <div
      class="w-full min-w-[160px] sm:max-w-[160px] md:min-w-[200px] md:max-w-[200px] xl:max-w-[280px] bg-white darks:bg-gray-800 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] darks:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      <div
        class="w-full h-[90px] sm:h-[120px] lg:h-[140px] xl:h-[160px] bg-gray-200 bg-cover bg-center relative"
      >
        <span
          class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
        >
          <AppIcon
            :icon="!detail.liked ? 'ph:heart' : 'ph:heart-fill'"
            class="text-xs sm:text-sm md:text-base darks:text-white"
          />
        </span>
        <NuxtImg
          v-if="detail.converPhoto"
          :src="detail.converPhoto"
          alt="Card"
          width="276"
          height="160"
          class="object-cover w-full h-full"
          fit="cover"
       
        />
        <div
          v-else
          class="relative w-full h-full bg-gray-200 bg-center bg-cover"
        ></div>
      </div>
      <div class="w-full px-3 py-3 md:py-5 xl:px-5">
        <span
          class="block mb-1 font-medium truncate max-w-[120px] md:max-w-max text-[12px] sm:text-sm xl:text-base darks:text-white leading-tight"
          >{{ detail.title }}</span
        >
        <span
          class="block mb-[14px] sm:mb-[25px] text-[10px] sm:text-[12px] xl:text-sm truncate max-w-max text-[#666] darks:text-white/80 leading-tight"
          >{{ detail.manufacturer }}</span
        >
        <div class="flex items-start justify-between md:items-center">
          <span
            v-if="detail.hidePrice"
            class="font-semibold text-[12px] sm:text-sm xl:text-base text-[#2176FF] leading-tight"
            >Request Quote</span
          >
          <span
            class="flex flex-col text-base md:flex-row gap-x-1 md:items-center"
            v-else
          >
            <span class="flex items-center gap-x-1">
          
              <span
                class="font-bold ml-[2px] text-[12px] sm:text-sm xl:text-base text-[#333] darks:text-white leading-tight"
                >{{ currencyFormat(detail.price) }}/{{ detail.unit }}</span
              >
              <span
                v-if="detail?.packString?.[0]?.oldPrice"
                class="line-through text-gray-500 text-[12px] sm:text-sm xl:text-base leading-tight"
                >{{ currencyFormat(detail?.packString?.[0]?.oldPrice) }}/{{
                  detail.unit
                }}</span
              >
            </span>
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// Define props
const props = defineProps(["detail"]);

// Use route composable
const route = useRoute();

// Computed property for product URL
const productUrl = computed(() => {
  const productTitle = encodeURIComponent(props.detail.title);
  const routeTitle = route.params?.title
    ? `/${encodeURIComponent(route.params.title)}`
    : "";
  const productId = props.detail.id;
  const categoryId = route.params?.id ? route.params.id : "";
  return `/product/${productTitle}${routeTitle}/${productId}?categoryId=${categoryId}`;
});
</script>
