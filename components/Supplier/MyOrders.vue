<template>
  <div class="gap-y-2 flex flex-col mb-4 bg-white rounded-[10px] pb-10 border border-[#F4F7FE]">
    <HeaderComponent title="My  Orders" />

    <div class="p-6 lg:p-8 rounded-lg bg-white">
      <div v-if="isShowing === 'all'">
        <div class="hidden lg:flex justify-between items-center mb-8">
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
                class="border border-[#E7E7E7] text-sm focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
                type="search"
              />
            </div>
            <div class="flex relative items-center">
              <Select
                v-model="queryParams.Status"
                :options="options"
                placeholder="Select status"
                :classInput="`text-sm min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !border !h-11 cursor-pointer border-[#D0D5DD]`"
              />
            </div>

            <AppButton
              @click="
                queryParams.Status = '';
                queryParams.Search = '';
              "
              text="Clear filter"
              btnClass="text-xs text-[#98A2B3] font-normal"
            />
          </div>
        </div>
        <div>
          <SupplierOrdersSingle
            v-for="item in orders"
            :key="item"
            :order="item"
            @onClick="openOrder(item)"
          />
        </div>
        <div v-if="!isLoading">
          <EmptyData
            v-if="!orders.length"
            url="/markets"
            buttonText="go to catalog"
            text="No orders have been placed"
          />
        </div>
      </div>
      <div v-if="isShowing === 'pending'">
        <div
          v-for="(item, idx) in pendingCheckout.items"
          :key="idx"
          class="p-6 relative rounded-lg bg-white border mb-4"
        >
          <p class="mb-1 text-[13px] uppercase">
            {{ item.producer }}
          </p>
          <p class="mb-2 text-lg lg:text-xl font-medium">
            {{ item.product }}
          </p>
          <!-- <p class="mb-6">
          <i class="uil uil-store mr-1"></i>
        </p> -->

          <span
            class="top-3 right-3 absolute cursor-pointer"
            @click="removeItem(item.id)"
            ><i class="uil uil-times text-2xl text-matta-black"></i
          ></span>
          <div class="flex flex-col lg:flex-row items-center gap-3 mb-4 w-full">
            <div
              class="flex items-center bg-[#F1F3F5] rounded-lg relative flex-1 w-full lg:w-auto pr-4"
            >
              <div class="relative w-full flex justify-between items-center">
                <div
                  class="py-4 text-[13px] px-6 bg-transparent capitlize md:uppercase text-matta-black w-full text-left"
                >
                  <span class="text-[#101828] text-[13px]">{{
                    item.selectedPackage
                  }}</span>
                </div>

                <div
                  :class="[
                    'relative text-matta-black flex items-center justify-between py-4 gap-x-4',
                  ]"
                >
                  <span class="text-gray-700 whitespace-nowrap">
                    <span class="text-[13px] whitespace-nowrap">
                      {{ currencyFormat(item.packagePrice) }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col lg:flex-row gap-3 items-center w-full lg:w-auto"
            >
              <div
                class="flex items-center justify-between lg:w-[250px] lg:justify-center gap-x-8 lg:gap-x-16 w-full rounded-lg bg-[#F1F3F5] relative py-4 text-[13px] px-6 uppercase text-matta-black"
              >
                <div class="w-[50px] text-center">x {{ item.quantity }}</div>
              </div>
              <div
                class="font-medium text-xl text-center lg:text-right whitespace-nowrap w-[200px]"
              >
                {{ currencyFormat(item.subTotal) }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-end gap-x-10 mb-10 items-center"
          v-if="pendingCheckout?.items?.length"
        >
          <div class="text-[#ABABAB] text-sm uppercase">Item total</div>
          <div class="text-2xl text-right font-medium">
            {{ currencyFormat(pendingCheckout.cartTotal) }}
          </div>
        </div>
        <div
          class="flex justify-end mt-4"
          v-if="pendingCheckout?.items?.length"
        >
          <NuxtLink to="/checkout">
            <button
              class="uppercase text-white bg-primary-500 py-4 px-6 rounded-lg text-[13px] mb-6 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Proceed to checkout
            </button>
          </NuxtLink>
        </div>
        <div
          v-if="!pendingCheckout?.items?.length"
          class="text-center py-20 text-lg"
        >
          No pending checkout
        </div>
      </div>
    </div>
    <div class="text-center p-6 lg:p-8 my-20" v-if="isLoading">
      <AppLoader />
    </div>
  </div>
  <div class="mb-6" v-if="queryParams.totalCount > queryParams.PageSize">
    <Pagination
      :total="queryParams.totalCount"
      :current="queryParams.PageNumber"
      :per-page="queryParams.PageSize"
      :pageRange="5"
      @page-changed="queryParams.PageNumber = $event"
    />
  </div>
  <SideModal :isOpen="isOpen" @togglePopup="openModal">
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Order ID</p>
          <h2 class="font-medium text-2xl" v-if="order">
            #{{ order.orderId }}
          </h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierOrderComponent :order="order" :timeline="timeline" />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import debounce from "lodash/debounce";
import {
  procurementorders,
  procurementorderdetails,
} from "~/services/orderservice";
import moment from "moment";
import { toast } from "vue3-toastify";
import { getcart, removecartitem } from "~/services/cartservice";

onMounted(() => {
  getData();
  fetchCart();
});
const isShowing = ref("all");
const pendingCheckout = ref({});

const timeline = ref([]);
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
const options = [
  {
    label: "In cart",
    value: 0,
  },
  {
    label: "Order created",
    value: `StatusClass[0]`,
  },
  {
    label: "Payment confirmed",
    value: 2,
  },
  {
    label: "Order received",
    value: 3,
  },
  {
    label: "Order cancelled",
    value: 4,
  },
  {
    label: "Refund complete",
    value: 5,
  },

  {
    label: "Shipping in progress",
    value: 6,
  },
  {
    label: "Delivered",
    value: 7,
  },
];

function fetchCart() {
  getcart().then((res) => {
    if (res.status === 200) {
      pendingCheckout.value = res.data.data;
    }
  });
}
function removeItem(id) {
  removecartitem(id).then((res) => {
    if (res.status === 200) {
      fetchCart();
    }
  });
}
function getData() {
  isLoading.value = true;
  procurementorders(queryParams)
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

defineProps(["title"]);

const order = ref(null);
const isOpen = ref(false);

function openOrder(val) {
  procurementorderdetails(val.orderId)
    .then((res) => {
      order.value = { ...val, ...res.data, orderId: val.orderNumber };

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

const debounceSearch = debounce(() => {
  getData();
}, 800);

watch(
  () => [
    queryParams.PageNumber,
    queryParams.Status,
    queryParams.PageSize,
    queryParams.Status,
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
