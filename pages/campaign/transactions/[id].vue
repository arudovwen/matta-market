<template>
    <div
      class="gap-y-2 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE] pb-10"
    >
      <!-- Top bar   -->
      <HeaderComponent title="Transactions" :canGoBack="true" />
     
      <div class="pt-5">
        <div v-if="!docLoading">
          <div class="flex justify-between items-center mb-8">
            <div class="flex gap-x-4 px-[30px]">
              <div class="relative flex items-center">
                <span class="absolute left-4 pointer-events-none text-[#667085]"
                  ><i class="uil uil-search"></i
                ></span>
                <input
                  v-model="queryParams.Search"
                  @change="getRequests()"
                  @keyup="debounceSearch"
                  placeholder="Search"
                  class="border border-[#E7E7E7] text-sm focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div v-if="financeData.length">
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
                <tr v-for="item in financeData" :key="item">
                  <td
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    <div class="flex items-center">
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
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap max-w-[260px] truncate"
                  >
                    {{ item.type }}
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
                      class="px-[6px] py-[2px] text-xs rounded-full text-[#5925DC] border border-[#D9D6FE] bg-[#F4F3FF] flex gap-x-1 items-center max-w-max"
                    >
                      <AppIcon icon="octicon:dot-fill-24" /> New</span
                    >
                    <span
                      v-if="item.status == 1"
                      class="px-[6px] py-1 text-xs rounded-full border border-pink-100 bg-pink-50 text-pink-500 flex gap-x-1 items-center max-w-max"
                    >
                      <AppIcon icon="octicon:dot-fill-24" /> In progress</span
                    >
  
                    <span
                      v-if="item.status == 2"
                      class="px-[6px] py-1 text-xs rounded-full text-[#17B26A] border border-[#ABEFC6] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max"
                    >
                      <AppIcon icon="octicon:dot-fill-24" /> Shipped</span
                    >
                    <span
                      v-if="item.status == 3"
                      class="px-[6px] py-1 text-xs rounded-lg text-[#17B26A] border border-[#ABEFC6] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max"
                    >
                      <AppIcon icon="octicon:dot-fill-24" /> Completed</span
                    >
                  </td>
  
                  <td
                    :class="item.status == 3 ? 'opacity-25' : ''"
                    class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                  >
                    <Menu class="relative" as="div">
                      <MenuButton
                        :id="`${item.productName}+option`"
                        class="outline-none"
                      >
                         <AppIcon icon="heroicons:ellipsis-vertical-solid" />
                      </MenuButton>
                      <MenuItems
                        class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[180px] rounded-xl overflow-hidden"
                      >
                        <div
                          class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                          @click="openRequest(item)"
                        >
                          View request
                        </div>
  
                        <div
                          @click="cancelRequest"
                          class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                        >
                          Edit request
                        </div>
                        <div
                          @click="withdrawRequest(item.id)"
                          class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                        >
                          Withdraw request
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <EmptyData v-else title="No campaign has been created" type="campaign" />
        </div>
        <div class="text-center p-6 lg:p-8 my-20" v-if="docLoading">
          <AppLoader />
        </div>
  
        <div class="p-5" v-if="financeData.length">
          <PaginationSimple
            :total="queryParams.totalCount"
            :current="queryParams.PageNumber"
            :per-page="queryParams.PageSize"
            :pageRange="5"
            @page-changed="queryParams.PageNumber = $event"
          />
        </div>
      </div>
    </div>
    <DeleteModal
      @deleteItem="handleDelete"
      @close="open = false"
      title="Withdraw request"
      text="Are you sure you want to withdraw this application? This action cannot be undone."
      :open="open"
      btnText="Withdraw request"
    />
  </template>
  <script setup>
  import moment from "moment";
  import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
  import { sellerdoc, sellerdocdetails } from "~/services/requestservice";
  import debounce from "lodash/debounce";
  
  const id = ref(null);
  const open = ref(false);
  const route = useRoute();
  const theads = [
    "order id",
    "date",
    "email",
    "order value",
    "discount value",
    "status",
    "",
  ];
  const financeData = ref([]);
  
  onMounted(() => {
    getFinanceData();
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
  const docLoading = ref(true);
  
  const isOpen = ref(false);
  function getFinanceData() {
    docLoading.value = true;
    sellerdoc(queryParams).then((res) => {
      // financeData.value = res?.data?.data?.data;
      // queryParams.totalCount = res.data.data.totalCount;
      docLoading.value = false;
    });
  }
  function selectall() {
    multi.value = financeData.value.map((i) => i.id);
  }
  function openRequest(item) {
    sellerdocdetails(item.id).then((res) => {
      document.value = res.data.data;
      isOpen.value = true;
    });
  }
  function withdrawRequest(value) {
    id.value = value;
    open.value = true;
  }
  const document = ref({});
  function next() {
    queryParams.PageNumber++;
  }
  function toggleOrder() {
    if (queryParams.SortOrder == "A") {
      queryParams.SortOrder = "D";
    } else {
      queryParams.SortOrder = "A";
    }
  }
  function prev() {
    if (queryParams.PageNumber == 1) return;
    queryParams.PageNumber--;
  }
  
  const debounceSearch = debounce(() => {
    getFinanceData();
  }, 800);
  const handleDelete = () => {};
  watch(
    () => [queryParams.Search,  queryParams.PageNumber,  queryParams.SortOrder],
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
  