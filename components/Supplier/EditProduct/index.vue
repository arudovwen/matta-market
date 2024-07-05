<template>
  <div
    class="gap-y-8 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE]"
  >
    <!-- Top bar   -->
    <HeaderComponent
      title="Edit a product"
      className="!px-5"
      :canGoback="true"
    />
    <Stepper :tabs="tabs" />

    <div class="mt-[50px]" v-if="!isLoading">
      <ProductInfo v-if="active == 1" />
      <ProductProperties v-if="active == 2" />
      <ProductDocuments v-if="active == 3" />
      <AdditionalInformation v-if="active == 4" />
    </div>
    <div class="text-center p-6 lg:p-8 my-24" v-else>
      <AppLoader />
    </div>
  </div>
  <IndexModal
    :isOpen="isPreviewing"
    @togglePopup="isPreviewing = false"
    :canClose="true"
  >
    <template #content>
      <div class="max-w-[98vw] relative">
        <Preview /></div
    ></template>
  </IndexModal>
</template>

<script setup>
import { defineProps, ref, provide, onBeforeMount, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductInfo from "./ProductInfo";
import ProductProperties from "./ProductProperties";
import ProductDocuments from "./ProductDocuments";
import AdditionalInformation from "./AdditionalInformation";
import {
  getSupplierProduct,
  getmarketlevels,
  getTechLevels,
  getFeaturedManufacturer,
} from "~/services/productservices";
import Preview from "~/components/preview/IndexPreview";
import { defaultPropertyItems } from "~/utils/constants";

const route = useRoute();
const router = useRouter();
const isPreviewing = ref(false);
const isLoading = ref(true);
const technologies = ref([]);
const allmarkets = ref([]);
const producers = ref([]);
defineProps(["title"]);
const tabs = [
  {
    name: "Product Info",
    value: 1,
    url: `/storefront/products/edit-product?id=${route?.query?.id}&stage=1`,
  },
  {
    name: "Properties",
    value: 2,
    url: `/storefront/products/edit-product?id=${route?.query?.id}&stage=2`,
  },
  {
    name: "Documents",
    value: 3,
    url: `/storefront/products/edit-product?id=${route?.query?.id}&stage=3`,
  },
];

const selectedMeasurement = ref(measurements[0]);
const defaultPackagesAvailable = [
  {
    package: {
      id: create_UUID(),
      title: "",
    },
    unit: selectedMeasurement.value ? selectedMeasurement.value.value : "",
    size: null,
    amount: null,
    isAvailable: false,
    color: "",
    purity: "",
  },
];

// const links = [
//   {
//     title: "home",
//     url: "/",
//   },
//   {
//     title: "storefront",
//     url: "/overview",
//   },
//   {
//     title: "products",
//     url: "/storefront/products",
//   },
//   {
//     title: "edit product",
//     url: "/#",
//   },
// ];
const active = ref(1);

const product = ref({
  id: "",
  ProductId: "",
  name: "",
  pickUpLocationId: "",
  manufacturer: "",
  markets: [],
  marketApplications: [],
  marketSubapplications: [],
  technologies: [],
  techApplications: [],
  techSubApplications: [],
  description: "",
  gallery: [],
  price: 0,
  unit: "",
  sampleAvailable: false,
  packagesAvailable: [],
  packages: [],
  hideProduct: false,
  hidePrice: false,
  productBrandName: "",
  supplierId: null,
});

const queryParams = reactive({
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  productId: route?.query?.id,
});
const form = reactive({
  id: "",
  ProductId: "",
  name: "",
  manufacturer: "",
  markets: [],
  marketApplications: [],
  marketSubapplications: [],
  technologies: [],
  techApplications: [],
  techSubApplications: [],
  description: "",
  gallery: [],
  price: 0,
  sampleAvailable: false,
  packagesAvailable: [],
  packages: [],
  hideProduct: false,
  hidePrice: false,
  productBrandName: "",
  supplierId: null,
  documentproperties: [
    {
      text: "Material safety data sheet (MSDS)",
      item: "Info such as the chemical properties.",
      value: "Material safety data sheet",
    },
    {
      text: "Certificate of analysis (COA)",
      item: "Certificate of analysis of product.",
      value: "Certificate of analysis (COA)",
    },
    {
      text: "Technical data sheet (TDS)",
      item: "Doc with technical data of product.",
      value: "Technical data sheet (TDS)",
    },
    {
      text: "Other",
      item: "Other types of product documents.",
      value: "other",
    },
  ],
});

function togglePreview() {
  isPreviewing.value = !isPreviewing.value;
}

function toggleNext(val) {
  // active.value = val;
  router.push(
    `/storefront/products/edit-product?stage=${val}&id=${route?.query?.id}`
  );
}
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

onBeforeMount(() => {
  if (route?.query?.stage) {
    active.value = route?.query?.stage;
  }
  getTechLevels(queryParams).then((res) => {
    technologies.value = res.data.data;
  });
  getmarketlevels().then((res) => {
    allmarkets.value = res.data.data;
  });
  if (route.query.id) {
    isLoading.value = true;
    getSupplierProduct(queryParams).then((res) => {
      product.value = res.data.data;
      updateData(form, product, defaultPackagesAvailable, isLoading, route);
    });
  }
  getProducers();
});

function getProducers() {
  getFeaturedManufacturer({
    Search: "",
    PageNumber: 1,
    PageSize: 100000,
  }).then((res) => {
    producers.value = [...res.data.data.data];
  });
}
watch(route, () => {
  active.value = parseInt(route?.query?.stage) || 1;

  if (route.query.id) {
    isLoading.value = true;
    getSupplierProduct(queryParams).then((res) => {
      product.value = res.data.data;
      updateData(form, product, defaultPackagesAvailable, isLoading, route);
    });
  }
});

provide("technologies", technologies);
provide("allmarkets", allmarkets);
provide("form", form);
provide("product", form);
provide("togglePreview", togglePreview);
provide("toggleNext", toggleNext);
provide("producers", producers);
provide("getProducers", getProducers);
provide("active", active);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
