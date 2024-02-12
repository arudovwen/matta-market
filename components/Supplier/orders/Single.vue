<template>
  <div class="py-[30px] border-b border-[#F4F7FE] flex gap-x-6">
    <div class="h-[100px] w-[100px] bg-gray-50 rounded-[10px] overflow-hidden">
      <img src="/images/2.png" class="w-full h-full" alt="image" />
    </div>
    <div class="flex-1 flex justify-between">
      <div class="w-[236px]">
        <h6 class="text-sm mb-2 text-[#333] font-bold">
          Acrypol 600(Styrene Acrylic)
        </h6>
        <p class="text-xs mb-2 text-[#666666]">
          Sold by: <span class="font-medium">A Huber Company</span>
        </p>
        <p class="text-xs mb-4 text-[#666666]">
          Amount paid:
          <span class="font-medium text-[#333]">{{
            currencyFormat(order.amountWithTax)
          }}</span>
        </p>
        <p class="text-xs mb-2 text-[#333333] font-semibold">Shipped to:</p>
        <p class="text-xs mb-2 text-[#666666]">John Doe</p>
        <p class="text-xs text-[#666666]">
          15th Floor, Elephant House, Marina, Lagos., Lagos Island, Lagos
        </p>
      </div>

      <div class="w-[130px] text-right">
        <div class="mb-2 leading-[150%]">
          <span class="text-xs text-[#333] font-semibold">Order date:</span>
          <br />
          <span class="text-xs text-[#666666]">{{moment(order.orderDate).format("ll")}}</span>
        </div>
        <div class="leading-[150%]">
          <span class="text-xs text-[#333] font-semibold">Order No:</span
          ><br />
          <span class="text-xs text-[#666666]">{{order.orderNumber}}</span>
        </div>

        <AppButton
          @click="emits('onClick', order)"
          text="View Details"
          btnClass="text-primary-500 !px-0 font-semibold !text-xs"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment"
defineProps(["order"]);
const emits = defineEmits(["onClick"]);
</script>
