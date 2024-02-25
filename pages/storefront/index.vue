<template>
  <div class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10">
    <!-- Top bar   -->
    <HeaderComponent title="Storefront" subtext="List of orders, requests, products in your storefront" />

    <AppTab :tabs="tabs" className="px-6" />
    <div >
      <div >
        <SupplierOrdersComponent v-if="active === 'orders'" />
        <SupplierStoreRequests v-if="active === 'requests'" />
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

const tabs = [
  {
    title: "orders",
    key: "orders",
  },
  {
    title: "requests",
    key: "requests",
  },

  {
    title: "settings",
    key: "settings",
  },
];

const active = ref("orders");
provide("active", active);
</script>
