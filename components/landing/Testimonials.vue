<template>
  <div
    class="container relative mt-10 md:helpersmt-[72px] pb-[100px] md:pb-[120px]"
  >
    <div
      class="rounded-[6px] bg-cover lg:bg-contain bg-no-repeat pt-10 md:pt-[94px] pb-10 md:pb-[88px] relative h-full z-[3]  mx-auto max-w-[1169px]"
      :style="{ backgroundImage: `url('${Wrapper}')` }"
      >
      <div class="max-w-[937px] mx-auto text-center pl-6 pr-6">
        <carousel class="max-w-[937px] mx-auto text-center testimonial">
          <slide v-for="slide in testimonialData" :key="slide">
            <div class="carousel__item px-5">
              <p class="text-xs sm:text-sm lg:text-base xl:text-2xl text-white font-semibold mb-8">
                “{{slide.text}}”
              </p>
              <p
                class="font-medium text-[11px] sm:text-xs md:text-sm xl:text-xl text-white mb-8"
              >
                {{slide.name}}
              </p>
            </div>
          </slide>
          <template #addons>
            <Pagination />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Carousel, Slide, Pagination } from "vue3-carousel";
import Wrapper from "~/assets/images/wrapper.png";
</script>

<style lang="scss">
.testimonial {
  .carousel__pagination-button::after {
    background-color: rgba(217, 217, 217, 0.5);
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
  .carousel__pagination-button--active::after,
  .carousel__pagination-button:hover::after {
    background-color: rgba(217, 217, 217);
  }
  .carousel__item {
    min-height: 200px;
    width: 100%;
  }
}
</style>
