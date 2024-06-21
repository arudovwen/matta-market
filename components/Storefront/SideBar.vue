<template>
  <div class="bg-white w-full pt-4 pb-2 rounded-[10px] sticky top-[120px]">
    <div class="flex justify-between items-center pb-2 px-[15px]">
      <span class="text-sm font-semibold"> Filter</span>
      <span
        @click="
          query.producers = [];
          query.applications = [];
        "
        class="text-xs text-[#8D8D8D] cursor-pointer"
        as="button"
        >Clear filter</span
      >
    </div>
    <hr class="border-[#EFEFEF] my-2" />
    <SideTab
      title="Producers"
      :lists="
        supplierStore?.producersData?.map((i) => ({ ...i, value: i.title }))
      "
      v-model="query.producers"
    />

    <hr class="border-[#EFEFEF] my-[1px]" v-if="route.params.id" />
    <SideTab
      v-if="route.params.id"
      title="Area of applications"
      :lists="marketStore?.marketMenuData?.map((i) => ({ ...i, value: i.id }))"
      v-model="query.applications"
    />
  </div>
</template>
<script setup>
const supplierStore = useSupplierStore();
const marketStore = useMarketStore();
const route = useRoute();
const query = inject("query");
onMounted(() => {
  supplierStore.fetchProducers({ PageSize: 100 });
  if (route.params.id) {
    marketStore.getMarketMenu({
      ShowSubMenu: true,
      PageNumber: 1,
      PageSize: 100,
      MarketId: route.params.id,
    });
  }
});
</script>
