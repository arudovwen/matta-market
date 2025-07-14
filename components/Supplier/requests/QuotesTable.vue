<template>
  <div v-if="!quoteLoading">
    <div class="flex items-center justify-between mb-8">
      <div class="flex px-5 gap-x-4">
        <div class="relative flex items-center">
          <span class="absolute left-4 pointer-events-none text-[#667085]"
            ><i class="uil uil-search"></i
          ></span>
          <input
            v-model="quoteParams.Search"
            @change="getRequests()"
            @keyup="debounceSearch"
            placeholder="Search"
            class="border border-[#E7E7E7] text-sm focus:pr-3 pl-10 rounded-lg w-[280px] focus:outline-none py-[10px] transition ease-in-out duration-300"
            type="search"
          />
        </div>

        <div class="">
          <FormsCustomSelect
            placeholder="Status"
            :options="statusOptions"
            v-model="quoteParams.Status"
            classStyles="border border-[#E7E7E7] text-sm  rounded-lg min-w-[180px] py-[10px] px-[14px] focus:outline-none"
          />
        </div>
      </div>
    </div>
    <div v-if="quotes.length">
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
          <tr v-for="item in quotes" :key="item">
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.quoteNo }}
            </td>
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.product }}
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ item.requestedBy }}
            </td>
            <td
              :class="item.status == 3 ? 'opacity-25' : ''"
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              {{ moment(item.date).format("lll") }}
            </td>
            <td
              class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
            >
              <span
                v-if="item.status == 0"
                class="px-[6px] py-[2px] text-xs rounded-full text-[#5925DC] border border-[#D9D6FE] bg-[#F4F3FF] flex gap-x-1 items-center max-w-max"
              >
                <AppIcon icon="octicon:dot-fill-24" />
                {{ item.statusText }}</span
              >
              <span
                v-if="item.status == 1"
                class="px-[6px] py-1 text-xs rounded-full border border-pink-100 bg-pink-50 text-pink-500 flex gap-x-1 items-center max-w-max"
              >
                <AppIcon icon="octicon:dot-fill-24" />
                {{ item.statusText }}</span
              >

              <span
                v-if="item.status == 2"
                class="px-[6px] py-1 text-xs rounded-lg text-[#17B26A] border border-[#ABEFC6] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max"
              >
                <AppIcon icon="octicon:dot-fill-24" />
                {{ item.statusText }}</span
              >
              <span
                v-if="item.status == 3"
                class="px-[6px] py-1 text-xs rounded-lg text-[#17B26A] border border-[#ABEFC6] bg-[#ECFDF3] flex gap-x-1 items-center max-w-max"
              >
                <AppIcon icon="octicon:dot-fill-24" />
                {{ item.statusText }}</span
              >
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
                    class="px-5 py-2 text-sm cursor-pointer hover:bg-gray-50 whitespace-nowrap"
                    @click="openRequest(item)"
                  >
                    <i class="mr-2 uil uil-file"></i> Open quote
                  </div>

                  <!-- <div
                  @click="cancelRequest"
                  class="px-5 py-2 text-sm hover:bg-gray-50 whitespace-nowrap"
                >
                  <i class="mr-2 uil uil-trash"></i> Set as Cancelled
                </div> -->
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
      title="No quote have been made"
    />
  </div>

  <div class="p-6 my-20 text-center lg:p-8" v-if="quoteLoading">
    <AppLoader />
  </div>
  <div
    v-if="multi.length"
    class="px-6 py-5 rounded-lg bg-white flex justify-between items-center text-[13px]"
  >
    <span class="flex items-center gap-x-3">
      <span>{{ multi.length }} items selected</span>
      <span class="text-gray-300">|</span>
      <span class="flex items-center gap-x-3">
        <button class="px-2 uppercase" @click="selectall">select all</button>
        <button class="px-2 uppercase" @click="multi = []">
          deselect
        </button></span
      ></span
    >
    <span class="flex items-center gap-x-4">
      <!-- <button
        class="px-5 py-4 text-white uppercase rounded-lg bg-primary-500 hover:bg-primary/80"
      >
        add to card
      </button> -->
      <button
        class="bg-[#E7EBEE] text-matta-black rounded-lg px-5 py-4 uppercase"
      >
        set as cancelled
      </button>
    </span>
  </div>
  <div class="p-5">
    <PaginationSimple
      :total="quoteParams.totalCount"
      :current="quoteParams.PageNumber"
      :per-page="quoteParams.PageSize"
      :pageRange="5"
      @page-changed="quoteParams.PageNumber = $event"
    />
  </div>
  <SideModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div
        class="h-full w-full max-w-[400px] bg-white rounded-lg p-6 lg:py-10 px-6 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Quote No</p>
          <h2 class="text-2xl font-medium">{{ quote.quoteNo }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierRequestsQuoteDetail
          @close="
            isOpen = false;
            getquotes();
          "
        />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { defineProps, ref, watch, provide, inject } from "vue";
import moment from "moment";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import { buyerquotedetail } from "~/services/quoteservice";
import debounce from "lodash/debounce";

const theads = ["quote no", "product", "requested by", "created", "status", ""];
const getquotes = inject("getquotes");
const quoteLoading = inject("quoteLoading");
const quotes = inject("quotes");
const multi = ref([]);
defineProps(["title"]);

const quoteParams = inject("quoteParams");

const isOpen = ref(false);

onMounted(() => {
  getquotes();
});
function selectall() {
  multi.value = quotes.value.map((i) => i.id);
}
function openRequest(item) {
  buyerquotedetail(item.id).then((res) => {
    quote.value = { ...res.data.data, quoteId: item.id, id: item.id };

    isOpen.value = true;
  });
}
const quote = ref({});
function next() {
  quoteParams.PageNumber++;
}
function toggleOrder() {
  quoteParams.SortOrder == "A"
    ? (quoteParams.SortOrder = "D")
    : (quoteParams.SortOrder = "A");
}
function prev() {
  if (quoteParams.PageNumber == 1) return;
  quoteParams.PageNumber--;
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
const debounceSearch = debounce(() => {}, 800);
watch(
  () => ({ ...quoteParams }),
  () => {
    debounceSearch();
  }
);
provide("quote", quote);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
