<template>
  <div class="grid grid-cols-3 gap-4" v-if="financeData.length">
    <div
      class="rounded-lg border border-[#F2F4F7] py-5 px-4 shadow-[0px_4px_8px_-2px_#1018281A] cursor-pointer"
      v-for="(n, id) in financeData"
      :key="id"
      @click="
        () => {
          isOpen = true;
          detail = n;
        }
      "
    >
      <div class="flex justify-between items-center mb-5">
        <span class="text-sm font-semibold capitalize text-[#344054]"
          >{{ handleType(n.loanRequestType) }} finance</span
        >
        <span
          class="text-xs px-[6px] py-[2px] rounded-[6px] bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647]"
          >Active</span
        >
      </div>
      <span
        class="flex justify-between items-center text-sm mb-1 text-[#475467]"
      >
        <span class="block text-sm"
          >Amount:<span class="font-medium ml-1">{{
            currencyFormat(n.totalPayed)
          }}</span></span
        >
        <span class="block text-sm text-[#333]">{{
          currencyFormat(n.repaymentAmount)
        }}</span></span
      >
      <div class="mb-4">
        <AppLine :value="getPercentage(n.totalPayed, n.repaymentAmount)" />
      </div>
      <span class="flex justify-between items-center text-xs">
        <span class="block text-[#667085]"
          >Interest:
          <span class="font-medium text-[#666666] ml-1"
            >{{ n.interestRate }}%</span
          ></span
        >
        <span class="block text-[#667085]"
          >{{ n.daysLeft }} days left</span
        ></span
      >
    </div>
  </div>
  <hr v-if="financeData.length" class="my-6 border-[#EAECF0]" />

  <ModalCenter :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #default>
      <div class="h-full w-full bg-white rounded-lg p-6">
        <RepayLoan :detail="detail" v-if="detail" />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
import { getAllFinance } from "~/services/financeservice";
import RepayLoan from "./repay-loan";

const detail = ref(null);
const isOpen = ref(false);
const queryParams = reactive({
  SupplierId: null,
  RequestStatus: null,
  LoadRequestType: null,
  Search: "",
  SortOrder: null,
  PageNumber: 1,
  PageSize: 10,
  financeRequestStatus_In: [0, 1, 2, 3, 4, 5],
  loanStatus_In: [1],
});
const docLoading = ref(true);

const financeData = ref([]);
function getFinanceData() {
  docLoading.value = true;

  getAllFinance(queryParams).then((res) => {
    financeData.value = res.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    docLoading.value = false;
  });
}
function handleType(key) {
  switch (parseInt(key)) {
    case 0:
      return "trade";
    case 1:
      return "supply";
    case 2:
      return "import";
    case 3:
      return "export";
    default:
      break;
  }
}
onMounted(() => {
  getFinanceData();
});

function getPercentage(part, total) {
  return (part / total) * 100;
}
provide("isOpen", isOpen);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
