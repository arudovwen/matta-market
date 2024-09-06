<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <HeaderComponent title="Company settings" />
    <!-- Top bar   -->
    <div class="py-10">
      <Stepper
        :tabs="tabs"
        :pending="!!authStore?.userInfo?.onboardingPageStatus"
        :complete="!!companyInfo?.approvalStatus"
      />
    </div>
    <div v-if="!isLoading">
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
    <AppLoader v-if="isLoading" />
  </div>
</template>

<script setup>
import { getCompanyProfile } from "~/services/settingservices";

const authStore = useAuthStore();
const companyInfo = ref(null);
const isLoading = ref(true);
function getData() {
  getCompanyProfile()
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;

        const tempData = {
          ...res.data.data,
          companyDocuments: res.data.data?.companyDocuments?.map((doc) => ({
            ...doc,
            urls: !doc.urls.length
              ? [
                  {
                    url: doc.url || "",
                  },
                ]
              : doc.urls.map((i) => ({
                  url: i?.url ?? i ?? "",
                })),
          })),
        };

        companyInfo.value = tempData;
    
      }
    })
    .catch((err) => {
    
      isLoading.value = false;
    });
}
onBeforeMount(() => {
  getData();
});
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
provide("companyInfo", companyInfo);
provide("getData", getData);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
