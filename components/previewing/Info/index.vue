<template>
  <div v-if="keydata !== 'documents'">
    <div
      class="grid grid-cols-2 gap-x-[75px] gap-y-6"
      v-if="detail?.propertyItems && detail?.propertyItems.length"
    >
      <div v-for="n in detail?.propertyItems" class="mb-6">
        <p class="text-[#A4A4A4] text-xs capitalize mb-1" v-if="n.property">
          {{ n.property.name }}
        </p>
        <p
          class="text-sm font-medium capitalize"
          v-for="(sub, i) in n.propertyValue"
          :key="i"
        >
          {{ sub }}
        </p>
      </div>

      <div v-if="detail?.subSection">
        <div class="" v-for="(n, idx) in detail?.subSection" :key="idx">
          <p class="mb-4 capitalize">{{ n.subSectionName }}</p>
          <div class="mb-4 description" v-html="n.description"></div>
        </div>
      </div>
    </div>
    <div
      v-if="!detail?.propertyItems || !detail?.propertyItems.length"
      class="text-[#A4A4A4] text-xs py-4 opacity-50"
    >
      No information available
    </div>
  </div>
  <div v-else class="grid grid-cols-1 gap-x-[75px] gap-y-6">
    <div
      class="flex jus items-center"
      v-for="(n, id) in documentList"
      :key="id"
    >
      <div class="flex gap-x-2">
        <p class="text-sm font-medium">{{ n.fileName }}</p>
        <p class="text-[#A4A4A4] text-xs">
          {{ parseInt(n.fileSize / 1000) }}kb
        </p>
      </div>

      <div class="flex items-center gap-x-5 text-sm">
        <p class="flex-1 whitespace-nowrap">{{ n.category }}</p>
        <span class="text-gray-200 text-3xl font-light">| </span>
        <div class="flex items-center">
          <a :href="n.documentUrl" :download="n.fileName">
            <span
              class="border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
              ><i class="uil uil-import"></i></span
          ></a>
        </div>
      </div>
    </div>
    <div
      v-if="!documentList || !documentLists.length"
      class="text-[#A4A4A4] text-xs py-4 opacity-50"
    >
      No information available
    </div>
  </div>
</template>
<script setup>
defineProps(["detail", "keydata"]);
const documentType = ref("");
const documents = [
  {
    text: "Material safety data sheet (MSDS)",
    item: "Info such as the chemical properties.",
    value: "Material safety data sheet (MSDS)",
  },
  {
    text: "Certificate of analysis (COA)",
    item: "Certificate of analysis of product.",
    value: "Certificate of analysis (COA)",
  },
  {
    text: "Technical data sheet (TDS)",
    item: "Document with technical data of product.",
    value: "Technical data sheet (TDS)",
  },
  {
    text: "Other",
    item: "Other types of product documents.",
    value: "other",
  },
];

const documentList = computed(() => {
  return detail.filter((i) =>
    i.category.toLowerCase().includes(documentType.value.toLowerCase())
  );
});
</script>
