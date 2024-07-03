<template>
  <aside
    class="z-[9] bg-white relative py-5 border rounded-lg border-[#EAECF0] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] min-w-[245px]"
  >
    <nav class="">
      <ul class="grid grid-cols-1 gap-y-1">
        <li v-for="item in mappedNav" :key="item.name">
          <NuxtLink
            :to="item.url"
            class="text-sm flex items-center px-5 border-r-[3px] border-transparent font-medium hover:bg-[#2270FA0F] hover:text-primary-500 hover:border-primary-500"
            :activeClass="`${
              storeOpen ? '' : ' bg-[#2270FA0F] text-primary-500 block'
            }`"
          >
            <span class="flex items-center gap-x-[10px] flex-1 py-[9px]">
              <AppIcon :icon="item.icon" iconClass="text-xl text-[#667085]" />
              <span> {{ item.name }}</span>
            </span>
          </NuxtLink>
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
  return navigation.filter(i=>i.key !== 'sign-out').filter((i) =>
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
