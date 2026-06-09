<template>
  <aside
    class="z-[9] bg-white relative py-5 border rounded-lg border-[#EAECF0] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] min-w-[245px]"
  >
    <nav class="">
      <ul class="grid grid-cols-1 gap-y-1">
        <li v-for="item in mappedNav" :key="item.name">
          <NuxtLink
            :to="item.isDisabled ? '' : item.url"
            v-tippy="item.isDisabled ? { content: 'Complete KYC to access page', trigger: 'click' } : false"
            @click="item.isDisabled ? $event.preventDefault() : null"
            :class="[
              'text-sm flex items-center px-5 border-r-[3px] font-medium',
              item.isDisabled ? 'opacity-60 cursor-not-allowed border-transparent text-gray-400' : 'border-transparent hover:bg-[#2270FA0F] hover:text-primary-500'
            ]"
            :activeClass="item.isDisabled ? '' : 'bg-[#2270FA0F] text-primary-500 !border-primary-500'"
            :external="item.external"
            :target="item.external ? '_blank' : '_self'"
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
  return navigation
    .filter((i) => i.key !== "sign-out")
    .filter((i) =>
      (authStore?.userType?.toLowerCase() === "supplier"
        ? vendorRoutes
        : buyerRoutes
      ).includes(i.key)
    ).map(j=> ({
      ...j,
      // isDisabled: ['products','storefront'].includes(j.key)
    }));
});

watch(
  () => route.path,
  () => {
    storeOpen.value = false;
  },
  { deep: true, immediate: true }
);
</script>
<style scoped lang="scss"></style>
