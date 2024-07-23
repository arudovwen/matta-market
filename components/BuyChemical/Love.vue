<template>
  <section class="bg-[#101828]">
    <div class="container py-[96px] text-center">
      <div
    
        class="max-w-[1024px] mx-auto text-center pl-6 pr-6"
      >
        <carousel class="mx-auto text-center">
          <slide v-for="slide in testimonialData" :key="slide">
            <div class="carousel__item px-5">
              <p class="text-base xl:text-3xl text-white font-medium mb-10">
                “{{ slide.text }}”
              </p>
              <div
                class="flex flex-col justify-center gap-y-1 mb-6 items-center"
              >
             
                <p class="text-xs xl:text-base text-[#D0D5DD] text-center">
                  {{ slide.name }}
                </p>
              </div>
            </div>
          </slide>

          <template #addons>
            <Pagination />
          </template>
        </carousel>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Carousel, Slide, Pagination } from "vue3-carousel";
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
