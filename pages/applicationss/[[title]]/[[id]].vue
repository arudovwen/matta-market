<template>
  <div class="">
    <div class="flex flex-col w-full h-full">
      <ApplicationBanner />

      <div class="flex flex-1 container py-10 w-full gap-x-[22px]">
        <div class="max-w-[250px] w-full hidden lg:block">
          <ApplicationSideBar />
        </div>
        <div class="flex-1 flex flex-col gap-y-10 overflow-y-auto no-scrollbar">
          <ApplicationContent />
          <Pagination
            v-if="
              !loading &&
              productsData.length &&
              query.totalData > query.PageSize
            "
            :total="store.total"
            :current="query.PageNumber"
            :per-page="query.PageSize"
            :pageRange="pageRange"
            @page-changed="query.PageNumber = $event"
            :perPageChanged="perPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
import { getProducts, getProducers } from "~/services/productservices";
import { useProductStore } from "~/stores/products";

const store = useProductStore();
const { productsData, loading } = storeToRefs(store);
const route = useRoute();
useHead({
  title: `${ucFirst(route.query.title || route.query.search_query || "Application")} | Matta`,
  meta: [
    {
      name: "description",
      content: ` ${
        ucFirst(route.query.title || route.query.search_query || "Application")
      } | Matta`,
    },
  ],
});
const query = reactive({
  PageNumber: 1,
  PageSize: 20,
  searchParameter: route.query.search_query || "",
  Technology: "",
  Status: "",
  TechonolgyApplications: route.params.id,
  TechnologySubApplications: "",
  productId: "",
  Search: route.query.search_query || "",
  ShowSubMenu: true,
  Producer: route.query.producer,
  producers: [],
  applications: [],
  pagecount: 0,
  totalData: 0,
  sortOrder: 0,
  sortBy: 0,
});

const pageRange = 5;

function getAllProducts() {
  store.setLoader(true);
  getProducts(query)
    .then((res) => {
      if (res.status === 200) {
        store.setProducts(res.data);
        store.setLoader(false);
        query.totalData = res.data.totalCount;
      }
    })
    .catch(() => {
      store.setLoader(false);
    });
}

function perPage({ currentPerPage }) {
  query.PageNumber = 1;
  query.PageSize = currentPerPage;
}

onMounted(() => {
  getAllProducts();
  // store.getAllProducers()
});

watch(
  () => [
    query.PageNumber,
    ,
    query.sortOrder,
    query.producers,
    query.sortBy,
    query.applications,
  ],
  () => {
    getAllProducts();
  }
);
provide("query", query);
</script>
