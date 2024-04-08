<template>
  <NuxtLayout>
    <NuxtPwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
  box-sizing: border-box;
}
body {
  font-family: "Manrope", sans-serif;
  color: #333333;
}

.dark-mode {
  @apply text-white bg-gray-800;
}

.light-mode {
  @apply text-[#333] bg-white;
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
body::-webkit-scrollbar,
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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

<script setup>
useHead(
  {
    title: "Matta - Africa's Leading B2B Marketplace for chemicals",
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Matta is an online B2B platform that serves as a detailed and comprehensive market place for chemicals and materials. We aggregate demand from manufacturers, and supply from producers and importers into a single market place, creating an eco-system that ensures constant supply of essential raw materials within the economy. We also provide the necessary financial incentives and vehicles to aid the processes of supplier manufacturing, Importation and procurement.",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Matta - Africa's Leading B2B Marketplace",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Matta is an online B2B platform that serves as a detailed and comprehensive market place for chemicals and materials. We aggregate demand from manufacturers, and supply from producers and importers into a single market place, creating an eco-system that ensures constant supply of essential raw materials within the economy. We also provide the necessary financial incentives and vehicles to aid the processes of supplier manufacturing, Importation and procurement.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://matta.trade/img/3.png",
      }, // Add OG image URL
      // Twitter Tags
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "https://matta.trade/img/3.png",
      }, // Use 'summary_large_image' for large images
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Matta - Africa's Leading B2B Marketplace",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Matta is an online B2B platform that serves as a detailed and comprehensive market place for chemicals and materials. We aggregate demand from manufacturers, and supply from producers and importers into a single market place, creating an eco-system that ensures constant supply of essential raw materials within the economy. We also provide the necessary financial incentives and vehicles to aid the processes of supplier manufacturing, Importation and procurement.",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "URL to your Twitter image",
      }, // Add Twitter image URL
      {
        name: "keywords",
        content:
          "Matta, Chemicals, Business, materials, manufacturers, producers, importers, raw materials, supplier",
      }, // Add relevant keywords
      { name: "author", content: "Success Ahon" }, // Add author information
      { name: "robots", content: "index, follow" }, // Control search engine indexing
      { name: "theme-color", content: "#165EF0" }, // Set the theme color for mobile browsers
    ],
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
        src: "https://www.googletagmanager.com/gtag/js?id=G-295L8F9LEF",
        crossorigin: "anonymous",
        defer: true,
      },
      {
        innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-295L8F9LEF");
          `,
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

import AOS from "aos";
import "aos/dist/aos.css";

const store = useMarketStore();
const appStore = useApplicationStore();
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
onMounted(() => {
  AOS.init();
  getAllApplications();
  getAllMarkets();
});
</script>
