<template>
  <div v-if="!isPageLoading">
    <div
      v-if="!products.length"
      class="h-[310px] rounded-lg w-full flex items-center justify-center bg-[#F1F3F5]"
    >
      <div class="text-center max-w-sm mx-auto">
         <img
          src="~/assets/img/nofound.svg"
          class="w-[52px] h-auto mx-auto mb-4"
        />

        <p class="text-2xl text-matta-black mb-5 text-center">
          You have no product in <br />
          your favourites
        </p>
        <NuxtLink to="/markets">
          <button
            class="bg-primary-500 text-white text-sm rounded-full px-6 py-3 uppercase"
          >
            Go to markets
          </button>
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        v-if="!isPageLoading"
      >
        <NuxtLink
          v-for="item in products"
          :key="item.id"
          :to="`/product/${encodeURIComponent(item.productName)}/${
            item.productId
          }`"
        >
          <SingleProduct :product="item" />
        </NuxtLink>
      </div>
    </div>
    <Pagination
      v-if="isPageLoading"
      :totalData="productParams.totalData"
      :pageNumber="productParams.PageNumber"
      :pageSize="10"
      @next="next"
      @prev="prev"
      :pagecount="productParams.pagecount"
    />
  </div>
  <div class="text-center p-6 lg:p-8 my-24" v-else>
     <AppLoader />
  </div>
</template>

<script setup>

// const route = useRoute();
const isPageLoading = inject("isPageLoading");
const products = inject("products");
const productParams = inject("productParams");

function next() {
  productParams.PageNumber++;
}
function prev() {
  if (productParams.PageNumber == 1) return;
  productParams.PageNumber--;
}
</script>
