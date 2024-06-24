<template>
  <div class="gap-y-2 flex flex-col bg-white rounded-[10px]  border border-[rgb(244,247,254)]">
    <!-- Top bar   -->
 
    <HeaderComponent title="My requests" subtext="List of your requests for samples and documents." />
    <div class="pt-5">
      <AppTab :tabs="tabs" className="px-5" :count="count" />

      <div>
        <SupplierMyrequestsRequestTable
          v-if="active == 'samples'"
          :canCancel="false"
        />
        <SupplierMyrequestsDocumentsTable v-if="active == 'documents'" />
        <SupplierMyrequestsQuotesTable v-if="active == 'orders'" />
        <SupplierMyrequestsProductTable v-if="active == 'products'" />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="w-[400px] bg-white rounded-lg p-6 lg:p-8 relative">
        <span
          @click="isOpen = false"
          class="hover:bg-gray-50 rounded-full h-6 w-6 flex items-center justify-center absolute top-4 right-4"
          ><AppIcon icon="heroicons-solid:x" class="w-4 h-4"
        /></span>
        <h4 class="text-lg font-medium mb-3">Cancel document request</h4>
        <p class="text-sm mb-8">
          Are your sure you want to cancel #DC455-084 document request?
        </p>
        <div class="flex items-center gap-x-4">
          <button
            @click="isOpen = false"
            type="button"
            class="text-[13px] uppercase text-matta-black px-2 py-2 hover:text-primary/80 w-full"
          >
            don’t cancel
          </button>
          <button
            type="button"
            @click="cancelRequest"
            class="border text-[13px] border-primary- uppercase w-full text-white bg-primary-500 rounded-lg px-2 py-3 hover:bg-primary/80"
          >
            cancel request
          </button>
        </div>
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { procurementrequestcount } from "~/services/procurementservice";
import { buyerquotes } from "~/services/quoteservice";

defineProps(["title"]);
const isOpen = ref(false);
const active = ref("samples");
const quotes = ref([]);
const count = reactive({
  documents: 0,
  samples: 0,
  quotes: 0,
  productRequest: 0,
});
const tabs = [
  {
    title: "samples",
    key: "samples",
  },
  {
    title: "documents",
    key: "documents",
  },

  {
    title: "orders",
    key: "orders",
  },
  {
    title: "products",
    key: "productRequest",
  },
];
const quoteParams = reactive({
  Status: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  totalCount: 0,
});
onMounted(() => {
  procurementrequestcount().then((res) => {
    count.documents = res.data.documents;
    count.samples = res.data.samples;
    count.productRequest = res.data.productRequest;
  });
  getquotes();
});
function getquotes() {
  buyerquotes(quoteParams).then((res) => {
    count.quotes = quoteParams.totalCount = res.data.data.totalCount;
    quotes.value = res.data.data.data;
  });
}
watch(
  () => [quoteParams.Status, quoteParams.Search, quoteParams.SortOrder],
  () => {
    getquotes();
  }
);
provide("active", active);
provide("quotes", quotes);
provide("quoteParams", quoteParams);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
