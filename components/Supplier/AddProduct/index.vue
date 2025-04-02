<template>
  <div
    class="gap-y-8 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE]"
  >
    <!-- Top bar   -->
    <HeaderComponent
      :title="`${
        route.params.process === 'edit-product' ? 'Edit' : 'Add'
      } a product`"
      className="!px-5"
      :canGoback="true"
    />
    <Stepper :tabs="tabs" />

    <div class="mt-[50px]" v-if="!isPageLoading">
      <ProductInfo v-if="active == 1" />
      <ProductProperties v-if="active == 3" />
      <ProductDocuments v-if="active == 2" />
      <!-- <AdditionalInformation v-if="active == 4" /> -->
    </div>
    <div class="text-center p-6 lg:p-8 my-28" v-else>
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
        <PreviewIndexPreview /></div
    ></template>
  </IndexModal>
</template>

<script setup>
import {
  defineProps,
  ref,
  provide,
  reactive,
  watch,
  onMounted,
  onBeforeMount,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductInfo from "./ProductInfo";
import ProductProperties from "./ProductProperties";
import ProductDocuments from "./ProductDocuments";
import AdditionalInformation from "./AdditionalInformation";

import {
  getSupplierProduct,
  getmarketlevels,
  getTechLevels,
} from "~/services/productservices";
import { getFeaturedManufacturer } from "~/services/productservices";
import updateData from "~/utils/updateData";
// import { measurements } from "~/utils";

const tabs = [
  {
    name: "Product Info",
    value: 1,
  },

  {
    name: "Documents",
    value: 2,
  },
  {
    name: "Properties",
    value: 3,
  },
];
const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: "storefront",
    url: "/overview",
  },
  {
    title: "products",
    url: "/storefront/products",
  },
  {
    title: "add product",
    url: "/#",
  },
];
const route = useRoute();

const router = useRouter();
const isPreviewing = ref(false);
const isPageLoading = ref(true);
defineProps(["title"]);
const active = ref(1);
const technologies = ref([]);
const allmarkets = ref([]);
const producers = ref([]);
const form = reactive({
  id: "",
  name: "",
  pickUpLocationId: null,
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
  propertyItems: defaultPropertyItems,
  properties: [],
  propertyValueList: [],
  ProductId: route.query.id,
  documents: [],
  category: "",
  documentproperties: [
    {
      text: "Material safety data sheet (MSDS)",
      item: "Info such as the chemical properties.",
      value: "Material safety data sheet (MSDS)",
    },
    {
      text: "Certificate of analysis (COA)",
      item: "Certificate of analysis of product.",
      value: "Certificate of analysis (COA)",
    },
    {
      text: "Technical data sheet (TDS)",
      item: "Document with technical data of product.",
      value: "Technical data sheet (TDS)",
    },
    {
      text: "Other",
      item: "Other types of product documents.",
      value: "other",
    },
  ],
  productExperts: [],
  productQuestions: [],
  tags: [],
  unit: "g",
  useZoho: true,
});
const queryParams = reactive({
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  productId: route.query.id,
});

function togglePreview() {
  isPreviewing.value = !isPreviewing.value;
}

function toggleNext(val) {
  // active.value = val;
  router.push(
    `/storefront/products/${route.params.process}?stage=${val}&id=${route.query.id}`
  );
}
onBeforeMount(() => {
  if (route?.query?.stage) {
    active.value = route.query.stage;
  }
  getTechLevels(queryParams).then((res) => {
    technologies.value = res.data.data;
  });
  getmarketlevels().then((res) => {
    allmarkets.value = res.data.data;
  });
  if (route.query.id) {
    getSupplierProduct(queryParams).then((res) => {
      product.value = res.data.data;
      updateData(form, product, [], isPageLoading, route);
      isPageLoading.value = false;
    });
  } else {
    isPageLoading.value = false;
  }
  getProducers();
});
function getProducers() {
  getFeaturedManufacturer({
    Search: "",
    PageNumber: 1,
    PageSize: 1000000,
  }).then((res) => {
    producers.value = [...res.data.data.data];
  });
}
onMounted(() => {
  if (route?.query?.stage) {
    active.value = route.query.stage;
  }
});

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
  sampleAvailable: false,
  packagesAvailable: [],
  supplierId: null,
  packages: [],
  hideProduct: false,
  hidePrice: false,
  productBrandName: "",
  unit: "g",
});

watch(
  () => [route.query],
  () => {
    console.log(route.query);
    if (route?.query?.stage) {
      active.value = route.query.stage;
    }
    if (route?.query?.id) {
      queryParams.productId = route.query.id;
      getSupplierProduct(queryParams).then((res) => {
        if (res.status === 200) {
          product.value = res.data.data;
          updateData(form, product, [], isPageLoading, route);
        }
      });
    }
  }
);
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
