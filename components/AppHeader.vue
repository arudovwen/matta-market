<template>
  <!-- <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="flex justify-start items-center gap-x-6 py-2 container"
      role="alert"
    >
      <div class="message font-bold">
        <span v-if="$pwa.offlineReady"> App ready to work offline </span>
        <span v-else>
          New content available, click on reload button to update.
        </span>
      </div>
      <div class="flex items-center gap-x-6">
        <button
          class="btn btn-sm bg-primary-500 text-white text-sm px-3 py-2"
          v-if="$pwa.needRefresh"
          @click="$pwa.updateServiceWorker()"
        >
          Reload
        </button>
        <button class="btn-sm text-sm" @click="$pwa.cancelPrompt()">
          Close
        </button>
      </div>
    </div>
    <div
      v-if="
        $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
      "
      class="flex justify-start items-center gap-x-6 py-2 container"
      role="alert"
    >
      <div class="font-bold text-sm">
        <span> Install Matta?</span>
      </div>
      <div class="flex gap-x-4">
        <button
          class="btn btn-sm bg-primary-500 text-white text-sm px-3 py-2"
          @click="$pwa.install()"
        >
          Install
        </button>
        <button class="btn-sm text-sm" @click="$pwa.cancelInstall()">
          Cancel
        </button>
      </div>
    </div>
  </ClientOnly> -->
  <div class="bg-[#1849A9] text-xs sm:text-sm py-3">
    <div class="container flex gap-x-2 items-center text-white font-normal">
      <AppIcon icon="gravity-ui:seal-percent" iconClass="text-lg" /> <span>Get N50,000
      off when you sign up and make your first purchase. &nbsp; Use the code
      <span
        v-clipboard="'MATTA25'"
        @click="toast.success('Copied')"
        class="md:border md:border-white rounded-[4px] md:px-1 md:py-[2px] cursor-pointer font-semibold md:font-bold text-xs"
        >MATTA25</span
      >
      on checkout</span>
    </div>
  </div>

  <nav
    :class="{
      relative: view.atTopOfPage,
      'sticky top-0 opacity-95 fade-in-top pb-5 lg:pb-5 border-b border-[rgba(242, 242, 242, 1)] darks:border-gray-900':
        !view.atTopOfPage,
    }"
    class="relative pt-6 pb-6 w-full bg-white darks:bg-gray-800 z-[999] transition-all duration-500 ease-in-out"
  >
    <div class="container mx-auto">
      <div class="flex justify-between items-center gap-x-5">
        <div class="logo flex gap-x-10 items-center">
          <NuxtLink to="/">
            <img
              src="/images/logo.png"
              alt="Matta"
              class="w-20 md:w-[100px] h-auto object-contain"
          /></NuxtLink>

          <ul class="lg:flex items-center gap-x-6 hidden">
            <li
              v-for="n in navigations"
              :key="n.name"
              class="flex gap-x-[6px] items-center text-sm border-transparent group"
              :class="`${
                currentRoute?.name?.toLowerCase() == n?.name?.toLowerCase()
                  ? 'border-[#165EF0]'
                  : ''
              }`"
            >
              <Menu
                v-if="!n.url"
                v-slot="{ open }"
                as="div"
                class="relative inline-block text-left"
              >
                <MenuButton
                  :id="n.name"
                  class="flex gap-x-1 items-center group-hover:text-[#165EF0]"
                >
                  {{ n.name }}
                  <AppIcon
                    :icon="
                      open
                        ? 'pepicons-pencil:angle-up'
                        : 'pepicons-pencil:angle-down'
                    "
                /></MenuButton>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="z-[999] grid grid-cols-1 absolute left-0 mt-[22px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[303px] origin-top-right bg-white darks:bg-gray-800 rounded-b-[10px] px-5 py-5 text-sm"
                  >
                    <div class="" v-for="cat in handleDropDown(n.key)">
                      <MenuItem v-slot="{ active }">
                        <NuxtLink
                          v-if="n.key !== 'finance'"
                          :to="`/category/${
                            n.key === 'markets' ? 'market' : 'application'
                          }/${encodeURIComponent(cat.title.toLowerCase())}/${
                            cat.id
                          }`"
                        >
                          <button
                            :class="[
                              'group flex w-full items-center rounded-md px-[14px] py-[11px] text-sm hover:bg-[rgba(22,94,240,0.09)] whitespace-nowrap gap-x-2 text-[#333] ',
                            ]"
                          >
                            <AppIcon
                              v-if="
                                n.key === 'markets' || n.key === 'applications'
                              "
                              :icon="`fa6-solid:${cat.imagePath}`"
                            />
                            {{ cat.title }}
                          </button>
                        </NuxtLink>
                        <button
                          v-else
                          :class="[
                            'group flex w-full items-center rounded-md px-[14px] py-[11px] text-sm hover:bg-[rgba(22,94,240,0.09)] whitespace-nowrap gap-x-2 text-[#333] ',
                          ]"
                        >
                          <AppIcon
                            v-if="
                              n.key === 'markets' || n.key === 'applications'
                            "
                            :icon="`fa6-solid:${cat.imagePath}`"
                          />
                          {{ cat.title }}
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
              <NuxtLink :to="n.url" v-else>
                <span class="cursor-pointer hover:text-[#165EF0]">
                  {{ n.name }}</span
                >
              </NuxtLink>
            </li>
            <li
              class="flex gap-x-[6px] items-center text-sm border-transparent group"
            >
              <NuxtLink
                to="/request-product"
                class="flex gap-x-1 items-center group-hover:text-[#165EF0]"
              >
                Request a product</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-x-2 text-sm">
          <!-- <span
            :class="{
              'hidden md:flex': view.atTopOfPage,
              'hidden md:hidden': !view.atTopOfPage,
            }"
            class="gap-x-1 items-center"
          >
             <img
              src="~/assets/images/nigeria.svg"
              width="20"
              height="20"
              alt="Matta"
              class="w-5 h-auto"
            />
            NGN</span
          > -->
          <!--   <span
            :class="{
              'md:flex ': view.atTopOfPage,
              'md:hidden': !view.atTopOfPage,
            }"
            class="hidden gap-x-1 items-center"
          >
            <AppIcon class="text-lg" icon="ion:globe-outline" />
            <select class="appearance-none outline-none text-sm bg-transparent">
              <option value="">English-NGN</option>
            </select></span
          > -->
          <!-- <NuxtLink
            :class="` items-center  relative ${
              authStore.isLoggedIn ? 'flex' : 'hidden md:flex'
            }`"
          >
            <span
              class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center"
            >
              <AppIcon
                class="text-lg text-[#484848]"
                icon="akar-icons:search"
              />
            </span>
          </NuxtLink> -->
          <!-- <span
            v-if="authStore.isLoggedIn"
            :class="` items-center  relative ${
              authStore.isLoggedIn ? 'flex' : 'hidden md:flex'
            }`"
            @click="isOpen = true"
          >
            <span
              class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center cursor-pointer"
            >
              <AppIcon
                class="text-lg text-[#484848]"
                icon="mingcute:message-2-line"
              />
              <span
                v-if="unreadnotifications > 0"
                class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
                >{{ unreadnotifications }}</span
              >
            </span> -->
          <!-- </span> -->
          <span class="hidden lg:inline text-sm">
            <GoogleTranslateSelect
              :fetch-browser-language="false"
              trigger="click"
              @select="handleGoogleTranslateSelect"
            />
          </span>
          <NuxtLink to="/cart" class="flex items-center relative">
            <span
              class="relative h-8 w-8 rounded-full bg-[#F7F7F7] flex items-center justify-center"
            >
              <AppIcon
                class="text-lg text-[#484848]"
                icon="lucide:shopping-cart"
              />
              <span
                v-if="cartStore?.cartTotal > 0"
                class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
                >{{ cartStore?.cartTotal }}</span
              >
            </span>
            <!-- <span class="text-xs sm:text-sm font-medium inline-flex text-[#333]"
              >Cart</span
            > -->
          </NuxtLink>

          <div class="flex gap-x-3 ml-3">
            <AppButton
              v-if="!authStore.isLoggedIn"
              link="/auth/login"
              text="Log in"
              btnClass="text-[#475467] !px-4 !sm:px-6 !py-[6px] !font-semibold text-xs sm:!text-base hidden md:flex"
            />

            <AppButton
              v-if="!authStore.isLoggedIn"
              link="/auth/vendor-register"
              text="Become a Supplier"
              btnClass="!text-[12px] sm:!text-sm text-white  !font-semibold !px-[15px] !py-[6px] !normal-case bg-primary-500 flex"
            />

            <Menu
              as="div"
              class="relative hidden lg:inline-flex text-left"
              v-if="authStore.isLoggedIn"
            >
              <div>
                <MenuButton
                  id="myaccount"
                  class="bg-[#165EF0] text-white rounded-[5px] px-[24px] py-[9px] flex gap-x-1 items-center font-semibold"
                >
                  My account <AppIcon icon="mdi:chevron-down" class="text-lg" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right rounded-[5px] border border-[#F6F6F6] bg-white darks:bg-gray-800 z-[99] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]"
                >
                  <div
                    class="flex items-center gap-x-2 px-[15px] pt-3 pb-[14px] border-b border-[#F4F4F4]"
                  >
                    <div
                      class="h-8 w-8 rounded-full flex items-center justify-center text-sm text-white bg-[#f90] font-semibold"
                    >
                      {{ authStore.userInfo?.firstName.slice(0, 1) }}
                      {{ authStore.userInfo?.lastName.slice(0, 1) }}
                    </div>
                    <div class="flex-1">
                      <span
                        class="text-[#333] text-[13px] font-semibold block capitalize"
                        >{{ authStore.userInfo?.fullName }}</span
                      >
                      <span
                        class="block text-[11px] text-[#666] darks:text-white/70 truncate max-w-[151px]"
                        >{{ authStore.userInfo?.email }}</span
                      >
                    </div>
                  </div>
                  <div class="px-[15px] pt-[14px] pb-5 flex-1">
                    <ul class="grid gap-y-3 text-[#555] darks:text-white/80">
                      <li v-for="n in filteredMenu" :key="n.name" class="">
                        <MenuItem v-slot="{ active }">
                          <NuxtLink :to="n.url" v-if="n.key !== 'sign-out'">
                            <button
                              class="flex gap-x-3 items-center text-[13px] font-medium text-[#555]"
                            >
                              <AppIcon :icon="n.icon" /> {{ n.name }}
                            </button>
                          </NuxtLink>
                          <button
                            v-else
                            @click="isSigniningOut = true"
                            class="flex gap-x-3 items-center text-[13px] font-medium"
                          >
                            <AppIcon :icon="n.icon" /> {{ n.name }}
                          </button>
                        </MenuItem>
                      </li>
                    </ul>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <span class="lg:hidden" @click="open = true">
              <AppIcon icon="ci:menu-alt-01" class="text-[30px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="z-[999]" v-if="open">
    <AppSideMenu />
  </div>

  <ModalCenter v-if="isSigniningOut">
    <template #default>
      <div class="bg-white p-6 sm:pb-4 rounded-lg" v-if="isSigniningOut">
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">Sign Out</h4>
          <!-- <i
            class="uil uil-times cursor-pointer text-lg"
            @click="isSigniningOut = false"
          ></i> -->
        </div>

        <p class="text-sm text-matta-black mb-2">
          Are you sure you want to sign out?
        </p>

        <div class="flex justify-between gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="isSigniningOut = false"
            class="appearance-none border min-w-[140px] w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="logOut"
            class="appearance-none border min-w-[140px] w-1/2 border-primary-500 leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
          >
            Yes
          </button>
        </div>
      </div>
    </template>
  </ModalCenter>
  <ModalSide :isOpen="isOpen" @togglePopup="openModal" v-if="isOpen">
    <template #content>
      <div class="h-full md:w-[480px] bg-white rounded-lg p-6 lg:p-10">
        <NotificationComponent />
      </div>
    </template>
  </ModalSide>
</template>
<script setup>
import { ref } from "vue";
import {
  categories,
  navigations,
  mobileNavigation,
  financeMenu,
  mobileMenu,
} from "~/utils/data";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { logOut } from "~/services/authservices";
import { getnotification } from "@/services/notificationservice";
import GoogleTranslateSelect from "@google-translate-select/vue3";
import { toast } from "vue3-toastify";

const handleGoogleTranslateSelect = (language) => {
  console.log(language);
};
const isOpen = ref(false);
function openModal() {
  isOpen.value = !isOpen.value;
}
const { $pwa } = useNuxtApp();
const isSigniningOut = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();
const appStore = useApplicationStore();
const store = useMarketStore();
const notifications = ref([]);
const router = useRouter();
const { currentRoute } = router;
const filteredMenu = computed(() =>
  mobileMenu.filter(
    (i) =>
      i.key === "account-settings" ||
      i.key === "wallet-home" ||
      i.key === "sign-out" ||
      i.key === "procurement-my-orders"
  )
);
const view = ref({
  atTopOfPage: true,
});
const open = ref(false);
onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});

onMounted(() => {
  if (authStore.isLoggedIn) {
    getNotifications();
    setInterval(() => {
      getNotifications();
    }, 2 * 60 * 1000);
  }
  geoFindMe();
});
const notifyParams = reactive({
  PageNumber: 1,
  PageSize: 30,
  BusinessId: authStore?.businessId,
  UserId: authStore.userId,
  Role: "",
});
const unreadnotifications = computed(() => {
  return notifications?.value?.filter((i) => !i.isViewed)?.length;
});
function getNotifications() {
  getnotification(notifyParams).then((res) => {
    notifications.value = res.data.data;
  });
}

function handleScroll() {
  // when the user scrolls, check the pageYOffset
  if (window.pageYOffset > 500) {
    // user is scrolled
    if (view.value.atTopOfPage) view.value.atTopOfPage = false;
  } else {
    // user is at top of page
    if (!view.value.atTopOfPage) view.value.atTopOfPage = true;
  }
}
function handleDropDown(val) {
  if (val === "markets") {
    return store?.marketsData;
  }
  if (val === "applications") {
    return appStore?.applicationsData;
  }
  if (val === "finance") {
    return financeMenu;
  }
}
watch(currentRoute, () => {
  open.value = false;
});

provide("getNotifications", getNotifications);
provide("notifications", notifications);
provide("unreadnotifications", unreadnotifications);
provide("open", open);
provide("isOpen", isSigniningOut);
</script>
<style lang="scss">
nav {
  .NuxtLink-active.NuxtLink-exact-active {
    color: #165ef0;
  }
}
/* Add the transition class for slide-down effect */
.fade-in-top {
  -webkit-animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2023-11-20 13:54:55
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-top
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.fade-out-top {
  -webkit-animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2023-11-20 13:57:36
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-out-top
 * ----------------------------------------
 */
@-webkit-keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
@keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
