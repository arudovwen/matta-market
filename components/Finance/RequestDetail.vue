<template>
  <div v-if="isFetching" class="flex items-center justify-center p-10">
    <AppLoader />
  </div>
  <div v-else>
    <h1 class="font-bold text-xl mb-5">{{ requestDetail?.financeRequestNo }}</h1>

    <div class="grid grid-cols-1 gap-y-6 mb-6">
      <div>
        <p class="font-nomrmal text-sm text-gray-500">Customer name</p>
        <p class="font-medium text-sm">{{ requestDetail?.customer || "-" }}</p>
      </div>
      <div>
        <p class="font-nomrmal text-sm text-gray-500">Date requested</p>
        <p class="font-medium text-sm">
          {{ moment(requestDetail?.created).format("ll") }}
        </p>
      </div>
      <div>
        <p class="font-nomrmal text-sm text-gray-500">Requested Amount</p>
        <p class="font-medium text-base">
          {{ currencyFormat(requestDetail?.amountRequired) }}
        </p>
      </div>
      <div>
        <p class="font-nomrmal text-sm text-gray-500">Approved Amount</p>
        <p class="font-medium text-base">
          {{ currencyFormat(requestDetail?.amountApproved) }}
        </p>
      </div>
      <div v-if="requestDetail?.approvedOn">
        <p class="font-nomrmal text-sm text-gray-500">Approval date</p>
        <p class="font-medium text-base">
          {{ moment(requestDetail?.approvedOn).format("ll") }}
        </p>
      </div>
      <div>
        <p class="font-nomrmal text-sm text-gray-500">Tenor</p>
        <p class="font-medium text-base">{{ requestDetail?.tenor }} days</p>
      </div>
      <div>
        <p class="font-nomrmal text-sm text-gray-500">Type</p>
        <p class="font-medium text-base capitalize">
          {{ handleType(requestDetail?.loanRequestType) }} finance
        </p>
      </div>
      <div class="">
        <p class="font-nomrmal text-sm text-gray-500">
          Have you done business with the buyer before?
        </p>
        <p class="font-medium text-base">{{ requestDetail?.haveyoudonebusiness }}</p>
      </div>
      <div class="">
        <p class="font-nomrmal text-sm text-gray-500">
          Have you previously exported to the order’s country of destination?
        </p>
        <p class="font-medium text-base">
          {{ requestDetail?.haveyouexportedtotheothercourty }}
        </p>
      </div>
      <div>
        <p class="font-nomrmal text-sm text-gray-500">
          Where did you hear about us?
        </p>
        <p class="font-medium text-base">
          {{ requestDetail?.whereDidYouHearAboutUs }}
        </p>
      </div>
    </div>
    <DocumentsViewer :documents="requestDetail?.supportingDocuments || []" />
  </div>
</template>
<script setup>
import moment from "moment";
import { getFinance } from "~/services/financeservice";

const props = defineProps(["detail"]);
const isFetching = ref(true);
const requestDetail = ref(null);
function handleType(key) {
  switch (parseInt(key)) {
    case 0:
      return "trade";
      break;
    case 1:
      return "supply";
      break;
    case 2:
      return "import";
      break;
    case 3:
      return "export";
      break;

    default:
      break;
  }
}

onMounted(() => {
  getFinanceData();
});
function getFinanceData() {
  isFetching.value = true;
  getFinance(props.detail.id)
    .then((res) => {
      if (res.status === 200) {
        requestDetail.value = res.data.data;
        isFetching.value = false;
      }
    })
    .catch(() => {
      isFetching.value = false;
    });
}
</script>
