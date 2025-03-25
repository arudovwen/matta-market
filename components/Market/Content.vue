<template>
  <div class="flex md:hidden justify-between items-center">
    <AppButton
      @click="open = true"
      text="Filter"
      icon="tabler:filter"
      btnClass="border border-[#ECECEC] bg-white text-[#5D6B98] !text-xs"
      iconClass="text-sm"
    />
    <div>
      <Select
        v-model.number="query.sortOrder"
        :options="options"
        placeholder="Sort by"
        classInput="!bg-white !border-[#ECECEC] !rounded-[4px] !text-[#5D6B98] !text-xs !h-7 md:!h-11 cursor-pointer !w-auto"
      />
    </div>
  </div>
  <div v-if="!productStore?.loading">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px]"
      v-if="productStore?.productsData?.length"
    >
      <ProductCard
        v-for="(n, idx) in productStore?.productsData"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
    <EmptyData
     title="No product found"
      v-if="!productStore?.productsData?.length"
      @btnFunction="
        () => {
          navigateTo('/request-product');
        }
      "
      btnText="Request for product"
    />
  </div>
  <IndexModal :isOpen="open" @togglePopup="togglePopup">
    <template #content>
      <div
        class="grid grid-cols-1 gap-y-[14px] w-full px-6 pt-6 pb-10 min-w-[250px] max-w-[320px]"
      >
        <p class="text-base text-[#18273AF0] font-bold">Filter</p>
        <SelectVueSelect
          label="Price"
          :options="options"
          v-model.number="sortOrder"
        />
        <SelectVueSelect
          label="Area of application"
          :options="
            marketStore?.marketMenuData?.map((i) => ({
              ...i,
              value: i.id,
              label: i.title,
            }))
          "
          v-model="applications"
          multiple
        />
        <SelectVueSelect
          label="Producers"
          :options="
            supplierStore?.producersData?.map((i) => ({
              ...i,
              value: i.title,
              label: i.title,
            }))
          "
          v-model="producers"
          multiple
        />
        <button
          @click="applyFilter"
          class="appearance-none leading-none px-20 py-4 w-full lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px]"
        >
          Apply Filter
        </button>
      </div>
    </template>
  </IndexModal>
  <AppLoader v-if="productStore?.loading" />
</template>
<script setup>
const productStore = useProductStore();
const supplierStore = useSupplierStore();
const marketStore = useMarketStore();

const query = inject("query");
const open = ref(false);
const applications = ref([]);
const producers = ref([]);
const sortOrder = ref("");
const options = [
  {
    label: "Low to High",
    value: 0,
  },
  {
    label: "High to Low",
    value: 1,
  },
];

function applyFilter() {
  query.producers = producers.value;
  query.sortOrder = sortOrder;
  query.applications = applications.value;
  open.value = false;
}
function togglePopup() {
  open.value = false;
}

onMounted(()=>{

})
</script>
