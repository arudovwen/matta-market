<template>
  <div class="bg-white rounded-[10px]">
    <div
      class="px-5 pt-5 flex gap-x-[30px] items-center border-b border-[#f3f3f3] w-full overflow-x-auto no-scrollbar"
    >
      <button
        v-for="n in tabs"
        @click="() => (active = n.key)"
        :key="n.key"
        :class="`${
          active === n.key
            ? 'text-[#1570EF] border-[#1570EF]'
            : 'border-transparent'
        } text-xs pb-[19px] border-b-2 block whitespace-nowrap`"
      >
        {{ n.title }}
      </button>
    </div>
    <div class="p-5 max-w-[700px]  min-h-[200px]">
      <ProductInfo
        :detail="handleProp(active)"
        :keydata="active"
        v-if="active !== 'documents'"
      />
      <ProductInfoDocuments
        :detail="productData?.documentInfoModels"
        v-if="active == 'documents' && productData?.documentInfoModels?.length"
      />
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from "~/stores/products";

const store = useProductStore();
const { productData } = storeToRefs(store);
const tabs = [
  {
    title: "Technical details & test data",
    key: "technical",
  },
  {
    title: "Properties",
    key: "property",
  },
  {
    title: "Regulatory & Compliance",
    key: "compliance",
  },
  {
    title: "Documents",
    key: "documents",
  },
  //   {
  //     title: "Table",
  //     key: "table",
  //   },
];
function handleProp(value) {
  return productData?.value?.propertyItems?.propertyItems[value];
}
const active = ref("technical");
</script>
