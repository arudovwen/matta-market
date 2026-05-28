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
          :title="`Confirm Order - ${orderNumber}`"
          subtext="View order details and delivery status"
          class-name="!px-0 !border-none !py-0"
        />
      </div>
      <div class="flex gap-x-4">
        <div class="flex-1">
          <SupplierOrderConfirmationContent />
        </div>
        <div class="w-[358px]">
          <SupplierOrderConfirmationSide />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storefrontorderdetails } from "~/services/storefrontservice";

const pickupStore = usePickupStore();
const { orderNumber } = useRoute().query;
const { id } = useRoute().params;
const isOrderLoading = ref(false);
const order = ref(null);
const selectedPickup = ref(pickupStore.addressesData?.[0]?.id || null);
const crumbsData = ref([
  {
    title: "Store Orders",
    url: "/storefront",
  },

  {
    title: "Order Confirmation",
    url: "/storefront?tab=pending confirmation",
  },
  {
    title: orderNumber,
    url: "#",
  },
]);
function getData() {
  storefrontorderdetails(id)
    .then((res) => {

      order.value = res.data;
      isOrderLoading.value = false;
    })
    .catch((err) => {
      isOrderLoading.value = false;
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
