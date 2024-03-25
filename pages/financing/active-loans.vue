<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      class="rounded-lg border border-[#F2F4F7] py-5 px-4 shadow-[0px_4px_8px_-2px_#1018281A]"
      v-for="(n, id) in content"
      :key="id"
    >
      <div class="flex justify-between items-center mb-5">
        <span class="text-sm font-semibold capitalize text-[#344054]">{{
          n.type
        }}</span>
        <span
          class="text-xs px-[6px] py-[2px] rounded-[6px] bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647]"
          >Active</span
        >
      </div>
      <span
        class="flex justify-between items-center text-sm mb-1 text-[#475467]"
      >
        <span class="block text-sm"
          >Amount:<span class="font-medium ml-1">{{
            currencyFormat(n.amount_left)
          }}</span></span
        >
        <span class="block text-sm text-[#333]">{{
          currencyFormat(n.amount)
        }}</span></span
      >
      <div class="mb-4">
        <AppLine :value="getPercentage(n.amount_left, n.amount)" />
      </div>
      <span class="flex justify-between items-center text-xs">
        <span class="block text-[#667085]"
          >Interest:
          <span class="font-medium text-[#666666] ml-1"
            >{{ n.interest }}%</span
          ></span
        >
        <span class="block text-[#667085]"
          >{{ n.days_left }} days left</span
        ></span
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
    type: "import finance",
    amount: 55000,
    amount_left: 12000,
    interest: 10,
    days_left: 20,
  },
];
function getPercentage(part, total) {
  return (part / total) * 100;
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
