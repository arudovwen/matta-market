<template>
  <span
    :class="`px-[6px] py-1 text-xs rounded-full flex gap-x-1 items-center border max-w-max font-semibold ${StatusClass[status]}`"
  >
    <AppIcon icon="octicon:dot-fill-24" />
    <span class=""> {{ StatusText[status] }}</span>
  </span>
</template>

<script setup>
import { defineProps } from "vue";
import AppIcon from "@/components/AppIcon";

const props = defineProps(["status", "type"]);
const StatusClass = {
  0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  1: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  5: "text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]",
  3: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  4: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
  2: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
};

const StatusText = {
  0: "Pending",
  1: props.type == "verdict" ? "Approved" : "Completed",
  2: "Rejected",
  3: "Completed",
  4: "Rejected",
  5: "Shipped",
};
</script>
