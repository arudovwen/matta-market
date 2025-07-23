export default defineNuxtConfig({
  site: {
    url: "https://matta.trade",
  },

  nitro: {
    baseURL: "/",
    prerender: {
      crawlLinks: true,
    },
  },

  image: {
    inject: true,
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
    // "nuxt-swiper",
    "@nuxt/image",
    // "nuxt-security",
    "@nuxt/devtools",
    // "nuxt-ssr-cache",
    // "@vite-pwa/nuxt",
    "@nuxt/test-utils/module",
    "@zadigetvoltaire/nuxt-gtm",
    // "@nuxtjs/critters",
    // "nuxt-purgecss",
  ],
  gtm: {
    id: "GTM-M7KP6CJG",
    enabled: false,
    debug: false,
  },
  // security: {
  //   hidePoweredBy: false,
  //   headers: {
  //     crossOriginEmbedderPolicy: "unsafe-none",
  //     contentSecurityPolicy: {
  //       "img-src": [
  //         "'self'",
  //         "https:",
  //         "data:",
  //         "https://gateway.matta.trade",
  //         "https://res.cloudinary.com",
  //         "https://matta.s3.us-east-1.amazonaws.com",
  //       ],
  //       "script-src": [
  //         "'self'",
  //         "https:",
  //         "'unsafe-inline'",
  //         "'strict-dynamic'",
  //         "'nonce-{{nonce}}'",
  //       ],
  //       "upgrade-insecure-requests": true,
  //     },
  //     xFrameOptions: "deny",
  //   },
  // },

  // cache: {
  //   useHostPrefix: false,
  //   pages: ["/"],
  //   store: {
  //     type: "memory",
  //     max: 100,
  //     ttl: 60,
  //   },
  // },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      APP_BASE_URL: process.env.APP_BASE_URL,
      APP_MONNIFYAPIKEY: process.env.APP_MONNIFYAPIKEY,
      APP_MONNIFYCONTRACTCODE: process.env.APP_MONNIFYCONTRACTCODE,
      APP_MONNIFYISTEST: process.env.APP_MONNIFYISTEST,
      APP_MONNIFYISTESTMODE: process.env.APP_MONNIFYISTESTMODE,
      TINY_MCE: process.env.APP_TINYMCE_KEY,
      APP_ID: process.env.APP_ID,
      APP_CODE: process.env.APP_CODE,
      encryptionKey: process.env.ENCRYPTION_KEY,
    },
  },

  ssr: false,
  spaLoadingTemplate: true,
  routeRules: {
    "/finance": { redirect: "/" },
  },

  googleSignIn: {
    clientId:
      "56799988480-4d51egljupar9la4djc2tknjodn2vsj5.apps.googleusercontent.com",
  },
  css: [
    "vue-toastification/dist/index.css",
    "vue3-carousel/dist/carousel.css",
    "@programic/vue3-tooltip/dist/index.css",
    "~/assets/css/tailwind.css",
    "~/assets/scss/_button.scss",
    "~/assets/scss/_form.scss",
    "~/assets/scss/style.scss",
  ],

  googleFonts: {
    families: {
      Onest: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  },

  devtools: { enabled: process.env.NODE_ENV === "development" },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Matta trade",
      short_name: "Matta",
      theme_color: "#1570EF",
      display: "standalone",
      icons: [
        {
          src: "/icons/android-icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
      ],
      screenshots: [
        {
          src: "/shot2.png",
          type: "image/png",
          sizes: "436x720",
          form_factor: "narrow",
        },
        {
          src: "/shot1.png",
          type: "image/png",
          sizes: "1280x686",
          form_factor: "wide",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
  },

  app: {
    head: {
      title: "Matta - Africa's Leading B2B Marketplace for chemicals",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        // Primary Meta
        {
          hid: "description",
          name: "description",
          content:
            "Matta is a B2B platform offering a comprehensive, detailed marketplace for sourcing chemicals and materials efficiently and reliably",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Matta, Chemicals, Business, materials, manufacturers, producers, importers, raw materials, supplier",
        },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#1570EF" },

        // Open Graph (Facebook/LinkedIn)
        {
          hid: "og:title",
          property: "og:title",
          content: "Matta - Africa's Leading B2B Marketplace",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Matta is a B2B platform offering a comprehensive, detailed marketplace for sourcing chemicals and materials efficiently and reliably",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://matta.trade/images/logo.png",
        },
        { hid: "og:url", property: "og:url", content: "https://matta.trade" },
        { hid: "og:type", property: "og:type", content: "website" },

        // Twitter Meta
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Matta - Africa's Leading B2B Marketplace",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Matta is a B2B platform offering a comprehensive, detailed marketplace for sourcing chemicals and materials efficiently and reliably",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://matta.trade/images/logo.png",
        },
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "canonical", href: "https://matta.trade" },
        {
          rel: "alternate",
          hreflang: "en",
          href: "https://matta.trade",
        },
        {
          rel: "preload",
          href: "https://res.cloudinary.com/arudovwen-me/image/upload/f_webp/c_scale,h_600/xddierf8sf3w2gn1csau.jpg",
          as: "image",
        },
      ],

      script: [
        {
          hid: "ld-json-organization",
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Matta",
            url: "https://matta.trade",
            logo: "https://matta.trade/images/logo.png",
            sameAs: [
              "https://www.linkedin.com/company/matta-trade",
              "https://twitter.com/matta-trade",
            ],
            description:
              "Matta is Africa’s leading online B2B platform for chemicals and materials.",
          }),
        },
        {
          hid: "ld-json-about",
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Matta",
              url: "https://corporate.matta.trade",
              logo: "https://matta.trade/images/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/matta-trade",
                "https://twitter.com/matta-trade",
              ],
              description:
                "Matta is Africa’s leading B2B platform for buying and selling chemicals and raw materials.",
            },
          }),
        },
        {
          hid: "ld-json-contact",
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "Organization",
              name: "Matta",
              url: "https://matta.trade/request-product",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                areaServed: "NG",
                availableLanguage: ["English"],
              },
            },
          }),
        },
        {
          hid: "ld-json-product",
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Hot deals",
            image: ["https://matta.trade/images/products/acetone.jpg"],
            description: "Hot deals suitable for chemical manufacturing.",
            sku: "ACETONE-12345",
            brand: {
              "@type": "Brand",
              name: "Best Sellers",
            },
            offers: {
              "@type": "Offer",
              url: "https://matta.trade/category/market/Hot%20deals?tag=hotdeals",
              priceCurrency: "NGN",
              price: "120.00",
            },
          }),
        },
      ],

      __dangerouslyDisableSanitizersByTagID: {
        "ld-json": ["innerHTML"],
      },
    },
  },

  compatibilityDate: "2025-02-22",
});
