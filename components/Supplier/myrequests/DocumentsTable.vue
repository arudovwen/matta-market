<template>
  <div class="flex justify-between items-center mb-8 px-5">
    <div class="flex gap-x-4">
     
      <div class="relative flex items-center">
        <span class="absolute left-4 pointer-events-none text-[#667085]"
          ><i class="uil uil-search"></i
        ></span>
        <input
          v-model="queryParams.Search"
          @change="getRequestDoc()"
          @keyup="debounceSearch"
          placeholder="Search"
          class="border border-[#E7E7E7] text-sm  focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
          type="search"
        />
      </div>

      <div class="">
        <FormsCustomSelect
          placeholder="Status"
          :options="statusOptions"
          v-model="queryParams.RequestStatus"
          classStyles="border border-[#E7E7E7] text-sm  rounded-lg min-w-[180px] py-[10px] px-[14px] focus:outline-none"
        />
      </div>
    </div>

  </div>

  <div v-if="!isLoading">
    <div v-if="documents.length">
      <table aria-describedby="" class="w-full">
        <thead>
          <tr>
            <th
              v-for="item in theads"
              :key="item"
              class="capitalize text-[#475467] text-sm text-left font-medium border-t border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
            >
              {{ item }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in documents" :key="item">
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <div class="flex items-center">
                <span
                  class="mr-3 h-10 w-10 rounded-lg flex items-center justify-center border border-[#E7EBEE] p-2"
                >
                  <img class="" :src="item.image" alt="alt" />
                </span>
                <span :class="item.status == 3 ? 'opacity-25' : ''">
                  <span class="text-sm font-medium">
                    {{ item.productName }}
                  </span>
                  <br />
                  <span class="text-xs font-normal">
                    {{ item.producer }}
                  </span>
                </span>
              </div>
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ moment(item.created).format("l") }}
            </td>
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <span
                v-if="item.requestStatus == 0"
                class="px-2 py-1 text-xs rounded-lg bg-[#D0C9FF]"
              >
                New</span
              >
              <span
                v-if="item.status == 1"
                class="px-2 py-1 text-xs rounded-lg bg-[#F9CBE4]"
              >
                In progress</span
              >

              <span
                v-if="item.status == 2"
                class="px-2 py-1 text-xs rounded-lg bg-[#BBE5AC]"
              >
                Shipped</span
              >
              <span
                v-if="item.status == 3"
                class="px-2 py-1 text-xs rounded-lg border opacity-25"
              >
                Completed</span
              >
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.type }}
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <Menu class="relative" as="div">
                <MenuButton class="outline-none">
                   <AppIcon icon="heroicons:ellipsis-vertical-solid" />
                </MenuButton>
                <MenuItems
                  class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[180px] rounded-xl overflow-hidden"
                >
                  <div
                    class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                    @click="openRequest(item)"
                  >
                    <i class="uil uil-file mr-2"></i> Open Document
                  </div>

                  <div
                    @click="cancelRequest"
                    class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                  >
                    <i class="uil uil-trash mr-2"></i> Set as Cancelled
                  </div>
                </MenuItems>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EmptyData
      v-else
      url="/markets"
      buttonText="go to catalog"
      text="No document request have been made"
    />
  </div>
  <AppLoader v-if="isLoading" />
  <div class="p-5">
    <PaginationSimple
      :total="queryParams.totalCount"
      :current="queryParams.PageNumber"
      :per-page="queryParams.PageSize"
      :pageRange="5"
      @page-changed="queryParams.PageNumber = $event"
    />
  </div>
  <SideModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Request ID</p>
          <h2 class="font-medium text-2xl">{{ document.requestNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <RequestComponent />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import RequestComponent from "./SingleDocument";
import moment from "moment";
import { buyerdoc, docdetails } from "~/services/requestservice";
import debounce from "lodash/debounce";

const multi = ref([]);
const documents = ref([]);
const isOpen = ref(false);
const theads = ["product", "created", "status", "type", ""];
function openRequest(item) {
  docdetails(item.id).then((res) => {
    document.value = res.data.data;
    isOpen.value = true;
  });
}
const document = ref({});
// const isRequestOpen = ref(false);
// const requestId = ref(null);

defineProps(["title"]);

onMounted(() => {
  getRequestDoc();
});
// function handleCancel(id) {
//   requestId.value = id;
//   isOpen.value = true;
// }

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
const isLoading = ref(true);

function selectall() {
  multi.value = documents.value.map((i) => i.id);
}
function getRequestDoc() {
  isLoading.value = true;
  buyerdoc(queryParams).then((res) => {
    documents.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    isLoading.value = false;
  });
}
function next() {
  queryParams.PageNumber++;
}
function toggleOrder() {
  queryParams.SortOrder == "A"
    ? (queryParams.SortOrder = "D")
    : (queryParams.SortOrder = "A");
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
}
const statusOptions = [
  {
    id: 0,
    text1: "New",
  },
  {
    id: 1,
    text1: "In Progress",
  },
];

// function cancelRequest() {
//   setascancelled({ sampleRequestId: requestId.value }).then((res) => {
//     if (res.status === 200) {
//       getRequestDoc();
//     }
//   });
// }
const debounceSearch = debounce(() => {
  getRequestDoc();
}, 800);

watch(
  () => [queryParams.Search,  queryParams.PageNumber,  queryParams.RequestStatus],
  () => {
    debounceSearch();
  }
);
provide("document", document);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
