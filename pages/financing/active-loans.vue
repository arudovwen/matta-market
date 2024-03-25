<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="rounded-lg border border-gray-200 py-5 px-4" v-for="(n,id) in content" :key="id">
      <div class="flex justify-between items-center mb-6">
        <span class="text-base font-semibold capitalize text-[#333]">{{n.type}}</span>
        <span
          class="text-sm px-[6px] py[3px] rounded-full bg-green-100 text-green-600"
          >Active</span
        >
      </div>
      <span class="flex justify-between items-centeer text-sm mb-1 text-[#475467]">
        <span class="block text-sm"
          >Amount <span class="font-medium">{{currencyFormat(n.amount_left)}}</span></span
        >
        <span class="block text-sm text-[#333]">{{currencyFormat(n.amount)}}</span></span
      >
      <div class="mb-5"><AppLine :value="getPercentage(n.amount_left, n.amount)" /></div>
      <span class="flex justify-between items-centeer text-sm">
        <span class="block text-sm text-[#475467]"
          >Interest <span class="font-medium text-[#333]">{{n.interest}}%</span></span
        >
        <span class="block text-sm text-[#475467]">{{n.days_left}} days left</span></span
      >
    </div>
  </div>
</template>
<script setup>
const content = [
  {
    type: "trade finance",
    amount: 40000,
    amount_left: 20000,
    interest: 10,
    days_left: 20,
  },
  {
    type: "inport finance",
    amount: 55000,
    amount_left: 12000,
    interest: 10,
    days_left: 20,
  },
];
function getPercentage(part, total){
 return (part/total) * 100
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
