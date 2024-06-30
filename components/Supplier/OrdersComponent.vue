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
            <Select
              v-model="status"
              :options="subOptions"
              placeholder="Select status"
              :classInput="`text-sm min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !border !h-11 cursor-pointer border-[#D0D5DD]`"
            />
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
          <table aria-describedby="true" class="w-full" v-if="orders.length">
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
                >
                  {{ item.custormer || "-" }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ moment(item.orderDate).format("ll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ currencyFormat(item.amount) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <AppStatusButton
                    :status="item.status"
                    stattype="parent-order"
                    :type="item.orderNumber"
                  />
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <div
                    class="text-sm whitespace-nowrap hover:underline"
                    @click="openOrder(item)"
                  >
                    View order
                  </div>
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
        <div class="mb-3" v-if="!isOrderLoading">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Order ID</p>
          <h2 class="font-medium text-2xl">#{{ order?.orderNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <OrderComponent :order="order" v-if="!isOrderLoading" />
        <AppLoader v-if="isOrderLoading" />
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
  orderStage: "",
});
const status = ref("");
const options = [
  {
    label: "In cart",
    value: 0,
  },
  {
    label: "In progress",
    value: 0,
  },
  {
    label: "Payment confirmed",
    value: 1,
  },

  {
    label: "Order cancelled",
    value: 3,
  },
  {
    label: "Order completed",
    value: 2,
  },
];

const subOptions = [
  {
    label: "In cart",
    value: "In cart",
  },
  {
    label: "In progress",
    value: "In progress",
  },
  {
    label: "Payment confirmed",
    value: "Payment confirmed",
  },

  {
    label: "Order cancelled",
    value: "Order cancelled",
  },
  {
    label: "Order completed",
    value: "Order completed",
  },
];
const isLoading = ref(true);
const isOrderLoading = ref(false);
function getData() {
	isLoading.value = true;
	console.log("omo");
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
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}
const route = useRoute();
defineProps(["title"]);

const order = ref(null);
const isOpen = ref(false);

function openOrder(val) {
  isOrderLoading.value = isOpen.value = true;
  storefrontorderdetails(val.id)
    .then((res) => {
      order.value = { ...val, ...res.data, orderId: val.orderNumber };
      isOrderLoading.value = false;
    })
    .catch((err) => {
      isOrderLoading.value = false;
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}

function openModal() {
  isOpen.value = !isOpen.value;
}

const theads = ["order id", "customer name", "created", "amount", "status", ""];

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
  () => [status.value],
  () => {
    if (status.value) {
      const data = options.find((i) => i.label === status.value);
      queryParams.orderStage = "";
      if (status.value === "In cart") {
        queryParams.orderStage = 0;
      }
      if (status.value === "In progress") {
        queryParams.orderStage = 1;
      }

      queryParams.Status = data?.value;
    }
  }
);

watch(
  () => [
    queryParams.PageSize,
    queryParams.PageNumber,
    queryParams.Status,
    queryParams.orderStage,
  ],
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
