<template>
  <div class="container mb-[30px]">
    <div class="flex justify-between items-center mb-4">
      <h2
        class="text-xs sm:text-base lg:text-xl font-bold text-[#222] darks:text-white"
      >
        {{ title }}
      </h2>
      <router-link
        :to="`/category/market/${encodeURIComponent(title)}?tag=${tag}`"
      >
        <button
          class="hover:border-b text-[10px] sm:text-sm lg:text-base border-[#333] darks:text-white darks:border-white leading-tight"
        >
          See all items
        </button>
      </router-link>
    </div>

    <div
      v-if="content.length && !isLoading"
      class="flex xl:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-6 no-scrollbar hover:scrollbar overflow-x-auto pb-6"
    >
      <ProductCard
        v-for="(n, idx) in content.slice(0, 5)"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
    <div
      v-if="isLoading"
      class="flex xl:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-6 overflow-x-hidden hover:overflow-x-auto pb-6"
    >
      <div v-for="n in 5" :key="n">
        <ProductSkelenton />
      </div>
    </div>
  </div>
</template>
<script setup>
import { getProductsByTag } from "~/services/productservices";

const props = defineProps({
  title: {
    type: String,
    default: "Hot deals",
  },
  tag: {
    type: String,
    default: "hotdeals",
  },
});
const isLoading = ref(true);
const content = ref([]);
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
  1280: {
    itemsToShow: 4.9,
  },
};

function getAllProducts() {
  getProductsByTag({ PageNumber: 1, PageSize: 8, tag: props.tag })
    .then((res) => {
      if (res.status === 200) {
        content.value = res?.data?.data?.data;
        isLoading.value = false;
      }
    })
    .catch(() => {
      // setLoader(false);
      isLoading.value = false;
    });
}

onMounted(() => {
  getAllProducts();
});
</script>
