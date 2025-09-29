<template>
  <div
    class="gap-y-2 flex flex-col mb-4 bg-white rounded-[10px] border border-[#F4F7FE]"
  >
    <HeaderComponent title="My  Orders" />

    <div class="p-6 bg-white rounded-lg lg:p-8">
      <div v-if="isShowing === 'all'">
        <div class="items-center justify-between hidden mb-8 lg:flex">
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
            <div class="relative flex items-center">
              <Select
                v-model="queryParams.OrderItemStatus"
                :options="options"
                placeholder="Select status"
                :classInput="`text-sm min-w-[180px] !bg-white  !rounded-lg !text-[#475467] !border !h-11 cursor-pointer border-[#D0D5DD]`"
              />
            </div>

            <AppButton
              @click="
                queryParams.OrderItemStatus = '';
                queryParams.Search = '';
              "
              text="Clear filter"
              btnClass="text-xs text-[#98A2B3] font-normal"
            />
          </div>
        </div>
        <div>
          <template v-for="item in orders" :key="item">
            <SupplierOrdersSingle :order="item" @openDetail="openOrder(item)" />
          </template>
        </div>
        <div v-if="!isLoading">
          <EmptyData
            v-if="!orders.length"
            url="/markets"
            buttonText="go to catalog"
            text="No orders have been placed."
          />
        </div>
      </div>
      <div v-if="isShowing === 'pending'">
        <div
          v-for="(item, idx) in pendingCheckout.items"
          :key="idx"
          class="relative p-6 mb-4 bg-white border rounded-lg"
        >
          <p class="mb-1 text-[13px] uppercase">
            {{ item.producer }}
          </p>
          <p class="mb-2 text-lg font-medium lg:text-xl">
            {{ item.product }}
          </p>
          <!-- <p class="mb-6">
          <i class="mr-1 uil uil-store"></i>
        </p> -->

          <span
            class="absolute cursor-pointer top-3 right-3"
            @click="removeItem(item.id)"
            ><i class="text-2xl uil uil-times text-matta-black"></i
          ></span>
          <div class="flex flex-col items-center w-full gap-3 mb-4 lg:flex-row">
            <div
              class="flex items-center bg-[#F1F3F5] rounded-lg relative flex-1 w-full lg:w-auto pr-4"
            >
              <div class="relative flex items-center justify-between w-full">
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
              class="flex flex-col items-center w-full gap-3 lg:flex-row lg:w-auto"
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
          class="flex items-center justify-end mb-10 gap-x-10"
          v-if="pendingCheckout?.items?.length"
        >
          <div class="text-[#ABABAB] text-sm uppercase">Item total</div>
          <div class="text-2xl font-medium text-right">
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
          class="py-20 text-lg text-center"
        >
          No pending checkout
        </div>
      </div>
    </div>
    <div class="p-6 my-20 text-center lg:p-8" v-if="isLoading">
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
        class="w-full h-full max-h-full p-6 overflow-auto bg-white rounded-lg lg:p-8"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Order ID</p>
          <h2 class="text-2xl font-medium" v-if="order">
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
import debounce from "lodash/debounce";
import {
  procurementorders,
  procurementorderdetails,
} from "~/services/orderservice";
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
  OrderItemStatus: "",
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
    label: "Order created",
    value: 1,
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
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}

defineProps(["title"]);

const order = ref(null);
const isOpen = ref(false);

function openOrder(val) {
  console.log({val});
  
  procurementorderdetails(val.orderId)
    .then((res) => {
      order.value = { ...val, ...res.data, orderId: val.orderNumber };

      isOpen.value = true;
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
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
    queryParams.OrderItemStatus,
    queryParams.PageSize,
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
