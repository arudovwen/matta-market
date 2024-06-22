<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <!-- Top bar   -->
    <HeaderComponent
      title="Storefront"
      subtext="List of orders, requests, products in your storefront"
    />

    <AppTab :tabs="tabs" className="px-4 lg:px-6" />
    <div>
      <div>
        <SupplierOrdersComponent v-if="active === 'customer orders'" />
        <SupplierStoreRequests v-if="active === 'customer requests'" />
        <SupplierCustomization v-if="active === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Customization from "./customization";
import Requests from "./requests";
import Orders from "./orders";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
const route = useRoute();
const active = ref("customer orders");
const tabs = [
  {
    title: "customer orders",
    key: "customer orders",
  },
  {
    title: "customer requests",
    key: "customer requests",
  },

  {
    title: "settings",
    key: "settings",
  },
];
onMounted(() => {
  if (route.query.page) {
    active.value = route.query.page;
  }
}),
  provide("active", active);
</script>
