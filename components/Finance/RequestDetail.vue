<template>
  <div>
    <h1 class="font-bold text-xl mb-5">{{ detail?.financeRequestNo }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6">
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Customer name</p>
          <p class="font-medium text-sm">{{ detail.customer || "-" }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Date requested</p>
          <p class="font-medium text-sm"> {{ moment(detail.created).format("ll") }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Amount</p>
          <p class="font-medium text-base"> {{currencyFormat(detail.amountRequired)}}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Tenor</p>
          <p class="font-medium text-base"> {{ detail.tenor }} days</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500 ">Type</p>
          <p class="font-medium text-base capitalize"> {{ handleType(detail.loanRequestType) }} finance</p>
        </div>
        <div class="col-span-2">
          <p class="font-nomrmal text-sm text-gray-500">Have you done business with the buyer before?</p>
          <p class="font-medium text-base"> {{ detail.haveyoudonebusiness }}</p>
        </div>
        <div class="col-span-2">
          <p class="font-nomrmal text-sm text-gray-500">Have you previously exported to the order’s country of destination?</p>
          <p class="font-medium text-base"> {{ detail.haveyouexportedtotheothercourty }}</p>
        </div>
        <div>
          <p class="font-nomrmal text-sm text-gray-500">Where did you hear about us?

          </p>
          <p class="font-medium text-base"> {{ detail.whereDidYouHearAboutUs }}</p>
        </div>
      
    </div>
    <DocumentsViewer :documents="detail.supportingDocuments" />
  </div>
</template>
<script setup>
import moment from "moment"
defineProps(["detail"]);

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
</script>
