<template>
  <section class="rounded-lg px-6 md:px-10 py-12">
    <h1 class="text-4xl font-medium text-matta-black mb-8">Suppliers</h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
      v-if="!isLoading"
    >
      <NuxtLink
        :to="`/page/supplier/${s.name}/${s.id}`"
        v-for="(s, i) in suppliers"
        :key="i"
      >
        <SingleSupplier :supplier="s"
      /></NuxtLink>
    </div>
    <div class="text-center p-6 lg:p-8 my-24" v-else>
       <AppLoader />
    </div>
    <Pagination
      :totalData="queryParams.totalData"
      :pageNumber="queryParams.PageNumber"
      :pageSize="queryParams.PageSize"
      @next="next"
      @prev="prev"
      :pagecount="queryParams.pagecount"
    />
  </section>
</template>

<script setup>
import { getsuppliers } from "~/services/productservices";

const queryParams = reactive({
  Search: "",
  PageSize: 12,
  PageNumber: 1,
  pagecount: 0,
  totalData: 0,
});
const isLoading = ref(true);
const suppliers = ref(null);
onMounted(() => {
  getSuppliers();
});
function getSuppliers() {
  isLoading.value = true;
  getsuppliers(queryParams)
    .then((res) => {
      suppliers.value = res.data.data;
      queryParams.totalData = res.data.totalCount;
      queryParams.pagecount = res.data.data.length;
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
}

function next() {
  queryParams.PageNumber++;
  getSuppliers();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getSuppliers();
}
</script>

<style lang="scss" scoped>
.tab:nth-child(3),
.tab:nth-child(4),
.tab:nth-child(8) {
  grid-column: span 2 / span 2;
}
.tab:nth-child(6),
.tab:nth-child(13) {
  grid-row: span 2 / span 2;
}
@media (max-width: 1024px) {
  .tab:nth-child(3),
  .tab:nth-child(4) {
    grid-column: span 1 / span 1;
  }
  .tab:nth-child(6) {
    grid-row: span 1 / span 1;
  }
}
</style>
