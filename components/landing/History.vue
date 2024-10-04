<template>
  <div class="container mb-[30px]" v-if="searchStore.recentSearchesData.length">
    <div class="flex justify-between items-center mb-4">
      <h2
        class="text-xs sm:text-base lg:text-xl font-bold text-[#222] darks:text-white"
      >
        Based on your search
      </h2>
      <router-link
        :to="`/category/market/${encodeURIComponent('recent searches')}`"
      >
        <button
          class="hover:border-b text-[10px] sm:text-sm lg:text-base border-[#333] darks:text-white darks:border-white leading-tight"
        >
          See all items
        </button>
      </router-link>
    </div>

    <div
      class="flex xl:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-6 no-scrollbar hover:scrollbar overflow-x-auto pb-6"
    >
      <ProductCard
        v-for="(n, idx) in [
          ...searchStore.recentSearchesData,
          ...content,
        ].slice(
          0,
          [...searchStore.recentSearchesData, ...content].length > 10 ? 10 : 5
        )"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
  </div>
</template>
<script setup>
import { getProductsByTag } from "~/services/productservices";

const searchStore = useSearchStore();
const content = ref([])

function getAllProducts() {
  getProductsByTag({ PageNumber: 1, PageSize: 10, tag: "search" }).then(
    (res) => {
      if (res.status === 200) {
        content.value = res?.data?.data?.data;
      }
    }
  );
}

onMounted(() => {
  getAllProducts();
});
</script>
