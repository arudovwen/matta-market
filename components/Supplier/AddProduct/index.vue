<template>
  <div
    class="gap-y-8 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE]"
  >
    <!-- Top bar   -->
    <HeaderComponent
      title="Add a product"
      className="!px-5"
      :canGoback="true"
    />
    <Stepper :tabs="tabs" />

    <div class="mt-[50px]" v-if="!isPageLoading">
      <ProductInfo v-if="active == 1" />
      <ProductProperties v-if="active == 2" />
      <ProductDocuments v-if="active == 3" />
      <AdditionalInformation v-if="active == 4" />
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
// import { measurements } from "~/utils";

const tabs = [
  {
    name: "Product Info",
    value: 1,
  },
  {
    name: "Properties",
    value: 2,
  },
  {
    name: "Documents",
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
  packages: [],
  hideProduct: false,
  hidePrice: false,
  productBrandName: "",
  propertyItems: {
    features: {
      propertyItems: [],
      subSection: [],
    },
    applications: {
      propertyItems: [{ property: null, propertyValue: [] }],
      subSection: [],
    },
    property: {
      propertyItems: [{ property: null, propertyValue: [] }],
      subSection: [],
    },
    compliance: {
      propertyItems: [],
      subSection: [],
    },
    technical: {
      propertyItems: [{ property: null, propertyValue: [] }],
      subSection: [],
    },
  },
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
    `/storefront/products/add-product?stage=${val}&id=${route.query.id}`
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
      updateData();
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
    producers.value = [...res?.data?.data?.data];
  });
}
onMounted(() => {
  if (route?.query?.stage) {
    active.value = route.query.stage;
  }
});
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
const defaultPropertyItems = {
  features: {
    propertyItems: [],
    subSection: [],
  },
  applications: {
    propertyItems: [{ property: null, propertyValue: [] }],
    subSection: [],
  },
  property: {
    propertyItems: [{ property: null, propertyValue: [] }],
    subSection: [],
  },
  compliance: {
    propertyItems: [],
    subSection: [],
  },
  technical: {
    propertyItems: [{ property: null, propertyValue: [] }],
    subSection: [],
  },
};
const selectedMeasurement = ref(measurements[0]);
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

function updateData() {
  form.id = route.query.id;
  form.ProductId = route.query.id;
  form.pickUpLocationId = product.value.pickupLocationId;
  form.name = product.value.name;
  form.unit = product.value.packagesAvailable
    ? product.value.packagesAvailable[0].unit
    : "";
  form.manufacturer = product.value.manufacturer || [];
  form.markets = product.value.markets || [];
  form.marketApplications = product.value.marketApplications || [];
  form.marketSubapplications = product.value.marketSubapplications || [];
  form.technologies = product.value.technologies || [];
  form.techApplications = product.value.techApplications || [];
  form.techSubApplications = product.value.techSubApplications || [];
  form.description = product.value.description;
  form.gallery = product.value.gallery || [];
  form.price = product.value.price;
  form.sampleAvailable = product.value.sampleAvailable;
  form.packagesAvailable = product.value.packagesAvailable || [];
  form.packages = product.value.packages || [];
  form.hideProduct = product.value.hideProduct;
  form.hidePrice = product.value.hidePrice;
  form.productBrandName = product.value.productBrandName;
  form.documents = product.value.documentInfoModels || [];
  form.productExperts = product.value.productExperts || [];
  form.productQuestions = product.value.productQuestions || [];
  form.tags = product.value.tags || [];
  form.supplierId = product.value.supplierId;
  form.propertyItems =
    product.value.propertyItems?.propertyItems &&
    Object.keys(product.value.propertyItems.propertyItems).length
      ? product.value.propertyItems.propertyItems
      : defaultPropertyItems;
  form.documentproperties = [
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
  ];
  form.properties = product.value?.propertyItems?.properties || [];
  form.propertyValueList = product.value?.propertyItems?.propertyValueList || [];
}

watch(
  () => [route.query],
  () => {
    if (route?.query?.stage) {
      active.value = route.query.stage;
    }
    if (route?.query?.id) {
      queryParams.productId = route.query.id;
      getSupplierProduct(queryParams).then((res) => {
        if (res.status === 200) {
          product.value = res.data.data;
          updateData();
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
