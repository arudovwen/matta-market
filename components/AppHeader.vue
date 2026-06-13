<template>
  <section class="bg-white">
    <DealBanner />

    <nav
      :class="{
        relative: view?.atTopOfPage,
        'sticky top-0 opacity-95 fade-in-top pb-5 lg:pb-5 border-b border-[rgba(242, 242, 242, 1)] darks:border-gray-900':
          !view?.atTopOfPage,
      }"
      class="relative w-full py-4 transition-all duration-500 ease-in-out bg-white md:py-6 darks:bg-gray-800"
    >
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center logo gap-x-10">
            <NuxtLink to="/">
              <NuxtImg
                src="/images/marketplace.png"
                alt="Matta"
                class="w-20 md:w-[150px] h-auto object-contain"
            /></NuxtLink>
          </div>
          <div class="max-w-[600px] w-full flex-1 hidden lg:block">
            <NavSearchBar />
          </div>

          <div class="flex items-center text-sm gap-x-4">
            <span class="flex items-center text-sm gap-x-4 md:hidden">
              <span class="text-sm"><CurrencyChanger /></span>
              <span class="hidden text-sm lg:inline">
                <!-- <GoogleTranslateSelect
                  :fetch-browser-language="false"
                  :languages="availableLanguages"
                  trigger="click"
                  @select="handleLanguageSelect"
                /> -->
              </span>

              <button
                type="button"
                aria-label="cart"
                @click="navigateTo('/cart')"
                class="relative flex items-center"
              >
                <span
                  class="relative h-9 w-9 rounded-full bg-[#F7F7F7] flex items-center justify-center"
                >
                  <AppIcon
                    class="text-base md:text-lg text-[#484848]"
                    icon="lucide:shopping-cart"
                  />
                  <ClientOnly>
                    <span
                      v-if="cartStore?.cartTotal > 0"
                      class="w-3 h-3 rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute top-[4px] right-[4px]"
                      >{{ cartStore?.cartTotal }}</span
                    >
                  </ClientOnly>
                </span>
              </button>
            </span>
            <AppButton
              type="button"
              @click="navigateTo('/request-product')"
              text="Request a product"
              btnClass="text-[#475467] !mr-4 !px-4 !sm:px-6 !py-[7px] !font-semibold text-xs sm:!text-sm !normal-case  hidden md:flex border border-primary-500/10 !bg-primary-500/10"
            />
            <div
              class="flex-none order-0 flex-grow-0 h-[36px] w-[36px] flex justify-center items-center bg-gray-100 rounded-[50%]"
            >
              <AppMenu />
            </div>
            <div class="flex gap-x-3">
              <AppButton
                v-if="!authStore?.isLoggedIn"
                type="button"
                @click="handleRouting('login')"
                text="Log in"
                btnClass="text-[#475467] !px-4 !sm:px-6 !py-[7px] !font-semibold text-xs sm:!text-base hidden md:flex"
              />

              <AppButton
                v-if="!authStore?.isLoggedIn"
                type="button"
                @click="handleRouting('register')"
                text="Sign up"
                btnClass="!text-[12px] sm:!text-sm text-white  hidden lg:block !font-semibold !px-[15px] !py-[6px] !normal-case bg-primary-500 flex"
              />

              <Menu
                as="div"
                class="relative hidden text-left lg:inline-flex"
                v-if="authStore?.isLoggedIn"
              >
                <div>
                  <MenuButton
                    id="myaccount"
                    class="bg-[#1570EF] text-white rounded-[5px] px-[24px] py-[9px] flex gap-x-1 items-center font-semibold whitespace-nowrap"
                  >
                    My account
                    <AppIcon icon="mdi:chevron-down" class="text-lg" />
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
                      <span
                        class="h-8 w-8 rounded-full flex items-center justify-center text-white bg-[#f90] font-semibold"
                      >
                        <NuxtImg
                          v-if="authStore.userInfo?.profilepic"
                          alt="avatar"
                          class="w-8 h-8 rounded-full"
                          :src="authStore.userInfo?.profilepic"
                        />
                        <span v-else>{{ getUserInitials }}</span>
                      </span>
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
                    <div class="px-2 pt-[14px] pb-5 flex-1">
                      <ul
                        class="grid gap-y-0.5 text-[#555] darks:text-white/80"
                      >
                        <li v-for="n in ProfileMenu" :key="n.name" class="">
                          <MenuItem v-slot="{ active }">
                            <NuxtLink
                              :to="n.url"
                              v-if="n.key !== 'sign-out'"
                              :external="n.external"
                              :target="n.external ? '_blank' : '_self'"
                            >
                              <button
                                class="flex w-full px-2 py-1 gap-x-3 items-center rounded text-[13px] font-medium text-[#555] hover:bg-primary-500/10"
                              >
                                <AppIcon :icon="n.icon" /> {{ n.name }}
                              </button>
                            </NuxtLink>

                            <button
                              v-else
                              @click="isSigniningOut = true"
                              class="flex w-full px-2 py-1 gap-x-3 items-center rounded text-[13px] font-medium text-[#555] hover:bg-primary-500/10"
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

    <hr class="border-[rgba(242, 242, 242, 1)] my-1" />
    <nav
      :class="{
        relative: view?.atTopOfPage,
        'sticky top-0 opacity-95 fade-in-top pb-5 lg:pb-5  darks:border-gray-900':
          !view?.atTopOfPage,
      }"
      class="relative w-full pt-4 pb-6 transition-all duration-500 ease-in-out bg-white darks:bg-gray-800"
    >
      <div class="container mx-auto">
        <div class="flex items-center justify-between gap-x-5">
          <div class="flex items-center logo gap-x-10">
            <ul class="items-center hidden lg:flex gap-x-6">
              <li
                v-for="n in navigations.filter((i) => i.key !== 'sign-out')"
                :key="n.name"
                class="flex gap-x-[6px] items-center text-sm border-transparent group"
                :class="`${
                  currentRoute?.name?.toLowerCase() == n?.name?.toLowerCase()
                    ? 'border-[#1570EF]'
                    : ''
                }`"
              >
                <Menu
                  v-if="!n.url || n.url === '#'"
                  v-slot="{ open }"
                  as="div"
                  class="relative inline-block text-left"
                >
                  <MenuButton
                    :id="n.name"
                    class="flex gap-x-1 items-center group-hover:text-[#1570EF]"
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
                      class="grid grid-cols-1 absolute left-0 mt-[22px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[303px] origin-top-right bg-white darks:bg-gray-800 rounded-b-[10px] px-5 py-5 text-sm z-[80]"
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
                                  n.key === 'markets' ||
                                  n.key === 'applications'
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
                  <span class="cursor-pointer hover:text-[#1570EF]">
                    {{ n.name }}</span
                  >
                </NuxtLink>
              </li>
              <li
                class="flex gap-x-[6px] items-center text-sm border-transparent group"
              >
                <NuxtLink
                  to="/request-product"
                  activeClass="text-[#1570EF] font-medium"
                  class="flex gap-x-1 items-center group-hover:text-[#1570EF]"
                >
                  Request a product</NuxtLink
                >
              </li>
              <li
                class="flex gap-x-[6px] items-center text-sm border-transparent group"
              >
                <a
                  target="_blank"
                  href="https://corporate.matta.trade"
                  activeClass="text-[#165EF0] font-medium"
                  class="flex gap-x-1 items-center group-hover:text-[#165EF0] cursor-pointer"
                >
                  About Us</a
                >
              </li>
            </ul>
          </div>
          <div class="flex items-center gap-x-[10px] text-sm"></div>
        </div>
        <div class="max-w-[600px] w-full flex-1 lg:hidden">
          <NavSearchBar />
        </div>
      </div>
    </nav>

    <div class="" v-if="open">
      <AppSideMenu />
    </div>

    <ModalCenter v-if="isSigniningOut">
      <template #default>
        <div class="p-6 bg-white rounded-lg sm:pb-4" v-if="isSigniningOut">
          <div class="flex items-center justify-between mb-5">
            <h4 class="text-xl font-medium text-matta-black">Sign Out</h4>
          </div>

          <p class="mb-2 text-sm text-matta-black">
            Are you sure you want to sign out?
          </p>

          <div class="flex items-center justify-between mt-8 gap-x-2">
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
    <LazyModalAuth goToUrl="/checkout" />
  </section>

  <template v-if="notificationOpen"
    ><LazyMobileNotificationComponent
  /></template>
</template>
<script setup>
import { ref } from "vue";
import { financeMenu } from "~/utils/data";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { logOut } from "~/services/authservices";

defineProps({
  showlang: {
    default: false,
  },
});
const windowWidth = ref(
  window?.innerWidth ||
    document?.documentElement?.clientWidth ||
    document?.body?.clientWidth ||
    0,
);

// Use Google Translate composable
const { availableLanguages, handleLanguageSelect } = useGoogleTranslate();

const isOpen = ref(false);

const isSigniningOut = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();
const appStore = useApplicationStore();
const store = useMarketStore();
const notificationOpen = inject("notificationOpen", ref(false));
const isAuthOpen = ref(false);
const router = useRouter();
const { currentRoute } = router;
const filteredMenu = computed(() =>
  navigation.filter(
    (i) =>
      i.key === "settings" ||
      i.key === "procurement-my-orders" ||
      i.key === "sign-out" ||
      i.key === "wallet-home",
  ),
);
const view = ref({
  atTopOfPage: true,
});

const open = ref(false);
import { onBeforeUnmount } from "vue";

onBeforeMount(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", getWindowSize);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", getWindowSize);
  }
});

function handleScroll() {
  // when the user scrolls, check the pageYOffset
  if (window?.pageYOffset > 500) {
    // user is scrolled
    if (view.value.atTopOfPage) view.value.atTopOfPage = false;
  } else if (!view.value.atTopOfPage) view.value.atTopOfPage = true;
}

function getWindowSize() {
  windowWidth.value =
    window?.innerWidth ||
    document?.documentElement?.clientWidth ||
    document?.body?.clientWidth;
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
const getUserInitials = computed(() => {
  const firstNameInitial = authStore.userInfo?.firstName?.slice(0, 1) || "";
  const lastNameInitial = authStore.userInfo?.lastName?.slice(0, 1) || "";
  return `${firstNameInitial}${lastNameInitial}`;
});
watch(currentRoute, () => {
  open.value = false;
});

provide("open", open);
provide("isOpen", isSigniningOut);
provide("authOpen", isAuthOpen);
provide("action", null);
provide("handleProceed", null);
provide("handleOrderRequest", null);
</script>
<style lang="scss">
nav {
  .NuxtLink-active.NuxtLink-exact-active {
    color: #1570ef;
  }
}
/* Add the transition class for slide-down effect */
.fade-in-top {
  -webkit-animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

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
