<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <HeaderComponent title="Company settings" />
    <!-- Top bar   -->
    <div class="py-10">
      <Stepper :tabs="tabs" />
    </div>
    <div>
      <div v-if="active === 1">
        <OnboardingCompanyInformation />
      </div>
      <div v-if="active === 2">
        <div><OnboardingCompanyDocuments /></div>
      </div>
      <div v-if="active === 3">
        <div><OnboardingCompanyDirectors /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCompanyProfile } from "@/services/settingservices";
const companyInfo = ref(null)
onBeforeMount(()=>{
  getCompanyProfile().then(res=>{
    if(res.status === 200){
      companyInfo.value = res.data.data
    }
  })
})
const active = ref(1);
const tabs = [
  {
    name: "Company details",
    value: 1,
  },
  {
    name: "Documents",
    value: 2,
  },
  {
    name: "Directors",
    value: 3,
  },
];
provide("active", active);
provide("companyInfo",companyInfo)
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
