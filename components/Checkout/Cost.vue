<template>
  <div>
    <h2 class="mb-1 font-bold text-xl border-b border-[#f3f3f3]">
      Shipping Cost Breakdown
    </h2>
    <p class="text-sm mb-6">
      Your shipping cost is calculated based on the type and sizeof vehicle
      required to transport the materials
    </p>

    <div>
      <Table :columns="columns" :rows="rows" :isBalance="true" />
    </div>
  </div>
</template>
<script setup>
// const currencyFormat = inject("currencyFormat");
const rows = ref([
  {
    item: "Methyl hydroxyethyl cellulose (Tylose® MH 10000 KG4)",
    size: "2 tonne",
    cost: currencyFormat(40000),
  },
  {
    item: "Acrypol 600(Styrene Acrylic)",
    size: "2 tonne",
    cost: currencyFormat(4040200),
  },
  {
    item: "IPEA (N,N-Diisopropylethylamine)",
    size: "4 tonne",
    cost: currencyFormat(4240000),
  },
  {
    item: "Total Shipping Cost",
    size: "",
    cost: currencyFormat(14240000),
  },
]);
const columns = [
  {
    header: "Item",
    key: "item",
    isHtml: false,
    isStatus: false,
  },

  {
    header: "Size",
    key: "size",
    isHtml: false,
    isStatus: false,
  },
  {
    header: "Shipping cost",
    key: "cost",
    isHtml: false,
    isStatus: false,
  },
];
</script>
