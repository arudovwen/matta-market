<template>
  <section class="flex flex-col gap-y-8" v-if="order">
    <div class="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">amount</p>
        <span class="text-sm">{{ currencyFormat(order?.amountWithTax) }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">Order status</p>
        <AppStatusButton
          :status="order?.status"
          stattype="parent-order"
          :type="order.orderNumber"
        />
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">Order date</p>
        <span class="text-sm">{{ moment(order?.orderDate).format("ll") }}</span>
      </div>
      <!-- <div v-if="order?.schedulePickupDate">
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">
          scheduled pickup date
        </p>
        <span class="text-sm">{{
          moment(order?.schedulePickupDate || "").format("ll")
        }}</span>
      </div> -->
      <!-- <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">
          scheduled delivery date
        </p>
        <span class="text-sm">{{
          moment(order?.scheduleDeliveryDate).format("ll")
        }}</span>
      </div> -->
    </div>

    <div class="bg-[#182230] rounded-lg p-6 text-white">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Order Summary</h3>
        <!-- <span><i class="uil uil-minus text-lg"></i></span> -->
      </div>

      <div
        v-for="(item, id) in order?.orderDetails"
        :key="id"
        class="border-b pb-4 border-[#ddd] mb-3"
      >
        <div class="flex justify-between items-end gap-x-2 mb-[6px]">
          <div class="text-[#E1E1E1] pt-1 flex items-end text-sm">
            <span>
              <span class="text-sm font-medium">{{ item.product }}</span>
              <br />
              <span class="text-xs flex gap-x-3 text-[#98A2B3]"
                ><span>{{ item.selectedPackage }}</span>
                <span>x{{ item.quantity }}</span></span
              >
            </span>
          </div>
          <span class="text-right">{{ currencyFormat(item.itemTotal_with_tax) }}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <span class="flex gap-x-3 items-center text-xs"
            ><span>Status</span>
          </span>
          <span class="rounded bg-white">
            <AppStatusButton :status="item.orderItemStatus" stattype="order"
          /></span>
        </div>
      </div>
      <div class="flex justify-between gap-x-2">
        <div class="text-[#E1E1E1] text-sm">Item total</div>
        <div class="text-right py-1">
          {{ currencyFormat(order?.orderTotal) }}
        </div>
      </div>
      <div class="flex justify-between gap-x-2">
        <div class="text-sm text-[#E1E1E1]">
          Tax <span class="text-xs">(7.5%)</span>
        </div>
        <div class="text-right py-1">
          {{ currencyFormat(order?.orderTotalwithTax - order?.orderTotal) }}
        </div>
      </div>
      <div class="flex justify-between gap-x-2 border-b border-[#ddd] mb-6">
        <div class="text-[#E1E1E1] pt-1 pb-6 flex items-center text-sm">
          Shipping & handling <i class="uil uil-info-circle text-sm ml-1"></i>
        </div>
        <div class="text-right pt-1 pb-6">TBD</div>
      </div>

      <div class="flex justify-between gap-x-2 mb-6">
        <div class="text-[#E1E1E1]text-sm">Total</div>
        <div class="text-xl text-right font-medium">
          {{ currencyFormat(order?.orderTotalwithTax) }}
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import moment from "moment";

defineProps(["order", "timeline"]);
</script>
<style scoped>
input[type="range" i]:disabled {
  background-color: #2c2c2c !important;
  color: rgb(197, 197, 197);
}
</style>
