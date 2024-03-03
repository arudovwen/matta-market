<template>
  <div class="flex flex-col bg-white rounded-[10px]">
    <!-- Top bar   -->
    <!-- <HeaderComponent
      title="Store Requests"
      className="!px-5"
      subtext="List of your requests for samples and documents."
    /> -->
    <div class="pt-[30px]">
      <AppTab :tabs="tabs" className="px-5" :count="count" />

      <div>
        <SupplierRequestsRequestTable
          v-if="active == 'samples'"
          :canCancel="false"
        />
        <SupplierRequestsDocumentsTable v-if="active == 'documents'" />
        <SupplierRequestsQuotesTable v-if="active == 'quotes'" />
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
            type="submit"
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
import { useRoute } from "vue-router";
import {
  samplerequests,
  sellerdoc,
  samplerequestcount,
} from "~/services/requestservice";
import { sellerquotes } from "~/services/quoteservice";

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
    title: "order requests",
    key: "quotes",
  },
];
defineProps(["title"]);
const isLoading = ref(true);
const quoteLoading = ref(true);
const docLoading = ref(true);
const documents = ref([]);
const requests = ref([]);
const route = useRoute();
const isOpen = ref(false);
const active = ref("samples");
const quotes = ref([]);
// const products = ref([]);
// const suppliers = ref([]);
const quoteParams = reactive({
  Status: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  totalCount: 0,
});
const count = reactive({
  documents: 0,
  samples: 0,
  quotes: 0,
});
onMounted(() => {
  samplerequestcount().then((res) => {
    count.documents = res.data.documents;
    count.samples = res.data.samples;
  });
});
function getquotes() {
  quoteLoading.value = true;
  sellerquotes(quoteParams).then((res) => {
    count.quotes = quoteParams.totalCount = res.data.data.totalCount;
    quotes.value = res.data.data.data;
    quoteLoading.value = false;
  });
}
const queryParams = reactive({
  SupplierId: "",
  RequestStatus: "",
  ProducerId: "",
  ProductId: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
});

function getRequests() {
  isLoading.value = true;
  samplerequests(queryParams).then((res) => {
    requests.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    isLoading.value = false;
  });
}
function getRequestDoc() {
  docLoading.value = true;
  sellerdoc(queryParams).then((res) => {
    documents.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    docLoading.value = false;
  });
}
watch(
  () => [quoteParams.Status, quoteParams.Search, quoteParams.SortOrder],
  () => {
    getquotes();
  }
);
provide("quotes", quotes);
provide("quoteParams", quoteParams);
provide("quoteLoading", quoteLoading);
provide("docLoading", docLoading);
provide("active", active);
provide("getRequests", getRequests);
provide("getRequestDoc", getRequestDoc);
provide("getquotes", getquotes);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
