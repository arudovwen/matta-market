<template>
  <div>
    <!-- <HeaderComponent
      title="Store Orders"
      subtext=" List of orders received by your storefront."
      btnText="Create order"
      btnIcon="humbleicons:plus"
      @onClick="router.push('/markets')"
    /> -->

    <div class="rounded-lg bg-white">
      <div class="hidden lg:flex justify-between items-center mb-8 px-5">
        <div class="flex gap-x-4">
          <div class="relative flex items-center">
            <span class="absolute left-4 pointer-events-none text-[#667085]"
              ><i class="uil uil-search"></i
            ></span>
            <input
              v-model="queryParams.Search"
              @change="getData()"
              @keyup="debounceSearch"
              placeholder="Search"
              class="border border-[#E7E7E7] focus:pr-3 pl-10 rounded-lg w-[280px] text-sm focus:outline-none py-[10px] transition ease-in-out duration-300"
              type="search"
            />
          </div>
          <div class="flex relative items-center">
            <select
              v-model="queryParams.Status"
              class="appearance-none border border-[#E7E7E7] rounded-lg w-[150px] text-sm py-[10px] px-[14px] focus:outline-matta-black/20"
            >
              <option value="">Status</option>
              <option value="0">Pending</option>
              <option value="1">Completed</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>

          <AppButton
            @click="queryParams.Status = ''"
            text="Clear filter"
            btnClass="text-xs text-[#98A2B3] font-normal"
          />
        </div>
      </div>
      <div v-if="!isLoading">
        <div
          class="overflow-x-auto max-w-[80vw] lg:max-w-full"
          v-if="orders.length"
        >
          <table class="w-full" v-if="orders.length">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="capitalize text-[#475467] text-sm text-left font-medium border-b border-t py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in orders" :key="item">
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ item.orderNumber }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                ></td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ moment(item.orderDate).format("lll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                ></td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <span
                    v-if="item.statusText == 'invoiced'"
                    class="px-2 py-1 text-xs rounded-lg bg-[#E0F7B0]"
                  >
                    Completed</span
                  >
                  <span
                    v-if="item.statusText !== 'invoiced'"
                    class="px-2 py-1 text-xs rounded-lg bg-[#FDD0AF]"
                  >
                    In progress</span
                  >
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{
                    item.scheduleDeilverDate
                      ? moment(item.scheduleDeilverDate)?.format("lll")
                      : moment()?.format("lll")
                  }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <Menu class="relative" as="div">
                    <MenuButton class="outline-none">
                      <i class="uil uil-ellipsis-v"></i>
                    </MenuButton>
                    <MenuItems
                      class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
                    >
                      <div
                        class="py-2 px-4 hover:bg-gray-50 text-sm whitespace-nowrap"
                        @click="openOrder(item)"
                      >
                        <i class="uil uil-box mr-2"></i> Open order
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmptyData
          v-if="!orders.length"
          url="/market"
          buttonText="go to catalog"
          text="No orders have been placed"
        />
      </div>
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
  </div>

  <SideModal :isOpen="isOpen" @togglePopup="openModal">
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Order ID</p>
          <h2 class="font-medium text-2xl">#{{ order.orderId }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <OrderComponent :order="order" />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import OrderComponent from "./OrderComponent";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import debounce from "lodash/debounce";
import {
  storefrontorders,
  storefrontorderdetails,
} from "~/services/storefrontservice";
import moment from "moment";
import { toast } from "vue3-toastify";

onMounted(() => {
  getData();
});
const orders = ref([]);
const queryParams = reactive({
  Status: "",
  SortOrder: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
});
const isLoading = ref(true);
function getData() {
  isLoading.value = true;
  storefrontorders(queryParams)
    .then((res) => {
      if (res.status) {
        orders.value = res.data.data;
        queryParams.totalCount = res.data.totalCount;
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.message || err.response.data.Message);
    });
}
const route = useRoute();
defineProps(["title"]);

const order = ref(null);
const isOpen = ref(false);

function openOrder(val) {
  storefrontorderdetails(val.id)
    .then((res) => {
      order.value = { ...res.data, orderId: val.orderNumber };

      isOpen.value = true;
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.message || err.response.data.Message);
    });
}

function openModal() {
  isOpen.value = !isOpen.value;
}

const theads = [
  "order id",
  "customer name",
  "created",
  "amount",
  "status",
  "scheduled delivery",
  "",
];

function next() {
  queryParams.PageNumber++;
  getData();
}
function toggleOrder() {
  queryParams.SortOrder == "A"
    ? (queryParams.SortOrder = "D")
    : (queryParams.SortOrder = "A");
  getData();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getData();
}

const debounceSearch = debounce(() => {
  getData();
}, 800);

watch(
  () => [queryParams.PageNumber, queryParams.PageSize, queryParams.Status],
  () => {
    getData();
  }
);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
