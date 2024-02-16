<template>
  <span
    :class="`px-[6px] py-1 text-xs rounded-full flex gap-x-1 items-center border max-w-max font-semibold ${Stats[status].className}`"
  >
    <AppIcon icon="octicon:dot-fill-24" />
    <span class=""> {{ Stats[status].text }}</span>
  </span>
</template>

<script setup>
import { defineProps } from "vue";
import AppIcon from "@/components/AppIcon";

const props = defineProps(["status", "type", "stattype"]);
const StatusClass = {
  0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  1: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  5: "text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]",
  3: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  4: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
  2: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
};

const StatusText = {
  0: {
    text: "Pending",
    className: StatusClass[0],
  },
  1: {
    text: props.type == "verdict" ? "Approved" : "Completed",
    className: StatusClass[1],
  },
  2: {
    text: "Rejected",
    className: StatusClass[4],
  },
  3: { text: "Completed" },
  className: StatusClass[3],
  4: {
    text: "Rejected",
    className: StatusClass[4],
  },
  5: {
    text: "Shipped",
    className: StatusClass[5],
  },
};
const OrderStatusText = {
  0: {
    text: "In cart",
    className: StatusClass[0],
  },
  1: {
    text: "Order created",
    className: StatusClass[0],
  },
  2: {
    text: "Payment confirmed",
    className: StatusClass[0],
  },
  3: {
    text: "Order received",
    className: StatusClass[5],
  },
  4: {
    text: "Order cancelled",
    className: StatusClass[4],
  },
  5: {
    text: "Refund complete",
    className: StatusClass[1],
  },
};
const ShippingStatusText = {
  0: {
    text: "Shipping in progress",
    className: StatusClass[0],
  },
  1: {
    text: "Delivered",
    className: StatusClass[1],
  },
};
const Stats = computed(() => {
  if (props.stattype === "shipping") {
    return ShippingStatusText;
  }
  if (props.stattype === "order") {
    return OrderStatusText;
  }
  return StatusText;
});
</script>
