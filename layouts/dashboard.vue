<template>
  <div
    class="flex flex-col gap-y-4 lg:gap-y-7 bg-[#F9FAFB] pb-2 min-h-screen max-w-screen"
  >
    <div class="w-full"><AppHeader :showlang="true" /></div>

    <div class="flex-1 flex flex-col w-full">
      <div class="flex gap-x-4 flex-1 container mb-6">
        <div class="hidden lg:inline">
          <DashboardLayoutSideComponent />
        </div>

        <div class="flex-1 min-h-[80vh] overflow-auto">
          <DashboardLayoutMainComponent />
        </div>
      </div>
      <div><AppFooter /></div>
    </div>
  </div>
</template>

<script setup>
import { getCompanyProfile } from "~/services/settingservices";
import { createcart, getcart } from "~/services/cartservice";

const cookie = useCookie("cart");
const authStore = useAuthStore();
const company = ref(null);
const router = useRouter();
onBeforeMount(() => {
  if (!authStore.isLoggedIn) {
    router.push("/");
  }
});

onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });
});
provide("company", company);
</script>
