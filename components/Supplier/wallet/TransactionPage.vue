<!-- eslint-disable no-unused-vars -->
<template>
  <div class="gap-y-2 flex flex-col">
    <div class="mb-4">
      <div class="flex gap-x-4 justify-between">
        <div class="relative flex items-center">
          <span class="absolute left-4 pointer-events-none text-[#667085]"
            ><i class="uil uil-search"></i
          ></span>
          <input
            v-model="queryParams.Search"
            @change="getData()"
            @keyup="debounceSearch"
            placeholder="Search"
            class="border border-[#E7E7E7] focus:pr-3 pl-10 rounded-lg w-full lg:w-[280px] text-sm focus:outline-none py-[10px] transition ease-in-out duration-300"
            type="search"
          />
        </div>
        <div class="flex relative items-center">
          <select
            v-model="queryParams.Status"
            class="appearance-none border border-[#E7E7E7] rounded-lg w-[150px] text-sm py-[10px] px-[14px] focus:outline-matta-black/20"
          >
          <option value="" disabled>Filter</option>
            <option value="">Default</option>
            <option value="0">Credit</option>
            <option value="1">Debit</option>
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
    <div class="bg-white">
      <div v-if="!isPageLoading">
        <div
          v-if="isEmpty"
          class="overflow-auto border border-[#EAECF0] rounded-lg max-w-full"
        >
          <table class="w-full">
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
                class="border-b py-4 px-6 border-[#EAECF0] last:border-none whitespace-nowrap"
              >
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  Text
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  Text
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  Text
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  Text
                </td>
              </tr>
            </tbody>
          </table>
          <EmptyData type="transaction"  v-if="isEmpty" title="No Transaction yet" subtext="All your transactions will show up here" />
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
import { reactive, ref } from "vue";

const route = useRoute();
const type = ref("1");
const theads = ["reference", "amount", "date", "type"];
const tdata = [];
const isEmpty = ref(true);
const isPageLoading = ref(false);
// eslint-disable-next-line no-unused-vars
const queryParams = reactive({
  Status: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
