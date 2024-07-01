<template>
  <div data-testid="account" class="bg-[#E7EBEE] p-4 lg:p-6 flex flex-col gap-y-2 min-h-screen">
    <OnboardingLayoutTopBar :active="active" />
    <div class="gap-x-2 flex flex-1 justify-center">
      <div class="w-[25%] rounded-lg hidden lg:block">
        <OnboardingCompanySideBar :active="active" />
      </div>
      <div class="w-full lg:w-[75%] bg-white rounded-lg">
        <OnboardingCompanyInformation v-if="active == 2" />
        <OnboardingCompanyDirectors v-if="active == 4" />
        <OnboardingCompanyProfile v-if="active == 1" />
        <OnboardingCompanyDocuments v-if="active == 3" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const active = ref(1);
const route = useRoute();
onMounted(() => {
  if (route?.query?.onboarding_stage) {
    active.value = route.query.onboarding_stage;
  }
});
watch(route, () => {
  active.value = route?.query?.onboarding_stage;
});
provide("active", active)
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
