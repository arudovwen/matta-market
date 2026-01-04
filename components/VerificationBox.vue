<template>
  <div
    v-if="!mattaAuth?.onboardingStatus"
    class="px-5 py-[14px] bg-[#182230] rounded-[5px] flex flex-col lg:flex-row justify-between gap-y-5 lg:gap-y-0 lg:gap-x-40 relative mb-3"
  >
    <div class="flex items-center gap-x-4">
      <AppIcon icon="quill:info" iconClass="text-white text-2xl" />
      <p class="text-white text-sm max-w-[660px]">
        {{ route.name.includes("wallet") ? walletText : defaultText }}
      </p>
    </div>
    <div class="flex items-end">
      <a
        target="_blank"
        :href="`${validationUrl}/business-information`"
        class="w-full lg:w-auto"
        ><button
          class="px-8 py-[11px] rounded-[5px] bg-primary-500 hover:bg-primary/80 text-white text-sm whitespace-nowrap w-full lg:w-auto"
        >
          Add Company details
        </button></a
      >
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { getCompanyProfile } from "~/services/settingservices";

const mattaAuth = useEncryptedCookie(AUTH_COOKIE_NAME, defaultOptions);
const route = useRoute();
const isOpen = ref(false);
const detail = ref(null);
const authStore = useAuthStore();
const defaultText =
  "To use some of our features, we are required to verify your company registration information. Kindly proceed to provide your company details";
const walletText =
  "To request for a wallet, we are required to verifiy your company registration information. Kindly proceed to provide your company details";
onMounted(() => {
  getData();
});
function getData() {
  if (
    detail?.value?.companyName &&
    detail?.value?.email &&
    detail?.value?.phone
  )
    return;
  getCompanyProfile().then((res) => {
    detail.value = res.data.data;
    if (
      !res.data.data.companyName ||
      !res.data.data.email ||
      !res.data.data.phone
    ) {
      isOpen.value = true;
    }
  });
}
watch(route, () => {
  isOpen.value = false;
  getData();
});
</script>
