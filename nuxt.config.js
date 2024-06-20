// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: "https://matta.trade",
  },
  nitro: {
    baseURL: "/",
    prerender: {
      crawlLinks: true,
      // failOnError: false,
    },
  },
  image: {
    inject: true,
    cloudinary: {
      baseURL: "https://res.cloudinary.com/arudovwen-me/image/upload/",
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-vue3-google-signin",
    "nuxt-simple-sitemap",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-swiper",
    "@nuxt/image",
    "nuxt-security",
    "@nuxt/devtools",
		"@nuxt/test-utils/module"
  ],
  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
      contentSecurityPolicy: {
        "base-uri": ["'none'"],
        "font-src": ["'self'", "https:", "data:"],
        "img-src": [
          "'self'",
          "https:",
          "data:",
          "http://localhost:3000",
          "https://dev.gateway.matta.trade",
          "https://res.cloudinary.com",
        ],
        "object-src": ["'none'"],
        "script-src-attr": ["'self'", "https:", "'unsafe-inline'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
        ],
      },
      xFrameOptions: "deny",
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      APP_MONNIFYAPIKEY: process.env.APP_MONNIFYAPIKEY,
      APP_MONNIFYCONTRACTCODE: process.env.APP_MONNIFYCONTRACTCODE,
      APP_MONNIFYISTEST: process.env.APP_MONNIFYISTEST,
      APP_MONNIFYISTESTMODE: process.env.APP_MONNIFYISTESTMODE,
    },
  },
  ssr: true,
  plugins: [],
  // @ts-ignore
  googleSignIn: {
    clientId:
      "56799988480-4d51egljupar9la4djc2tknjodn2vsj5.apps.googleusercontent.com",
  },
  colorMode: {
    classSuffix: "",
  },
  css: [
    "~/assets/scss/_button.scss",
    "~/assets/scss/_form.scss",
    "vue-toastification/dist/index.css",
    "vue3-carousel/dist/carousel.css",
    "~/assets/scss/style.scss",
  ],
  googleFonts: {
    families: {
      Manrope: [100, 200, 300, 400, 500, 600, 700, 800], // Enable the IntManropeer font
    },
  },
  devtools: { enabled: true },
  app: {
    head: {
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
          crossorigin: "anonymous",
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
  },
});
