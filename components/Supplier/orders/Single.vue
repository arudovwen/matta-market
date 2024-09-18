<template>
  <div class="py-[30px] border-b border-[#DFE5EC] flex gap-x-6">
    <!-- <div class="h-[100px] w-[100px] bg-gray-50 rounded-[10px] overflow-hidden">
      <img src="/images/2.png" class="w-full h-full" alt="image" />
    </div> -->
    <div class="flex-1 flex justify-between">
      <div class="w-[236px]">
        <h6 class="text-sm mb-2 text-[#333] font-bold">
          {{ order.product || "-" }}
        </h6>
        <p class="text-xs mb-2 text-[#666666]" v-if="order.soldBy">
          Manufactured by:
          <span class="font-medium">{{ order.soldBy || "-" }}</span>
        </p>
        <p class="text-xs mb-4 text-[#666666]">
          Amount paid:
          <span class="font-medium text-[#333]">{{
            currencyFormat(order.amountWithTax)
          }}</span>
        </p>
        <p class="text-xs mb-2 text-[#333333] font-semibold">Shipped to:</p>
        <p class="text-xs mb-2 text-[#666666]">
          {{ order.shippingName || "-" }}
        </p>
        <p class="text-xs text-[#666666]">
          {{ order.shippingAddress || "-" }}
        </p>
       
      </div>

      <div class="w-[130px] text-right">
        <div class="mb-2 flex justify-end">
          <AppStatusButton
            :status="order?.status"
            stattype="parent-order"
            :type="order.orderNumber"
          />
        </div>
        <div class="mb-1 leading-[150%]">
          <span class="text-xs text-[#333] font-semibold">Order date:</span>
          <br />
          <span class="text-xs text-[#666666]">{{
            moment(order.orderDate).format("lll")
          }}</span>
        </div>
        <div class="leading-[150%]">
          <span class="text-xs text-[#333] font-semibold">Order No:</span><br />
          <span class="text-xs text-[#666666]">{{ order.orderNumber }}</span>
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
import moment from "moment";
defineProps(["order"]);
const emits = defineEmits(["onClick"]);
</script>
