<template>
  <div class="">
    <div class="flex flex-col w-full h-full">
      <StorefrontBanner />

      <div class="flex flex-1 container py-6 w-full gap-x-[22px]">
        <div class="max-w-[250px] w-full hidden lg:block">
          <StorefrontSideBar />
        </div>
        <div class="flex-1 flex flex-col gap-y-6 overflow-y-auto no-scrollbar">
          <StorefrontContent />
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
import { getProducts, getProductsByTag } from "~/services/productservices";
import { useProductStore } from "~/stores/products";

const store = useProductStore();
const { productsData, loading } = storeToRefs(store);
const route = useRoute();

const { vendor, id } = route.params;
useHead({
  title: `${ucFirst(vendor)} | Matta`,
  meta: [
    {
      name: "description",
      content: `${ucFirst(vendor)}`,
    },
  ],
});
const vendorInfo = ref(null);
const query = reactive({
  PageNumber: 1,
  PageSize: 20,
  searchParameter: route.query.search_query || "",
  MarketApplication: "",
  Status: "",
  MarketId: route.params.id,
  MarketSubApplication: "",
  productId: "",
  Search: route.query.search_query || "",
  ShowSubMenu: true,
  Producer: route.query.producer,
  producers: [],
  applications: [],
  pagecount: 0,
  totalData: 0,
  sortOrder: "",
  sortBy: "",
  storelug: vendor,
});
const tagQuery = reactive({
  PageNumber: 1,
  PageSize: 20,
  tag: route.query.tag,
});
const pageRange = 5;

function getAllProducts() {
  store.setLoader(true);
  if (route.query.tag) {
    getProductsByTag({
      PageNumber: 1,
      PageSize: 20,
      tag: route.query.tag,
      producers: query.producers,
    })
      .then((res) => {
        if (res.status === 200) {
          store.setProducts(res.data.data);
          store.setLoader(false);
          query.totalData = res.data.data.totalCount;
        }
      })
      .catch(() => {
        store.setLoader(false);
      });
  } else {
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
provide("vendorInfo", vendorInfo);
</script>
