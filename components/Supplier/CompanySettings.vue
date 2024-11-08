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
      isLoading.value = false;

      const { companyDocuments = [], ...companyProfile } = res.data.data;

      const formatDocuments = (documents) => {
        return documents.map((doc) => ({
          ...doc,
          urls: doc.urls.length > 0
            ? doc.urls.map((urlItem) => ({
                url: urlItem?.url || urlItem || "",
              }))
            : [{ url: doc.url || "" }],
        }));
      };
   
      const tempData = {
        ...companyProfile,
        companyDocuments: companyDocuments.length > 0
          ? formatDocuments(companyDocuments)
          : KybDocumentDefault,
      };

      companyInfo.value = tempData;
    

      if (companyDocuments.length > 0) {
        const formattedDocData = formatDocuments(companyDocuments);
        formData.kyb.companyDocuments =
          res.data.data.country.toLowerCase() === "nigeria"
            ? formattedDocData
            : formattedDocData.filter((doc) => [0, 4].includes(doc.documentType));
      }
    })
    .catch(() => {
      isLoading.value = false;
      // Consider adding error handling here, e.g., logging or notifying the user
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
