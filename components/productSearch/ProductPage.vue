<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 gap-4"
    v-if="!isPageLoading"
  >
    <NuxtLink
      v-for="item in products"
      :key="item.id"
      :to="`/product/${encodeURIComponent(item.title)}/${item.id}`"
    >
      <SingleProduct :product="item" />
    </NuxtLink>
  </div>
  <div class="text-center p-6 lg:p-8 my-24" v-else>
     <AppLoader />
  </div>
  <Pagination
    v-if="!isPageLoading"
    :totalData="queryParams.totalData"
    :pageNumber="queryParams.PageNumber"
    :pageSize="queryParams.PageSize"
    @next="next"
    @prev="prev"
    :pagecount="queryParams.pagecount"
  />
</template>

<script setup>
import { inject } from "vue";
import Pagination from "~/components/PaginationComponent";
import SingleProduct from "~/components/SingleProduct";

const isPageLoading = inject("isPageLoading");
const products = inject("products");
const queryParams = inject("queryParams");

const next = inject("next");
const prev = inject("prev");
</script>
