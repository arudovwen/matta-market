<!-- eslint-disable no-unused-vars -->
<template>
  <div class="gap-y-2 flex flex-col w-full">
    <div class="mb-4">
      <div class="flex gap-x-4 justify-between">
        <div class="relative flex items-center max-w-[280px]">
          <span class="absolute left-4 pointer-events-none text-[#667085]"
            ><i class="uil uil-search"></i
          ></span>
          <input
            v-model="queryParams.Search"
            placeholder="Search"
            class="border border-[#E7E7E7] focus:pr-3 pl-10 rounded-lg w-full text-sm focus:outline-none py-[10px] transition ease-in-out duration-300"
            type="search"
          />
        </div>
        <div class="flex relative items-center">
          <select
            v-model="queryParams.Type"
            class="appearance-none border border-[#E7E7E7] rounded-lg max-w-[150px] text-sm py-[10px] px-[14px] focus:outline-matta-black/20"
          >
            <option value="" disabled>Filter</option>
            <option value="">Default</option>
            <option value="1">Credit</option>
            <option value="0">Debit</option>
          </select>
          <i
            class="uil uil-angle-down absolute right-2 pointer-events-none"
          ></i>
        </div>
        <!-- 
        <AppButton
          @click="queryParams.Status = ''"
          text="Clear filter"
          btnClass="text-xs text-[#98A2B3] font-normal"
        /> -->
      </div>
    </div>
    <div class="w-full">
      <div v-if="!isPageLoading" class="w-full">
        <div
          class="overflow-x-auto border border-[#EAECF0] rounded-lg w-full max-w-full bg-white"
        >
          <table class="table-auto w-full hidden lg:inline-table">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in tdata"
                :key="item"
                class="border-b border-[#EAECF0] last:border-none"
              >
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item.reference }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ currencyFormat(item.amount, item.currencyCode) }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ moment(item.transactionDate).format("ll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  <AppStatusButton
                    stattype="wallet"
                    :status="item.transactionType"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="lg:hidden">
            <div
              class="border-b border-[#EAECF0] last:border-none px-3 py-4"
              v-for="item in tdata"
              :key="item"
            >
              <div class="text-left text-matta-black">
                <span class="block text-sm mb-1"> {{ item.reference }}</span>
                <span class="block text-sm mb-1">
                  {{ moment(item.transactionDate).format("ll") }}</span
                >
                <span class="block text-base font-semibold">
                  {{ currencyFormat(item.amount, item.currencyCode) }}</span
                >
                <div class="!text-[10px] flex justify-end">
                  <AppStatusButton
                    stattype="wallet"
                    :status="item.transactionType"
                  />  
                </div>
              </div>
            </div>
          </div>

          <EmptyData
            type="transaction"
            v-if="!tdata.length"
            title="No Transaction ye"
            subtext="All your transactions will show up here"
          />
        </div>
        <div class="py-5" v-if="tdata.length">
          <PaginationSimple
            v-if="tdata.length"
            :total="queryParams.totalCount"
            :current="queryParams.PageNumber"
            :per-page="queryParams.PageSize"
            :pageRange="5"
            @page-changed="queryParams.PageNumber = $event"
          />
        </div>
      </div>
      <div class="text-center p-6 lg:p-8 my-16" v-else>
        <AppLoader />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import moment from "moment";
import debounce from "lodash/debounce";

const theads = ["reference", "amount", "date", "type"];
const tdata = inject("tdata");
const isPageLoading = inject("isPageLoading");
// eslint-disable-next-line no-unused-vars
const queryParams = inject("queryParams");
const getLedgersTrans = inject("getLedgersTrans");
onMounted(() => {
  getLedgersTrans();
});

const debounceSearch = debounce(() => {
  getLedgersTrans();
}, 1000);
watch(
  () => queryParams.Search,
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.Type, queryParams.PageNumber],
  () => {
    getLedgersTrans();
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
