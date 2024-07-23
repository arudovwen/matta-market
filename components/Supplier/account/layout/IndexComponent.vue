<template>
  <div class="lg:grid lg:grid-cols-4 gap-x-4 h-full" data-testid="index-component">
    <div class="col-span-1 h-full hidden lg:inline">
      <SideComponent />
    </div>
    <div class="lg:col-span-3 h-full">
      <div class=""><MainComponent /></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, provide } from "vue";
import SideComponent from "./SideComponent";
import MainComponent from "./MainComponent";
import { getCompanyProfile } from "~/services/settingservices";

const company = ref(null);

onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });
});

provide("company", company);
</script>
