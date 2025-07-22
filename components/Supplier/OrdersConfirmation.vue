<template>
  <div>
    <div class="bg-white rounded-lg">
      <div
        v-if="!noHeader"
        class="items-center justify-between hidden px-5 mb-8 lg:flex"
      >
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
                  {{ moment(item.lastModified).format("lll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  {{ currencyFormat(item.amount) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <span
                    :class="`px-[6px] py-1 text-xs rounded-[6px] flex gap-x-1 items-center border max-w-max font-semibold text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]`"
                  >
                    <!-- <AppIcon icon="octicon:dot-fill-24" /> -->
                    <span class=""> Pending confirmation</span>
                  </span>
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <button
                    type="button"
                    class="text-sm whitespace-nowrap hover:underline"
                    @click="
                      navigateTo(
                        `/storefront/order/confirmation/${item.id}?orderNumber=${item.orderNumber}`
                      )
                    "
                  >
                    View order
                  </button>
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
    <div class="p-6 my-20 text-center lg:p-8" v-if="isLoading">
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
        class="w-full h-full max-h-full p-6 overflow-auto bg-white rounded-lg lg:p-8"
      >
        <div class="mb-3" v-if="!isOrderLoading">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Order ID</p>
          <h2 class="text-2xl font-medium">#{{ order?.orderNumber }}</h2>
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
const route = useRoute();
const props = defineProps(["title", "noHeader"]);

const queryParams = reactive({
  Status: "4",
  SortOrder: "",
  Role: "",
  PageSize: props.noHeader ? 6 : 10,
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

const isLoading = ref(true);
const isOrderLoading = ref(false);
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
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}

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

const theads = ["order id", "customer", "updated at", "amount", "status", ""];

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
