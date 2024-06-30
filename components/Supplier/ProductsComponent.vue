<template>
  <div class="mb-8 bg-white rounded-[10px] border border-[#F4F7FE]">
    <div class="gap-y-2 flex flex-col mb-4">
      <HeaderComponent
        title="Products"
        className="!px-5 !border-none "
        subtext="List of all added storefront products."
        btnText="Add product"
        btnMiniText="Add"
        btnIcon="humbleicons:plus"
        @onClick="router.push('/storefront/products/add-product')"
        btnClass="!text-xs md:!text-sm"
      />

      <div class="rounded-lg bg-white">
        <AppTab :tabs="tabs" :count="counts" className="px-5" />
        <div
          class="justify-between items-center mb-8 w-full hidden lg:flex px-5"
        >
          <div class="flex gap-x-4 flex-1">
            <div class="relative flex items-center">
              <span class="absolute left-4 pointer-events-none text-[#667085]"
                ><i class="uil uil-search"></i
              ></span>
              <input
                v-model="queryParams.Search"
                @change="getData()"
                @keyup="debounceSearch"
                placeholder="Search"
                class="border border-[#D0D5DD] focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
                type="search"
              />
            </div>
            <div class="flex relative items-center">
              <FormsSelectComponent
                @onGetData="onGetMarket"
                :options="marketOptions"
                :showSearch="true"
                :value="queryParams.MarketId"
                placeholder="Markets"
                classStyles="border border-[#D0D5DD] rounded-lg min-w-[180px] py-[10px] px-[14px] focus:outline-none"
              />
            </div>
            <div class="flex relative items-center">
              <FormsSelectComponent
                @onGetData="onGetProducer"
                :options="producerOptions"
                :showSearch="true"
                :value="queryParams.Producer"
                placeholder="Producers"
                classStyles="border border-[#D0D5DD] rounded-lg min-w-[180px] py-[10px] px-[14px] focus:outline-none"
              />
            </div>
          </div>
          <div class="flex gap-x-3 ml-2">
            <FormsSortFilter>
              <template #content>
                <button
                  class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
                >
                  <img
                    src="~/assets/img/sorting.svg"
                    alt="alt"
                  /></button></template
            ></FormsSortFilter>
          </div>
        </div>
        <div v-if="!isPageLoading">
          <div class="max-w-[80vw] lg:max-w-full" v-if="products.length">
            <table aria-describedby="true" class="w-full" v-if="products.length">
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
                <tr v-for="item in products" :key="item.id">
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    <div class="flex items-center">
                      <span
                        v-if="item.logo"
                        class="mr-3 h-10 w-10 rounded-full flex items-center justify-center border border-[#E7EBEE]"
                      >
                        <img class="w-full h-full object-cover rounded-full" alt="alt" :src="item.logo" />
                      </span>
                      <i
                        v-else
                        class="fas fa-image text-[40px] mr-3 text-gray-400"
                      ></i>
                      <span>
                        <span class="text-sm font-semibold">
                          {{ item.name }}
                        </span>
                        <!-- <br />
                        <span class="text-xs font-normal">
                          {{ item.manufacturer }}
                        </span> -->
                      </span>
                    </div>
                  </td>
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    {{ moment(item.created).format("ll") }}
                  </td>
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    {{ item.views }}
                  </td>

                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    {{ item.orders || 0 }}
                  </td>

                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] relative"
                  >
                    <Popover class="relative z-[99]">
                      <PopoverButton class="outline-none">
                        <i class="uil uil-ellipsis-v text-lg"></i>
                      </PopoverButton>
                      <PopoverPanel
                        class="absolute z-[99] bg-white shadow right-0 min-w-[150px] rounded-md overflow-hidden pt-4"
                      >
                        <ul class="grid grid-cols-1">
                          <NuxtLink
                            :to="`/storefront/products/edit-product?id=${item.id}`"
                          >
                            <li
                              class="px-6 text-sm text-[#333333] cursor-pointer group hover:text-primary py-2 whitespace-nowrap hover:bg-[#F9FAFB]"
                            >
                              <i
                                class="uil uil-pen text-[#666666] group-hover:text-primary"
                              ></i>
                              Edit
                            </li>
                          </NuxtLink>
                          <li
                            @click="isOpenModal(item)"
                            class="px-6 text-sm text-[#333333] cursor-pointer group hover:text-primary py-2 whitespace-nowrap hover:bg-[#F9FAFB]"
                          >
                            <i class="uil uil-trash text-matta-black"></i>
                            Remove
                          </li>
                        </ul>
                      </PopoverPanel>
                    </Popover>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <EmptyData
            v-else
            title=" No product available"
            subtext="We did not find the query you requested"
          />
        </div>
        <div class="text-center p-6 lg:p-8 my-24" v-else>
          <AppLoader />
        </div>
      </div>
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

    <IndexModal :isOpen="isOpen" @toggleModal="close">
      <template #content>
        <div
          class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-w-sm"
          v-if="isOpen"
        >
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">
              {{ title }}
            </h4>
            <!-- <i class="uil uil-times cursor-pointer text-lg" @click="close"></i> -->
          </div>

          <p class="text-sm text-matta-black mb-2">
            {{ text }}
          </p>
          <input
            class="rounded-lg px-[14px] py-[10px] h-10 w-full border border-[#DCDEE6] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            v-model="deletetext"
          />
          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="close"
              class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
            >
              Cancel
            </button>

            <button
              type="button"
              @click="handleDelete"
              :disabled="deletetext != 'Delete' || isLoading"
              :class="deletetext != 'Delete' && 'opacity-50'"
              class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:bg-priamry/70 text-[13px] uppercase"
            >
              Delete
            </button>
          </div>
        </div>
      </template>
    </IndexModal>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  getSupplierProducts,
  getproductcount,
  getMarkets,
  getProducers,
  deleteProduct,
} from "~/services/productservices";
import moment from "moment";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import debounce from "lodash/debounce";
import { toast } from "vue3-toastify";

