<template>
  <div v-if="!isLoading">
    <div class="hidden lg:flex justify-between items-center mb-8">
      <div class="flex gap-x-4 px-5">
        <div class="relative flex items-center">
          <span class="absolute left-4 pointer-events-none text-[#667085]"
            ><i class="uil uil-search"></i
          ></span>
          <input
            v-model="queryParams.Search"
            @change="getRequests()"
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
    <div
      v-if="requests.length && !isLoading"
      class="overflow-x-auto max-w-[80vw] lg:max-w-full"
    >
      <table class="w-full">
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
          <tr v-for="item in requests" :key="item">
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <div class="flex items-center">
                <span :class="item.status == 4 ? 'opacity-25' : ''">
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
              {{ moment(item.created).format("ll") }}
            </td>
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <span
                v-if="item.requestStatus == 0"
                class="px-[6px] py-[2px] text-xs rounded-full text-[#5925DC] border border-[#D9D6FE] bg-[#F4F3FF] flex gap-x-1 items-center max-w-max"
              >
              <AppIcon icon="octicon:dot-fill-24" />    New</span
              >
              <span
                v-if="item.requestStatus == 1"
                class="px-[6px] py-1 text-xs rounded-full border border-pink-100 bg-pink-50 text-pink-500 flex gap-x-1 items-center max-w-max"
              >
              <AppIcon icon="octicon:dot-fill-24" />   In progress</span
              >

              <span
                v-if="item.status == 2"
                class="px-[6px] py-1 text-xs rounded-lg text-[#17B26A] border border-[#ABEFC6] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max"
              >
              <AppIcon icon="octicon:dot-fill-24" />   Shipped</span
              >
              <span
                v-if="item.requestStatus == 3"
                class="px-[6px] py-1 text-xs rounded-lg text-[#17B26A] border border-[#ABEFC6] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max"
              >
              <AppIcon icon="octicon:dot-fill-24" />   Completed</span
              >
            </td>

            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] relative"
            >
              <Menu class="relative" as="div">
                <MenuButton class="outline-none">
                   <AppIcon icon="heroicons:ellipsis-vertical-solid" />
                </MenuButton>
                <MenuItems
                  class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
                >
                  <div
                    class="py-2 px-4 hover:bg-gray-50 text-sm whitespace-nowrap cursor-pointer"
                    @click="openRequests(item.id)"
                  >
                    <i class="uil uil-box mr-2"></i> Open Request
                  </div>

                  <div
                    v-if="canCancel"
                    class="py-2 px-4 hover:bg-gray-50 text-sm whitespace-nowrap"
                    @click="handleCancel(item.id)"
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
      title="No sample request have been made"
    />
  </div>
  <div class="text-center p-6 lg:p-8 my-20" v-if="isLoading">
    <AppLoader />
  </div>

  <div class="p-5">
    <PaginationSimple
      :total="queryParams.totalCount"
      :current="queryParams.PageNumber"
      :per-page="queryParams.PageSize"
      :pageRange="5"
      @page-changed="queryParams.PageNumber = $event"
    />
  </div>
  <SideModal
    :isOpen="isRequestOpen"
    @togglePopup="isRequestOpen = false"
    v-if="isRequestOpen"
  >
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Request ID</p>
          <h2 class="font-medium text-2xl">{{ request.requestNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierRequestsRequestComponent />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import moment from "moment";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  samplerequests,
  samplerequestdetails,
} from "~/services/requestservice";
import debounce from "lodash/debounce";

const theads = ["product", "created", "status", ""];
const isRequestOpen = ref(false);
const requests = ref([]);
const multi = ref([]);
defineProps(["title", "canCancel"]);

onMounted(() => {
  getRequests();
});
const request = ref({});
// function cancelRequest() {
//   isOpen.value = true;
// }
function openRequests(val) {
  samplerequestdetails(val).then((res) => {
    request.value = res.data.data;
    isRequestOpen.value = true;
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
const isLoading = ref(true);
function getRequests() {
  isLoading.value = true;
	console.log("wo na");
  samplerequests(queryParams).then((res) => {
    requests.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    isLoading.value = false;
  });
}
function selectall() {
  multi.value = requests.value.map((i) => i.id);
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
const debounceSearch = debounce(() => {
  getRequests();
}, 800);

watch(
  () => [queryParams.Search,  queryParams.PageNumber,  queryParams.RequestStatus],
  () => {
    debounceSearch();
  }
);
provide("request", request);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
