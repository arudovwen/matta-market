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
    <div v-if="requests.length">
      <table aria-describedby="true" class="w-full">
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
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ moment(item.created).format("l") }}
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.requestNumber }}
            </td>

            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.businessName }}
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.email }}
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.chemicalName }}
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
                    class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap cursor-pointer"
                    @click="openRequest(item)"
                  >
                    <i class="uil uil-file mr-2"></i> Open Request
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
      text="No product request have been made"
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
          <p class="text-[13px] text-[#B6B7B9] mb-2">Request No</p>
          <h2 class="font-medium text-2xl">{{ request.requestNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierMyrequestsProductDetail :request="request" />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import moment from "moment";
import debounce from "lodash/debounce";
import { getproductrequests } from "~/services/productservices";

const multi = ref([]);
const requests = ref([]);
const isOpen = ref(false);
const request = ref({});
const theads = ["date", "request no", "business", "email", "chemical", ""];

function openRequest(item) {
  request.value = item;
  isOpen.value = true;
}

defineProps(["title"]);

onMounted(() => {
  getRequestDoc();
});

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
  multi.value = requests.value.map((i) => i.id);
}
function getRequestDoc() {
  isLoading.value = true;
  getproductrequests(queryParams).then((res) => {
    requests.value = res.data.data.data;
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

const debounceSearch = debounce(() => {
  getRequestDoc();
}, 800);
watch(
  () => [queryParams.Search],
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.PageNumber],
  () => {
    getRequestDoc();
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
