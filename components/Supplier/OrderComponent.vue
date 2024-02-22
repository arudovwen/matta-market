<template>
  <section class="flex flex-col gap-y-8" v-if="order">
    <div class="grid grid-cols-2 gap-y-10 gap-x-4 mb-8">
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">amount</p>
        <span class="text-sm">{{ currencyFormat(order.orderTotalwithTax) }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">status</p>
        <AppStatusButton :status="order.status" stattype="order" />
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">Order date</p>
        <span class="text-sm">{{ moment(order.orderDate).format("ll") }}</span>
      </div>
      <div v-if="order?.schedulePickupDate">
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">
          scheduled pickup date
        </p>
        <span class="text-sm">{{
          moment(order.schedulePickupDate || "").format("ll")
        }}</span>
      </div>
      <div>
        <p class="text-[12px] text-[#B6B7B9] mb-1 capitalize">
          scheduled delivery date
        </p>
        <span class="text-sm">{{
          moment(order.scheduleDeliveryDate).format("ll")
        }}</span>
      </div>
    </div>

    <div class="bg-[#182230] rounded-lg p-6 text-white">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Order Summary</h3>
        <!-- <span><i class="uil uil-minus text-lg"></i></span> -->
      </div>

      <div v-for="(item, id) in order.orderDetails" :key="id">
        <div class="flex justify-between items-end gap-x-2 mb-1">
          <div class="text-[#E1E1E1] pt-1 flex items-end text-sm">
            <span>
              <span class="text-sm font-medium">{{
                item.product
              }}</span>
              <br />
              <span class="text-xs flex gap-x-3 text-[#98A2B3]"
                ><span>{{ item.selectedPackage }}</span>
                <span>x{{ item.quantity }}</span></span
              >
            </span>
          </div>
          <span class="text-right">{{ currencyFormat(item.itemTotal) }}</span>
        </div>
        <div
          class="flex justify-between items-end gap-x-2 border-b pb-6 border-[#ddd] mb-4"
        >
          <div class="text-matta-black pt-1 flex items-end text-sm">
            <span class="flex gap-x-2">
              <span class="text-xs text-[#98A2B3]">With Tax</span>

              <!-- <span class="text-xs"
                ><span>{{ item.taxPercentage }}%</span>
              </span> -->
            </span>
          </div>
          <span class="text-right">{{
            currencyFormat(item.itemTotal_with_tax)
          }}</span>
        </div>
      </div>
      <div class="flex justify-between gap-x-2">
        <div class="text-[#E1E1E1] text-sm">Item total</div>
        <div class="text-right py-1">
          {{ currencyFormat(order.orderTotal) }}
        </div>
      </div>
      <div class="flex justify-between gap-x-2">
        <div class="text-sm text-[#E1E1E1]">Tax <span class="text-xs">(7.5%)</span></div>
        <div class="text-right py-1">
          {{ currencyFormat(order.orderTotalwithTax - order.orderTotal) }}
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
          {{ currencyFormat(order.orderTotalwithTax) }}
        </div>
      </div>
    </div>
    <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black">
      <div class="flex justify-between mb-6">
        <h3 class="text-lg font-medium">Timeline</h3>
        <span><i class="uil uil-minusext-lg"></i></span>
      </div>

      <ul class="grid grid-cols-1 gap-4">
        <li v-for="(item, id) in timeline" :key="id" class="group">
          <div class="py-4 items-center hidden group-last:flex">
            <span class="bg-matta-black h-[2px] rounded-l flex-1"></span>
            <span class="h-4 w-4 rounded-full bg-matta-black"></span>
          </div>
          <div
            class="flex justify-start items-center gap-x-2 opacity-50 group-last:opacity-100"
          >
            <span
              class="group-last:bg-primary-500 group-last:text-white w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
            >
              <i class="uil uil-check"></i>
            </span>
            <!-- <span
          :class="
            stage > 2
              ? ''
              : stage == 2
              ? ' bg-primary-500 text-white'
              : stage < 2
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
        >
          <i class="uil uil-map-marker"></i>
        </span> -->
            <!-- <span
          :class="
            stage > 3
              ? ''
              : stage == 3
              ? ' bg-primary-500 text-white'
              : stage < 3
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
        >
          <i class="uil uil-dollar-alt"></i>
        </span> -->
            <!-- <span
          :class="
            stage > 4
              ? ''
              : stage == 4
              ? ' bg-primary-500 text-white'
              : stage < 4
              ? 'bg-white text-matta-black'
              : ''
          "
          class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
        >
          <i class="uil uil-refresh"></i>
        </span> -->
            <span>
              <span class="text-xs text-[#ABABAB]"
                >{{ moment(item.activityDate).format("ll") }},
                {{ item.activityTime }}</span
              >
              <br />
              <span class="text-xs"
                ><span>{{ item.description }}</span></span
              >
            </span>
          </div>
        </li>
      </ul>
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
