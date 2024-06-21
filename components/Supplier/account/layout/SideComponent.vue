<template>
  <aside class="flex flex-col gap-y-2">
    <div
      class="bg-white py-6 px-8 rounded-lg flex items-center gap-x-4"
      v-if="company"
    >
      <div
        class="w-16 md:w-16 h-16 md:h-16 rounded-lg bg-white shadow p-4 flex items-center justify-center border border-[#E7EBEE]"
      >
         <img v-if="company.logo" class="" :src="company.logo" alt="logo" />
        <span class="uppercase" v-else>{{
          company.companyName.slice(0, 2)
        }}</span>
      </div>

      <div class="flex-1">
        <p
          class="font-medium text-sm md:text-base text-matta-black capitalize truncate max-w-[180px]"
        >
          {{ company.companyName }}
        </p>
        <p
          class="font-normal text-sm text-matta-black capitalize"
          v-if="company.state && company.country"
        >
          <i class="uil uil-map-marker"></i>
          {{ `${company.state} ${company.country}` }}
        </p>
        <p class="font-normal text-sm text-matta-black capitalize" v-else>
          <i class="uil uil-map-marker"></i>
          Not available
        </p>
      </div>
    </div>
    <nav class="bg-white py-6 px-8 rounded-lg">
      <ul>
        <li v-for="n in navigation" :key="n.title">
          <div
            v-if="
              n.role.includes(userType.toLowerCase()) &&
              n.accountType.includes(store.getters.loggedUser.accountType) &&
              n.allowed.includes(store.getters.loggedUser.roles[0])
            "
            class="py-4"
          >
            <span class="flex justify-between items-center py-1"
              ><h5 class="text-base text-matta-black font-medium">
                {{ n.title }}
              </h5>
              <span
                class="text-right text-lg"
                @click="handleIndex(n.title)"
                v-if="!openIndex.includes(n.title)"
                ><i class="uil uil-plus"></i
              ></span>
              <span
                class="text-right text-lg"
                @click="dropIndex(n.title)"
                v-if="openIndex.includes(n.title)"
                ><i class="uil uil-minus"></i></span
            ></span>
            <hr class="my-2" />
            <ul v-if="openIndex.includes(n.title)">
              <NuxtLink
                v-for="item in n.subs"
                :key="item.name"
                :to="item.url"
              >
                <li class="text-sm text-matta-black flex items-center">
                  <span class="flex-1 py-2">
                    <i class="uil uil-corner-down-right mr-2 hidden"></i>
                    <span>
                      {{
                        item.name.toLowerCase() === "company settings"
                          ? "Settings"
                          : item.name
                      }}</span
                    >
                  </span>
                  <span
                    class="h-[.25rem] w-[.25rem] hidden bg-primary-500 rounded-full"
                  ></span>
                </li>
              </NuxtLink>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup>
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const authstore = useAuthStore()
const company = inject("company");

const navigation = [
{
    title: "My Account",
    role: ["supplier", "buyer"],
    accountType: [0, 1],
    allowed: ["CompanyAdmin", "CompanyUser"],
    subs: [
      {
        name: "Settings",
        url: "/settings",
      },
      {
        name: "Notifications",
        url: "/account/notifications",
      },
      {
        name: "Saved Searches",
        url: "/account/saved-searches",
      },
    ],
  },
  {
    title: "Storefront",
    role: ["supplier"],
    accountType: [0, 1],
    allowed: ["CompanyAdmin"],
    subs: [
      {
        name: "Overview",
        url: "/overview",
      },
      {
        name: "Products",
        url: "/storefront/products",
      },
      {
        name: "Orders",
        url: "/storefront/orders",
      },
      {
        name: "Requests",
        url: "/storefront/requests",
      },
    ],
  },
  {
    title: "Procurement",
    role: ["supplier", "buyer"],
    allowed: ["CompanyAdmin", "CompanyUser"],
    accountType: [0, 1],
    subs: [
      {
        name: "My Orders",
        url: "/procurement/my-orders",
      },
      {
        name: "My Requests",
        url: "/procurement/my-requests",
      },

      // {
      //   name: "Payments",
      //   url: "/procurement/payment",
      // },
      {
        name: "Shipping Addresses",
        url: "/procurement/shipping-addresses",
      },
    ],
  },
  {
    title: "Company",
    role: ["supplier", "buyer"],
    allowed: ["CompanyAdmin"],
    accountType: [1],
    subs: [
      {
        name: "Company Settings",
        url: "/company/settings",
      },
      {
        name: "User Management",
        url: "/company/user-management",
      },
    ],
  },
  {
    title: "Wallet",
    role: ["supplier", "buyer"],
    allowed: ["CompanyAdmin", "CompanyUser"],
    accountType: [0, 1],
    subs: [
      {
        name: "Home",
        url: "/wallet/home",
      },
      {
        name: "Transactions",
        url: "/wallet/transactions",
      },
      {
        name: "Settings",
        url: "/wallet/settings",
      },
    ],
  },
];

const openIndex = ref([
  "Company",
  "Procurement",
  "My Account",
  "Storefront",
  "Wallet",
]);
const userType = computed(() => {
  return store.getters.userType;
});
function handleIndex(val) {
  openIndex.value.push(val);
}
function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}
</script>
<style scoped lang="scss">
.NuxtLink-active li span {
  .uil {
    display: inline;
  }

  span {
    font-weight: 500;
  }
  display: inline;
}
</style>
