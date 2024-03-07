<template>
  <div class="gap-y-2 flex flex-col rounded-[10px] pb-10">
    <!-- Top bar   -->
    <HeaderComponent
      title="Wallet"
      subtext="Fund and withdraw money from your account"
      className="border-[rgba(234,236,240,1)] !px-4 lg:!px-0"
    />
    <VerificationBox
      v-if="authstore.userInfo.businessUserType.toLowerCase() !== 'buyer'"
    />
    <div
      class="py-[30px] flex lg:gap-x-4 gap-y-8 lg:gap-y-0 flex-col lg:flex-row px-4 lg:px-0"
    >
      <div class="lg:max-w-[365px]">
        <SideBox />
      </div>
      <div class="flex-1"><SupplierWalletTransactionPage /></div>
    </div>
  </div>
</template>

<script setup>
import {
  getLedgerTransactions,
  getWalletBalance,
} from "~/services/walletservice";
import SideBox from "./SideBox.vue";

const authstore = useAuthStore();
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
  Type:""
});

function getLedgersTrans() {
  isPageLoading.value = true;
  getLedgerTransactions(queryParams)
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
  getWalletBalance().then((res) => {
    if (res.status === 200) {
      balance.value = res.data.data;
    }
  });
}
onMounted(() => {});

provide("tdata", tdata);
provide("queryParams", queryParams);
provide("isPageLoading", isPageLoading);
provide("getLedgersTrans", getLedgersTrans);
provide("balance", balance);
</script>
