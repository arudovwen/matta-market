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
          <SupplierOrdersConfirmation v-if="active === 'pending confirmation'" />
        <SupplierStoreRequests v-if="active === 'customer requests'" />
        <SupplierCustomization v-if="active === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script setup>
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
    title: "pending confirmation",
    key: "pending confirmation",
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
  if (route.query.tab) {
    active.value = route.query.tab;
  }
});
provide("active", active);
</script>
