<template>
  <NuxtLoadingIndicator :throttle="0" color="#1570ef" />
  <NuxtLayout v-if="!AppLoading">
    <!-- <NuxtPwaManifest /> -->
    <NuxtPage />
  </NuxtLayout>
  <div v-else class="flex items-center justify-center w-screen h-screen">
    <AppLoaderV2 />
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive, provide } from "vue";
import { useRoute } from "vue-router";
import { useCookie } from "#app";
import { getnotifications } from "./services/notificationservice";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { useMarketStore } from "~/stores/markets";
import { useApplicationStore } from "~/stores/applications";
import { getMarkets, getTechLevels } from "~/services/productservices";
import { getSubApps, getBusinessType } from "~/services/userservices";

const authStore = useAuthStore();
const cartStore = useCartStore();
const store = useMarketStore();
const appStore = useApplicationStore();
const AppLoading = ref(false);
const notifications = ref([]);
const notificationOpen = ref(false)
const notificationsInterval = ref(null);
const route = useRoute();
const query = reactive({
  PageNumber: 1,
  PageSize: 200,
});
const currentCurrency = ref("");

const isMattaSignup = getItem("isMattaSignup");

const getAllMarkets = () => {
  getMarkets(query).then((res) => {
    if (res.status === 200) {
      store.setMarkets(res.data.data);
    }
  });
};

const getAllApplications = () => {
  getTechLevels(query).then((res) => {
    if (res.status === 200) {
      appStore.setApplications(res.data.data);
    }
  });
};

const getAppList = () => {
  getSubApps({ isDisabled: false }).then((res) => {
    if (res.status === 200) {
      const appList = res.data.data
        .map((i) => ({
          ...i,
          url: `${i.url}/auth/validate?token=${encodeURIComponent(
            authStore.jwToken
          )}&code=${encodeURIComponent(authStore.refreshToken)}`,
        }))
        .filter((i) => !["matta"].includes(i.name.toLowerCase()));
      const appInfo = res.data.data.find(
        (i) => i.name.toLowerCase() === "matta"
      );
      authStore.setAppInfo(appInfo);
      authStore.setAppList(appList);
    }
  });
};

const getBusinessUserType = () => {
  AppLoading.value = true;

  getBusinessType()
    .then((res) => {
      if (res.status === 200) {
        authStore.setLoggedUser({
          ...authStore.userInfo,
          businessUserType: res.data?.data?.businessUserType,
        });
        AppLoading.value = false;
      }
    })
    .catch(() => {
      if (isMattaSignup) {
        navigateTo("/user-type");
      }
      AppLoading.value = false;
    });
};

const getNotifications = () => {
  getnotifications({
    userId: authStore.userId,
    businessId: authStore.businessId,
  })
    .then((res) => {
      if (res.status === 200) {
        notifications.value = res.data.data || [];
      } else {
        console.error("Failed to load notifications");
      }
    })
    .catch((error) => {
      console.error("Error fetching notifications:", error);
    });
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    clearInterval(notificationsInterval.value); // Stop fetching notifications if tab is not visible
  } else {
    // Restart fetching notifications when tab becomes visible
    notificationsInterval.value = setInterval(getNotifications, 15000);
  }
};

// Fetch notifications on component mount
onMounted(() => {
  getAllApplications();
  getAllMarkets();
  getAppList();

  if (authStore.isLoggedIn) {
    // Start the notifications interval only when the tab is visible
    notificationsInterval.value = setInterval(getNotifications, 15000);

    // Listen for visibility change events
    document.addEventListener("visibilitychange", handleVisibilityChange);

    getBusinessUserType();
  }

  const cookie = useCookie("googtrans");
  if (window?.navigator) {
    cookie.value = languages[navigator.language];
  }

  cartStore.getMyCart();
});

// Clear interval and remove event listener on unmount
onUnmounted(() => {
  clearInterval(notificationsInterval.value);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});

provide("currentCurrency", currentCurrency);
provide("notifications", notifications);
provide("getNotifications", getNotifications);
provide("notificationOpen", notificationOpen);
watch(
  () => route.fullPath,
  () => {
    if (isMattaSignup && authStore?.isLoggedIn && !authStore?.userType) {
      navigateTo("/user-type");
    }
  }
);
</script>

<style>
html {
  scroll-behavior: smooth;
  box-sizing: border-box;
}
body {
  font-family: "Onest", sans-serif;
  color: #344054;
}
.light-mode {
  @apply text-[#344054] bg-white;
}

.recommended .carousel__viewport .carousel__track {
  column-gap: 24px;
  @media (max-width: 768px) {
    column-gap: 16px;
  }
  @media (max-width: 465px) {
    column-gap: 10px;
  }
  .carousel__prev {
    left: -26px !important;
  }
  .carousel__next {
    right: -26px !important;
  }
}
.carousel__viewport .carousel__track {
  column-gap: 34px;
  @media (max-width: 768px) {
    column-gap: 16px;
  }
  @media (max-width: 465px) {
    column-gap: 10px;
  }
}
.carousel__prev {
  left: -26px !important;
}
.carousel__next {
  right: -26px !important;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 8px;
  height: 100px;
}

::-webkit-scrollbar:horizontal {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track:horizontal {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb:horizontal {
  background: #ececec;
  width: 50px;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  opacity: 0.9;
}
label,
.input-label {
  color: #344054 !important;
  font-size: 14px;
}
</style>
