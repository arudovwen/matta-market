<!-- eslint-disable no-unused-vars -->
<template>
  <div class="gap-y-2 flex flex-col w-full">
    <div class="mb-4 px-6">
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

        <!-- 
          <AppButton
            @click="queryParams.Status = ''"
            text="Clear filter"
            btnClass="text-xs text-[#98A2B3] font-normal"
          /> -->
      </div>
    </div>
    <div class="w-full px-6">
      <div class="w-full">
        <div
          class="overflow-x-auto border border-[#EAECF0] rounded-lg w-full max-w-full bg-white"
        >
          <table
            aria-describedby="true"
            class="table-auto w-full hidden lg:inline-table"
          >
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

            <tbody v-if="!isPageLoading">
              <tr
                v-for="item in tdata"
                :key="item"
                class="border-b border-[#EAECF0] last:border-none"
              >
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item.financeRequestNo }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ currencyFormat(item.repaymentAmount) }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6 whitespace-nowrap"
                >
                  {{ item.created ? moment(item.created).format("lll") : "-" }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal py-4 px-6"
                >
                  <div class="flex gap-x-2">
                    <AppStatusButton
                      :status="item.loanStatus"
                      stattype="loan"
                    />
                  </div>
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal whitespace-nowrap py-4 px-6 flex items-center justify-end gap-x-6"
                >
                  <button
                    v-if="item.loanStatus !== 2"
                    type="button"
                    @click="
                      () => {
                        type = 'repay';
                        isRepay = true;
                        detail = item;
                      }
                    "
                    class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap cursor-pointer text-primary-500 font-medium"
                  >
                    Repay credit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <EmptyData
            type="transaction"
            v-if="!tdata.length"
            title="No Transaction yet"
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
      <div class="text-center p-6 lg:p-8 my-16" v-if="isPageLoading">
        <AppLoader />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="isRepay" @togglePopup="isRepay = false">
    <template #content>
      <div class="max-w-[800px]">
        <div class="bg-white p-6 rounded-lg">
          <RepayLoan
            :detail="detail"
            :creditDetail="creditDetail"
            type="loan"
          />
        </div>
      </div>
    </template>
  </IndexModal>
  <ActionModal
    v-if="isRepay"
    :open="isSuccessOpen"
    type="success"
    title="Request Successful"
    :text="completeText"
    btn-text="Okay"
    :isOkay="true"
    :isCancel="false"
    @actionItem="
      isRepay = false;
      getLedgersTrans();
    "
  />
</template>

<script setup>
import { useRoute } from "vue-router";
import moment from "moment";
import debounce from "lodash/debounce";
import { getAllFinance } from "~/services/financeservice";
import RepayLoan from "~/pages/financing/repay-loan.vue";

const theads = ["request ID", "amount", "date", "status", ""];
const detail = ref(null);
const creditDetail = ref(null);
const isRepay = ref(false);
const completeText = ref("Your withdrawal request is being processed.");
const isOpen = ref(false);
const isSuccessOpen = ref(false);
const isLoading = ref(true);
const tdata = ref([]);
const isPageLoading = ref(false);
const balance = ref(0);
const queryParams = reactive({
  Status: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
  Type: "",
  loadRequestType: 4,
});

function getLedgersTrans() {
  isPageLoading.value = true;
  getAllFinance(queryParams)
    .then((res) => {
      if (res.status === 200) {
        tdata.value = res.data.data;
        isPageLoading.value = false;
        queryParams.totalCount = res.data.totalCount;
      }
    })
    .catch(() => {
      isPageLoading.value = false;
    });
}
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
provide("isOpen", isRepay);
</script>
