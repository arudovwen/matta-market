<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4"
    v-if="!isPageLoading"
  >
    <NuxtLink
      v-for="item in products"
      :key="item.id"
      :to="`/product/${encodeURIComponent(item.title)}/${item.id}?market=${
        route.params.type
      }&marketId=${route.params.marketId}`"
    >
      <SingleProduct :product="item" />
    </NuxtLink>
  </div>
  <EmptyData v-if="products.length == 0 && !isPageLoading" />
  <div class="text-center p-6 lg:p-8 my-24" v-if="isPageLoading">
     <AppLoader />
  </div>
  <Pagination
    v-if="!isPageLoading"
    :totalData="pageData.totalData"
    :pageNumber="pageData.PageNumber"
    :pageSize="15"
    @next="next"
    @prev="prev"
    :pagecount="pageData.pagecount"
  />
</template>

<script setup>
import { inject } from "vue";
import { useRoute } from "vue-router";
import SingleProduct from "~/components/SingleProduct";
import EmptyData from "~/components/EmptyData";

const route = useRoute();
const isPageLoading = inject("isPageLoading");
const products = inject("products");
const pageData = inject("totalData");

const next = inject("next");
const prev = inject("prev");
</script>
