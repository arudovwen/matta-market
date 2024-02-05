<template>
  <aside
    class="z-[9999] bg-white h-screen relative py-5 border-r border-[#EAECF0] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] min-w-[245px]"
  >
    <div class="logo mb-7 px-5">
      <NuxtLink to="/">
        <img
          src="/images/logo.png"
          alt="Matta"
          class="w-20 md:w-[100px] h-auto object-contain"
      /></NuxtLink>
    </div>
    <nav class="h-full">
      <ul class="grid grid-cols-1 gap-y-1">
        <li v-for="item in mappedNav" :key="item.name">
          <NuxtLink
            v-if="item.key !== 'storefront'"
            :to="item.url"
            class="text-sm flex items-center px-5 border-r-[3px] border-transparent font-medium hover:bg-[#2270FA0F] hover:text-primary-500 hover:border-primary-500"
            :activeClass="`${
              storeOpen
                ? ''
                : ' bg-[#2270FA0F] text-primary-500 block'
            }`"
          >
            <span class="flex items-center gap-x-[10px] flex-1 py-[9px]">
              <AppIcon :icon="item.icon" iconClass="text-xl text-[#667085]" />
              <span> {{ item.name }}</span>
            </span>
          </NuxtLink>
          <span
            v-else
            @click="storeOpen = true"
            class="text-sm flex items-center px-5 border-r-[3px] border-transparent group font-medium hover:bg-[#2270FA0F] hover:text-primary-500 hover:border-primary-500 cursor-pointer"
            :class="` ${storeOpen ||  route.path.includes('storefront') ? 'bg-[#2270FA0F] text-primary-500' : ''}`"
         
          >
            <span class="flex items-center gap-x-[10px] flex-1 py-[9px]">
              <AppIcon :icon="item.icon" iconClass="text-xl text-[#667085]" />
              <span> {{ item.name }}</span>
            </span>
            <div
              v-if="storeOpen"
              class="border-r border-[#EAECF0] absolute top-0 -right-[245px] h-screen z-[9999] bg-white py-8 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] min-w-[245px]"
            >
              <ul>
                <li v-for="item in subnavigation" :key="item.name">
                  <NuxtLink
                    :to="item.url"
                    class="text-sm flex items-center px-5 border-r-[3px] border-transparent text-matta-black hoverborder-primary-500 hover:bg-[#2270FA0F] hover:text-primary-500"
                  >
                    <span
                      class="flex items-center gap-x-[10px] flex-1 py-[9px]"
                    >
                      <AppIcon :icon="item.icon" iconClass="text-xl" />
                      <span> {{ item.name }}</span>
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </span>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup>
import { getVendorInfo } from "~/services/userservices";

const route = useRoute();
const storeOpen = ref(false);
const authStore = useAuthStore();
const formValues = reactive({
  storeUrl: "",
});
onMounted(() => {
  getVendorInfo().then((res) => {
    formValues.storeSlug = res.data.data.storeSlug;
  });
});
const authstore = useAuthStore();

const mappedNav = computed(() => {
  return navigation.filter((i) =>
    (authStore?.userType?.toLowerCase() === "supplier"
      ? vendorRoutes
      : buyerRoutes
    ).includes(i.key)
  );
});
const openIndex = ref([
  "Company",
  "Procurement",
  "My Account",
  "Storefront",
  "Wallet",
]);
// const userType = computed(() => {
//   return authstore.userType;
// });
// function handleIndex(val) {
//   openIndex.value.push(val);
// }
// function dropIndex(val) {
//   openIndex.value = openIndex.value.filter((i) => i !== val);
// }

watch(
  () => route.path,
  () => {
    storeOpen.value = false;
  },
  { deep: true, immediate: true }
);
</script>
<style scoped lang="scss"></style>
