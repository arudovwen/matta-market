<template>
  <div class="lg:grid lg:grid-cols-4 gap-x-4 h-full">
    <div class="col-span-1 hidden lg:inline">
      <DashboardLayoutSideComponent />
    </div>
    <div class="lg:col-span-3 h-full">
      <div class=""><DashboardLayoutMainComponent /></div>
    </div>
  </div>
</template>
<script setup>
import { getCompanyProfile } from "~/services/settingservices";

const company = ref(null);
onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });
});

provide("company", company);
</script>
