<template>
  <div class="gap-y-4 flex flex-col">
    <!-- Top bar   -->
    <div class="p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="grid grid-cols-3 justify-between items-end">
        <div>
          <h1
            class="text-[48px] leading-[56px] text-matta-black col-span-1 font-medium capitalize mb-2"
          >
            {{ route.meta.title }}
          </h1>
          <p class="text-base">Add and manage your payment methods.</p>
        </div>
        <div />
        <div class="col-span-1 grid justify-end">
          <span class="p-5 rounded-lg bg-[#F1F3F5] w-[250px]"></span>
        </div>
      </div>
    </div>

    <!-- <PaymentDetail /> -->
  </div>
</template>

<script setup>

import { defineProps } from "vue";
import { useRoute } from "vue-router";
// import PaymentDetail from "./payments/PaymentDetail";

const route = useRoute();
defineProps(["title"]);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
