<template>
  <div class="container">
    <div
      class="bg-white darks:bg-gray-800 rounded-[20px] pt-5 px-4 md:px-[32px] mb-[30px]"
    >
      <div class="flex items-center justify-between mb-4">
        <h2
          class="text-xs sm:text-base lg:text-xl font-bold text-[#222] darks:text-white"
        >
          Recommended
        </h2>
        <NuxtLink
          :to="`/category/market/${encodeURIComponent(
            'recommended'
          )}?tag=${tag}`"
        >
          <button
            class="hover:border-b text-[10px] sm:text-sm lg:text-base border-[#333] darks:text-white darks:border-white leading-tight  px-2 py-1"
          >
            See all items
          </button>
        </NuxtLink>
      </div>
      <div
        v-if="content.length"
        class="flex pb-6 overflow-x-hidden hover:overflow-x-auto gap-x-4 md:gP-X-6"
      >
        <div
          v-for="slide in content.slice(0, 8)"
          :key="slide"
          @click="
            router.push(
              `/product/${encodeURIComponent(slide.title)}/${encodeURIComponent(
                'recommended'
              )}/${slide.id}`
            )
          "
          class="w-full bg-white darks:bg-gray-800"
        >
          <div
            class="w-[120px] md:w-auto h-[77px] sm:h-[130px] xl:h-[185px] bg-gray-200 bg-cover bg-center rounded-[10px] overflow-hidden"
            :style="{ backgroundImage: `url('${slide.converPhoto}')` }"
          ></div>
          <div
            class="w-[120px] sm:w-[200px] lg:w-[240px] pt-[20px] pb-4 xl:pb-[20px] text-left"
          >
            <span
              class="text-[10px] sm:text-sm xl:text-base block mb-2 sm:mb-[10px] font-medium darks:text-white truncate max-w-max"
              >{{ slide.title }}</span
            >
            <span
              class="block mb-4 sm:mb-[25px] text-[10px] sm:text-xs lg:text-sm truncate max-w-max text-[#666] darks:text-white/80 text-left"
              >{{ slide.manufacturer }}</span
            >

            <div class="flex items-center justify-between">
              <span class="flex items-center text-base gap-x-1">
                <span
                  class="font-semibold ml-[2px] text-xs sm:text-sm xl:text-base text-[#333] darks:text-white"
                  >{{ currencyFormat(slide.price) }}/{{ slide.unit }}</span
                ></span
              >

              <!-- <span><AppIcon icon="ph:heart" class="darks:text-white" /></span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "~/stores/products";
import { getProductsByTag } from "~/services/productservices";

const router = useRouter();
const store = useProductStore();
const content = ref([]);
const props = defineProps({
  title: {
    type: String,
    default: "Hot deals",
  },
  tag: {
    type: String,
    default: "recommended",
  },
});
const imageSrc = "/images/test.png";
const breakpoints = {
  300: {
    itemsToShow: 2.4,
    snapAlign: "start",
  },
  565: {
    itemsToShow: 2.6,
    snapAlign: "start",
  },
  // 700px and up
  700: {
    itemsToShow: 3.9,
  },
  // 1024 and up
  1580: {
    itemsToShow: 4.4,
  },
};

function getAllProducts() {
  getProductsByTag({ PageNumber: 1, PageSize: 8, tag: props.tag })
    .then((res) => {
      if (res.status === 200) {
        content.value = res?.data?.data?.data;
      }
    })
    .catch(() => {
      store.setLoader(false);
    });
}
onMounted(() => {
  getAllProducts();
});
</script>
<style>
.carousel__next {
  color: #1570EF;
  background-color: white;
  border-radius: 50em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.carousel__prev {
  left: -26px !important;
}
.carousel__next {
  right: -26px !important;
}
</style>
