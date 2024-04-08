<template>
  <div class="py-6 pl-6 lg:py-10 lg:pl-10 rounded-xl bg-[#F1F3F5]">
    <div class="flex justify-between items-center pr-6 lg:pr-10 mb-6 gap-x-4">
      <h2 class="text-[26px] lg:text-4xl font-medium text-matta-black lg:mb-6">
        Similar products
      </h2>
      <span class="flex gap-x-5">
        <div
          class="w-8 h-8 lg:w-12 lg:h-11 bg-[#E7EBEE] rounded-full flex items-center justify-center cursor-pointer"
          @click="prev"
        >
          <i class="uil uil-arrow-left text-base lg:text-lg"></i>
        </div>
        <div
          class="w-8 h-8 lg:w-12 lg:h-11 text-lg bg-[#E7EBEE] rounded-full flex items-center justify-center cursor-pointer"
          @click="next"
        >
          <i class="uil uil-arrow-right text-base lg:text-lg"></i>
        </div>
      </span>
    </div>
    <div class="" v-if="products.length">
      <carousel :breakpoints="breakpoints" ref="myslide" snapAlign="start">
        <slide v-for="(item, index) in products" :key="index" class="px-2">
          <a
            :href="`/product/${encodeURIComponent(item.title)}/${item.id}`"
            class="w-full h-full text-left"
          >
            <SingleProduct :product="item" />
          </a>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import { Carousel as carousel, Slide } from "vue3-carousel";
import { getProducts } from "~/services/productservices";
import { onMounted, ref, reactive, inject } from "vue";
import SingleProduct from "~/components/SingleProduct";

const product = inject("product");
const myslide = ref(null);
const queryParams = reactive({
  MarketApplication: product.value.marketApplications.length
    ? product.value.marketApplications.shift()
    : "",
  Status: "",
  MarketId: "",
  MarketSubApplication: product.value.marketSubapplications.length
    ? product.value.marketSubapplications.shift()
    : "",
  productId: "",
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  ShowSubMenu: true,
  Producer: "",
  pagecount: 0,
  totalData: 0,
  SortOrder: "A",
  Pricefilter: "",
});
onMounted(() => {
  getAllProducts();
});
const products = ref([]);
function getAllProducts() {
  getProducts(queryParams).then((res) => {
    products.value = res.data.data.data.filter(
      (item) => item.id != product.value.id
    );
  });
}
const breakpoints = {
  250: {
    itemsToShow: 1.2,
    snapAlign: "center",
  },
  // 700px and up
  700: {
    itemsToShow: 2.5,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 3.6,
    snapAlign: "start",
  },
};

function next() {
  myslide.value.next();
}

function prev() {
  myslide.value.prev();
}
</script>
