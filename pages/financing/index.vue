<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] border border-[#F4F7FE] px-6"
  >
    <!-- Top bar   -->

    <HeaderComponent title="Financing" className=" mb-6 !px-0">
      <template #subtext>
        <p class="text-sm text-[#475467]">
          Request for financing for your business.
          <NuxtLink to="/finance"
            ><span class="text-primary-500 font-medium"
              >Learn more</span
            ></NuxtLink
          >
        </p>
      </template>
      <template #button>
        <Menu class="relative" as="div">
          <MenuButton
            id="request"
            class="shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] font-semibold outline-none !px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm rounded-lg border border-primary-500 flex items-center gap-x-1"
          >
            <AppIcon icon="humbleicons:plus" /> Request <span class="hidden lg:inline">Financing</span>
          </MenuButton>
          <MenuItems
            class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[180px] rounded-xl overflow-hidden flex flex-col"
          >
            <MenuItem
              v-for="n in FinancesOptions.filter((i) => i.value !== '')"
              :key="n.title"
              class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap capitalize"
            >
              <span
                class="cursor-pointer"
                @click="navigateTo(handleRouting(n.url))"
              >
                {{ n.label }}
              </span>
            </MenuItem>
          </MenuItems>
        </Menu>
      </template>
    </HeaderComponent>
    <!-- <AppTab :tabs="tabs" className="px-[30px]" /> -->
    <div>
    <div class="">
      <ActiveLoans  />
     
      <PendingLoans />
    </div>
   
    </div>
  </div>
</template>
<script setup>
  import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import ActiveLoans from "./active-loans";
import PendingLoans from "./pending-loans";
import AppIcon from "@/components/AppIcon";

const active = ref("requests");
const tabs = [
  {
    title: "requests",
    key: "requests",
  },
  {
    title: "active loans",
    key: "active loans",
  },
];
const FinancesOptions = [
  {
    label: "all finance",
    key: "all",
    value: "",
  },
  {
    label: "trade finance",
    key: 0,
    value: 0,
    url: "/financing/requests/trade/0",
  },
  {
    label: "supply finance",
    key: 1,
    value: 1,
    url: "/financing/requests/supply/1",
  },
  {
    label: "import finance",
    key: 2,
    value: 2,
    url: "/financing/requests/import/2",
  },
  {
    label: "export finance",
    key: 3,
    value: 3,
    url: "/financing/requests/export/3",
  },
];
const handleRouting = (url) => {
    // if (!authStore.userInfo.onboardingPageStatus) {
    //   toast.info("Complete your KYB before you proceed");
    //   return `/company/settings?redirected_from=${url}`;
    // }
    return url;
  }
provide("active", active);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
