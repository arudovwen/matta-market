<template>
  <NuxtLink
    :to="`/product/${encodeURIComponent(detail.title)}/${encodeURIComponent(
      detail.category
    )}/${detail.id}`"
    class="w-full"
  >
    <div
      class="bg-white darks:bg-gray-800 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] darks:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      <div
        class="h-[90px] sm:h-[120px] lg:h-[140px] xl:h-[160px] bg-gray-200 bg-cover bg-center relative"
        :style="{ backgroundImage: `url('${detail.img}')` }"
      >
      <span
          class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
          ><AppIcon
            icon="ph:heart"
            class="text-xs sm:text-sm md:text-base darks:text-white"
        /></span>
      </div>
      <div class="py-3 md:py-5 px-3 md:px-5">
        <span
          class="block mb-2 sm:mb-[10px] font-bold truncate max-w-max text-[10px] sm:text-sm md:text-base darks:text-white leading-tight"
          >{{ detail.title }}</span
        >
        <span
          class="block mb-[14px] sm:mb-[25px] text-[10px] sm:text-sm md:text-base truncate max-w-max text-[#666] darks:text-white/80 leading-tight"
          >{{ detail.company }}</span
        >

        <div class="flex justify-between items-start md:items-center">
          <span
            v-if="detail.type === 'request'"
            class="font-semibold text-[13px] md:text-sm text-[#2176FF] leading-tight"
            >Request Quote</span
          >
          <span
            class="text-base flex flex-col md:flex-row gap-x-1 md:items-center"
            v-else
          >
            <!-- <span
              class="text-[11px] md:text-xs text-[#666] darks:text-white/80"
              >From</span
            > -->
            <span class="gap-x-1 flex items-center">
           
              <span
                class="font-bold ml-[2px] text-[13px] md:text-base text-[#333] darks:text-white leading-tight"
                >{{ currencyFormat(detail.newprice) }}/kg</span
              ></span
            >
            <span
                    v-if="detail?.packString?.[0]?.oldPrice"
                    class="line-through text-gray-400  text-[12px] sm:text-sm xl:text-base leading-tight"
                    >{{ currencyFormat(detail?.packString?.[0]?.oldPrice) }}/{{ detail.unit }}</span
                  >
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
defineProps(["index", "detail"]);
</script>
