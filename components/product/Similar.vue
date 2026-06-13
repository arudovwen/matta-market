<template>
  <div class="">
    <div class="lg:mb-[30px]">
      <div class="flex items-center justify-between mb-6">
        <h2
          class="text-xs sm:text-base lg:text-xl font-bold text-[#222] darks:text-white"
        >
          Similar products you might like
        </h2>
      </div>

      <div
        v-if="!loading"
        class="flex pb-6 overflow-x-auto gap-x-4 md:gap-x-6 no-scrollbar hover:scrollbar"
      >
        <div
          v-for="slide in productsData.slice(0, 10)"
          :key="slide"
          @click="
            router.push(
              `/product/${encodeURIComponent(slide.title)}/${encodeURIComponent(
                'similar',
              )}/${slide.id}`,
            )
          "
          class="w-full cursor-pointer min-w-[140px] sm:min-w-[160px] lg:min-w-[250px] max-w-[250px] bg-white darks:bg-gray-800 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <div
            class="w-full h-[90px] sm:h-[120px] lg:h-[140px] xl:h-[160px] bg-gray-200 bg-cover bg-center relative"
          >
            <span
              class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
              ><AppIcon
                :icon="!slide.liked ? 'ph:heart' : 'ph:heart-fill'"
                class="text-xs sm:text-sm md:text-base darks:text-white"
            /></span>
            <NuxtImg
              :src="slide.converPhoto"
              alt="Similar"
              width="276"
              height="160"
              class="object-cover w-full h-full"
              fit="cover"
              loading="lazy"
            />
          </div>
          <div class="w-full px-3 py-3 md:py-5 xl:px-5">
            <span
              class="block mb-1 font-medium truncate max-w-max text-[12px] sm:text-sm xl:text-base darks:text-white leading-tight"
              >{{ slide.title }}
              {{
                slide.productBrandName && `- ${slide.productBrandName}`
              }}</span
            >
            <span
              class="block mb-[14px] sm:mb-4 text-[10px] sm:text-[12px] xl:text-sm truncate max-w-max text-[#666] darks:text-white/80 leading-tight"
              >{{ slide.manufacturer }}</span
            >

            <div class="flex items-start justify-between md:items-center">
              <span
                v-if="slide.hidePrice"
                class="font-semibold text-[12px] sm:text-sm xl:text-base text-[#2176FF] leading-tight"
                >Request Quote</span
              >
              <span
                class="flex flex-col text-base md:flex-row gap-x-1 md:items-center"
                v-else
              >
                <!-- <span class="text-xs md:text-base text-[#666] darks:text-white/80"
              >From</span
            > -->
                <span class="flex items-center gap-x-1">
                  <span
                    class="font-bold ml-[2px] text-[12px] sm:text-sm xl:text-base text-[#333] darks:text-white leading-tight"
                    >{{ currencyFormat(slide.price) }}/{{ slide.unit }}</span
                  ></span
                >
                <span
                  v-if="slide?.packString?.[0]?.oldPrice"
                  class="line-through text-gray-500 text-[12px] sm:text-sm xl:text-base leading-tight"
                  >{{ currencyFormat(slide?.packString?.[0]?.oldPrice) }}/{{
                    slide.unit
                  }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="loading"
        class="flex grid-cols-2 pb-6 xl:grid lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-6 no-scrollbar hover:scrollbar"
      >
        <div v-for="n in 5" :key="n">
          <ProductSkelenton />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "~/stores/products";
import { getProducts } from "~/services/productservices";

const router = useRouter();
const route = useRouter();
const store = useProductStore();
const { productData, productsData, loading } = storeToRefs(store);
defineProps({
  title: {
    type: String,
    default: "Hot deals",
  },
});

const breakpoints = {
  300: {
    itemsToShow: 1.6,
    snapAlign: "center",
  },
  565: {
    itemsToShow: 2.6,
    snapAlign: "center",
  },
  // 700px and up
  700: {
    itemsToShow: 3.9,
  },
  // 1024 and up
  1280: {
    itemsToShow: 4.4,
  },
};
function scroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
const queryParams = reactive({
  MarketApplication: "",
  Status: "",
  MarketId: "",
  MarketSubApplication: "",
  PageSize: 10,
  PageNumber: 1,
});

function getAllProducts() {
  store.setLoader(true);
  getProducts({
    ...queryParams,
    applications: productData?.value.marketApplications,
    MarketSubApplication: productData?.value.marketSubapplications,
  })
    .then((res) => {
      if (res.status === 200) {
        store.setProducts(res.data);
        store.setLoader(false);
      }
    })
    .catch(() => {
      store.setLoader(false);
    });
}

onMounted(() => {});
watch(
  () => [productData.value, route],
  () => {
    getAllProducts();
  },
);
</script>
<style>
.carousel__next {
  color: #1570ef;
  background-color: white;
  border-radius: 50em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
