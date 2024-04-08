<template>
  <div
    v-if="!suppliers.length"
    class="h-[310px] rounded-lg w-full flex items-center justify-center bg-[#F1F3F5]"
  >
    <div class="text-center max-w-sm mx-auto">
       <img
        src="~/assets/img/nofound.svg"
        class="w-[52px] h-auto mx-auto mb-4"
      />

      <p class="text-2xl text-matta-black mb-5 text-center">
        You have no supplier in <br />
        your favourites
      </p>
      <NuxtLink to="/suppliers">
        <button
          class="bg-primary-500 text-white text-sm rounded-full px-6 py-3 uppercase"
        >
          Go to suppliers page
        </button>
      </NuxtLink>
    </div>
  </div>
  <div v-else>
    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      v-if="!isPageLoading"
    >
      <NuxtLink
        :to="`/page/supplier/${s.name}/${s.id}`"
        v-for="(s, i) in suppliers"
        :key="i"
      >
        <SingleSupplier :supplier="s" />
      </NuxtLink>
    </div>
    <Pagination
      v-if="!isPageLoading"
      :totalData="supplierParams.totalData"
      :pageNumber="supplierParams.PageNumber"
      :pageSize="10"
      @next="next"
      @prev="prev"
      :pagecount="supplierParams.pagecount"
    />
  </div>
  <div class="text-center p-6 lg:p-8 mt-24" v-if="isPageLoading">
     <AppLoader />
  </div>
</template>

<script setup>
import SingleSupplier from "~/components/SingleSupplier";
import { inject } from "vue";
import Pagination from "~/components/PaginationComponent";

const isPageLoading = inject("isPageLoading");
const supplierParams = inject("supplierParams");
const suppliers = inject("suppliers");
function next() {
  supplierParams.PageNumber++;
}
function prev() {
  if (supplierParams.PageNumber == 1) return;
  supplierParams.PageNumber--;
}
</script>
