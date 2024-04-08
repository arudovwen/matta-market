<template>
  <div
    class="w-[130px] sm:w-[160px] md:w-[200px] xl:w-[260px] bg-white darks:bg-gray-800 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] darks:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden"
  >
  
    <div
      class="w-full h-[90px] sm:h-[120px] lg:h-[140px] xl:h-[160px] bg-gray-200 bg-cover bg-center relative animate-pulse"
    ></div>
    <div class="w-full py-3 md:py-5 px-3 xl:px-5">
      <span
        class="block mb-[6px] font-medium   text-[12px] sm:text-sm xl:text-base darks:text-white leading-tight bg-gray-200 w-[220px] p-[6px] animate-pulse rounded-full"
      ></span>
      <span
        class="block mb-[14px] sm:mb-[25px] text-[10px] sm:text-[12px] xl:text-sm   text-[#666] darks:text-white/80 leading-tight bg-gray-200 w-[140px] p-[6px] animate-pulse rounded-full"
      ></span>

      <div class="flex justify-between items-start md:items-center">
        <span
          class="text-base flex flex-col md:flex-row gap-x-1 md:items-center"
        >
          <!-- <span class="text-xs md:text-base text-[#666] darks:text-white/80"
              >From</span
            > -->
          <span class="gap-x-1 flex items-center">
            <span
              class="text-[#666] darks:text-white/80 text-[12px] sm:text-sm xl:text-base font-semibold leading-tight bg-gray-200 w-[160px] p-[6px] rounded-full animate-pulse"
            ></span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
