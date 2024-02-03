<template>
  <aside class="flex flex-col min-w-[245px]">
    <nav
      class="bg-white py-[11px] rounded-[10px] border border-[#F4F7FE] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]"
    >
      <ul>
        <li v-for="item in mappedNav" :key="item.name">
          <NuxtLink
            :to="item.url"
            class="text-sm flex items-center px-5 border-r-[3px] border-transparent"
            activeClass="!border-primary-500 bg-[#2270FA0F] text-primary-500 block"
          >
            <span class="flex items-center gap-x-[10px] flex-1 py-[9px]">
              <AppIcon :icon="item.icon" iconClass="text-xl" />
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
const userType = computed(() => {
  return authstore.userType;
});
function handleIndex(val) {
  openIndex.value.push(val);
}
function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}
</script>
<style scoped lang="scss"></style>
