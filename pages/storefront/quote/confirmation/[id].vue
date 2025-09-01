<template>
  <div
    class="gap-y-2 flex flex-col bg-[#F9FAFB] rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <div class="container py-8">
      <div class="mb-8">
        <Breadcrumbs :manual="true" :links="crumbsData" />
      </div>
      <div class="mb-6">
        <HeaderComponent
          :title="`Confirm Product - ${orderNumber}`"
          subtext="View quote details and confirm product"
          class-name="!px-0 !border-none !py-0"
        />
      </div>
      <div class="flex gap-x-4">
        <div class="flex-1">
          <SupplierQuoteConfirmationContent />
        </div>
        <div class="w-[358px]">
          <SupplierQuoteConfirmationSide @close="getData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storefrontorderdetails } from "~/services/storefrontservice";
import { buyerquotedetail } from "~/services/quoteservice";

const pickupStore = usePickupStore();
const { orderNumber } = useRoute().query;
const { id } = useRoute().params;
const isQuoteLoading = ref(false);
const order = ref(null);
const selectedPickup = ref(pickupStore.addressesData?.[0]?.id || null);
const crumbsData = ref([
  {
    title: "Storefront Quotes",
    url: "/storefront",
  },

  {
    title: "Quote Confirmation",
    url: "/storefront?tab=customer requests&type=order requests",
  },
  {
    title: orderNumber,
    url: "#",
  },
]);
function getData() {
  buyerquotedetail(id)
    .then((res) => {
      console.log(res.data);
      order.value = { ...res.data.data, quoteId: id, id: id };
      isQuoteLoading.value = false;
    })
    .catch((err) => {
      isQuoteLoading.value = false;
      toast.error(err?.response?.data?.message || err?.response?.data?.Message);
    });
}
onMounted(() => {
  getData();
});
provide("order", order);
provide("getData", getData);
provide("selectedPickup", selectedPickup);
</script>