const router = useRouter();
const tabs = [
  {
    title: "published",
    key: "published",
  },
  {
    title: "hidden",
    key: "hidden",
  },

  // {
  //   title: "archived",
  //   key: "archive",
  // },
];
const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: "storefront",
    url: "/overview",
  },
  {
    title: "products",
    url: "#",
  },
];
const queryParams = reactive({
  MarketId: "",
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  ShowSubMenu: true,
  Producer: "",
  pagecount: 0,
  totalCount: 0,
  Status: "",
});
const active = ref("published");
const isLoading = ref(false);
const counts = ref({ published: 0, archive: 0, hidden: 0 });
const isPageLoading = ref(true);
const producers = ref([]);
const markets = ref([]);
const id = ref(null);

onMounted(() => {
  getData();
  getproductcount().then((res) => {
    counts.value = { ...res.data.data, archive: res.data.data.archived }
      ? res.data.data
      : { published: 0, archived: 0, hidden: 0 };
  });
  getMarkets({ PageSize: 300000 }).then((res) => {
    markets.value = res.data.data;
  });
  getProducers({ PageSize: 100000 }).then((res) => {
    producers.value = res.data.data.data;
  });
});
function refresh() {
  queryParams.MarketId = queryParams.Producer = queryParams.Search = "";
  getData();
}

function onGetMarket(data) {
  queryParams.MarketId = data.id;
  getData();
}
function onGetProducer(data) {
  queryParams.Producer = data.id;
  getData();
}
const marketOptions = computed(() => {
  if (!markets.value.length) return [];
  return markets.value.map((i) => {
    i.name = i.title;
    return i;
  });
});
const producerOptions = computed(() => {
  if (!producers.value.length) return [];
  return producers.value.map((i) => {
    i.name = i.title;
    return i;
  });
});
function getData() {
	getSupplierProducts(queryParams)
	.then((res) => {
		console.log("fire - getData");
		console.log(res.data.data.data, "de");
		products.value = res.data.data.data;
		queryParams.totalCount = res.data.data.totalCount;
		queryParams.pagecount = res.data.data.data.length;
		isPageLoading.value = false;
		isPageLoading.value = true;
    })
    .catch(() => {
      isPageLoading.value = false;
    });
}
function next() {
  queryParams.PageNumber++;
  getData();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getData();
}

const debounceSearch = debounce(() => {
  getData();
}, 1500);

const deletetext = ref("");
const text = ref("");
const isOpen = ref(false);
const products = ref([]);
const route = useRoute();
defineProps(["title"]);
const theads = ["product", "created", "views", "orders", ""];

function close() {
  isOpen.value = false;
}

function isOpenModal(item) {
  text.value = `By deleting ${item.name.toUpperCase()}, you will delete all data. Please, type ‘Delete’  to confirm.`;
  id.value = item.id;
  isOpen.value = true;
}
function switchType(type) {
  queryParams.Status = type;
  getData();
}

function handleDelete() {
  isLoading.value = true;

  deleteProduct(id.value)
    .then((res) => {
      if (res.status == 200) {
        isOpen.value = false;
        isLoading.value = false;
        getData();
        toast.success("Product removed");
      }
    })
    .catch((err) => {
      toast.success(err?.response?.data?.message || err?.response?.data?.Message);
      isLoading.value = false;
    });
}
watch(active, () => {
  queryParams.Status = active.value === "" ? "published" : active.value;
});
watch(
  () => [queryParams.PageNumber, queryParams.Status],
  () => {
    getData();
  }
);
provide("isPageLoading", isPageLoading);
provide("active", active);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
