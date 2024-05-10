<template>
  <section class="bg-[#101828]">
    <div class="container py-[96px] text-center">
      <div data-aos="fade-in"
      data-aos-once="true" class="max-w-[1024px] mx-auto text-center pl-6 pr-6">
        <carousel class=" mx-auto text-center">
          <slide v-for="slide in 2" :key="slide">
            <div class="carousel__item px-5">
              <p
                class="text-base xl:text-3xl text-white font-medium mb-8"
              >
                Love the simplicity of the service and the prompt customer
                support. We can’t imagine working without it.
              </p>
             <div class="flex flex-col justify-center gap-y-1 mb-6 items-center">
                <span class="inline h-10 md:h-16 w-10 md:w-16 rounded-full bg-gray-100 mb-1"></span>
                <p
                class="font-medium text-[11px] sm:text-xs md:text-sm xl:text-xl text-white text-center"
              >
                James Orji
              </p>
              <p class="text-xs xl:text-base text-[#D0D5DD] text-center">
                Head of Design, Layers.
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
