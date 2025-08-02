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
useHead(
  {
    script: [
      {
        src: "https://sdk.monnify.com/plugin/monnify.js",

        defer: true,
      },
      {
        src: "https://kit.fontawesome.com/c1a534ffdb.js",
        crossorigin: "anonymous",
        defer: true,
      },
      {
        innerHTML: `!function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");
        else{var r=function(e,t){e.prototype[t]=function(){return this._q.push(
          {name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){
            e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e._q.push({name:t,args:Array.prototype.slice.call(n,0)})},i=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))};o(e,t,Array.prototype.slice.call(arguments))}},a=function(e){for(var t=0;t<g.length;t++)i(e,g[t],!1);for(var n=0;n<m.length;n++)i(e,m[n],!0)};n.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-Gzu/3zjG7uZ1G0TIW6BIGIzZHB61u7328yVnZUz4t1dNE/n/dSnABKbOJ+jw6Bnu",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.5.2-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(u,c);for(var l=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],d=0;d<p.length;d++)r(l,p[d]);n.Identify=l;for(var f=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],y=0;y<v.length;y++)r(f,v[y]);n.Revenue=f;var g=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],m=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];a(n),n.createInstance=function(e){return n._iq[e]={_q:[]},a(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();
amplitude.init('662bcea7400aa949c2cbbd4e0a9fa5c9', {
  defaultTracking: true,
});`,
        type: "text/javascript",
        defer: true,
        crossorigin: "anonymous",
      },

      {
        innerHTML: `
            (function (h, o, t, j, a, r) {
              h.hj = h.hj || function () {
                (h.hj.q = h.hj.q || []).push(arguments);
              };
              h._hjSettings = { hjid: 3748112, hjsv: 6 };
              a = o.getElementsByTagName("head")[0];
              r = o.createElement("script");
              r.async = 1;
              r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
              a.appendChild(r);
            })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
          `,
        type: "text/javascript",
        crossorigin: "anonymous",
        defer: true,
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://unicons.iconscout.com/release/v4.0.0/css/line.css",
      },
    ],
  },
  {
    mode: "client", // Load the script 'strict-dynamically' on client-side only
  }
);
import { useMarketStore } from "~/stores/markets";
import { useApplicationStore } from "~/stores/applications";
import { getMarkets, getTechLevels } from "~/services/productservices";
import { getSubApps, getBusinessType } from "~/services/userservices";

const { encrypt } = useEncryption();
const isMattaSignup = getItem("isMattaSignup");
const AppLoading = ref(false);
const cartStore = useCartStore();
const store = useMarketStore();
const authStore = useAuthStore();
const appStore = useApplicationStore();
const currencyStore = useCurrencyStore();
const currentCurrency = ref(currencyStore.defaultCurrency);
const route = useRoute();
const query = reactive({
  PageNumber: 1,
  PageSize: 200,
});
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

function getAppList() {
  getSubApps().then((res) => {
    if (res.status === 200) {
      const appList = res.data.data
        .map((i) => ({
          ...i,
          url: `${i.url}/auth/validate?token=${encodeURIComponent(
            encrypt(authStore.jwToken)
          )}&code=${encodeURIComponent(encrypt(authStore.refreshToken))}`,
        }))
        .filter((i) => !["matta"].includes(i.name.toLowerCase()));
      const appInfo = res.data.data.find(
        (i) => i.name.toLowerCase() === "matta"
      );
      authStore.setAppInfo(appInfo);
      authStore.setAppList(appList);
    }
  });
}
function getBusinessUserType() {
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
}
onMounted(() => {
  getAllApplications();
  getAllMarkets();
  getAppList();

  if (authStore.userInfo) {
    getBusinessUserType();
  }
  const cookie = useCookie("googtrans");
  if (window?.navigator) {
    cookie.value = languages[navigator.language];
  }

  cartStore.getMyCart();
});
provide("currentCurrency", currentCurrency);
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
