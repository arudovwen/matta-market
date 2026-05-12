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
    // "nuxt-ssr-cache",
    "@vite-pwa/nuxt",
    "@nuxt/test-utils/module",
    "@zadigetvoltaire/nuxt-gtm",
    // '@nuxtjs/critters',
    //   'nuxt-purgecss',
  ],
  gtm: {
    id: "GTM-M7KP6CJG",
    enabled: true,
    debug: false,
  },
  security: {
    hidePoweredBy: false,
    xssValidator: true,
    ssg: {
      hashScripts: false,
      hashStyles: false,
    },
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      contentSecurityPolicy: {
        // Form submissions
        "form-action": [
          "'self'",
          "https://www.facebook.com",
          "https://www.google.com",
          "https://*.matta.trade",
        ],

        // Scripts — self, Facebook, and all Google services
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://*.matta.trade",
          // Google Tag Manager
          "https://www.googletagmanager.com",
          // Google Analytics / gtag.js
          "https://www.google-analytics.com",
          "https://ssl.google-analytics.com",
          // Google Ads & Conversion tracking
          "https://www.googleadservices.com",
          "https://googleads.g.doubleclick.net",
          // Google APIs (Maps, Translate, etc.)
          "https://maps.googleapis.com",
          "https://translate.google.com",
          "https://translate.googleapis.com",
          "https://translate-pa.googleapis.com",
          // Facebook Pixel
          "https://connect.facebook.net",
          // IP Geolocation (already in head)
          "https://cdn.jsdelivr.net",
          // Microsoft Clarity
          "https://www.clarity.ms",
          "https://scripts.clarity.ms",
          // Monnify SDK
          "https://sdk.monnify.com",
          // FontAwesome
          "https://kit.fontawesome.com",
          // Hotjar
          "https://static.hotjar.com",
          // Amplitude
          "https://cdn.amplitude.com",
          // PostHog
          "https://us-assets.i.posthog.com",
        ],

        // XHR / fetch / WebSocket connections
        "connect-src": [
          "'self'",
          // Matta APIs
          "https://*.matta.trade",
          // Google Analytics & GTM
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://stats.g.doubleclick.net",
          "https://www.googletagmanager.com",
          "https://www.google.com",
          // Google Ads
          "https://www.googleadservices.com",
          "https://googleads.g.doubleclick.net",
          // Facebook
          "https://www.facebook.com",
          "https://mpc-prod-25-s6uit34pua-wl.a.run.app", // Facebook/Google event processing
          "https://demo-1.conversionsapigateway.com", // FB CAPI Gateway
          // GeoJS IP Lookup
          "https://get.geojs.io",
          // Iconify API fallback (icons not found in local @iconify-json bundles)
          "https://api.iconify.design",
          "https://api.simplesvg.com",
          "https://api.unisvg.com",
          // Monnify API
          "https://*.monnify.com",
          "https://*.sdk.monnify.com",
          // Hotjar
          "https://*.hotjar.com",
          "https://*.hotjar.io",
          "wss://*.hotjar.com",
          // FontAwesome
          "https://ka-f.fontawesome.com",
          // Amplitude
          "https://cdn.amplitude.com",
          "https://api2.amplitude.com",
          // Google Translate
          "https://translate.googleapis.com",
          "https://translate-pa.googleapis.com",
          // PostHog
          "https://us.i.posthog.com",
          "https://app.posthog.com",
          "https://us-assets.i.posthog.com",
        ],

        // Images (pixel tracking beacons etc.)
        "img-src": [
          "'self'",
          "data:",
          "https:",
          // Matta
          "https://*.matta.trade",
          "https://res.cloudinary.com",
          "https://matta.s3.us-east-1.amazonaws.com",
          // Google tracking pixels
          "https://www.google-analytics.com",
          "https://www.googletagmanager.com",
          "https://www.google.com",
          "https://googleads.g.doubleclick.net",
          "https://www.googleadservices.com",
          // Facebook pixel
          "https://www.facebook.com",
          "https://mpc-prod-25-s6uit34pua-wl.a.run.app",
          "https://demo-1.conversionsapigateway.com",
        ],

        // iFrames (GTM tag preview, Google Ads conversion, reCAPTCHA)
        "frame-src": [
          "'self'",
          "https://*.matta.trade",
          "https://www.googletagmanager.com",
          "https://td.doubleclick.net",
          "https://www.google.com",
          "https://www.youtube.com",
          "https://www.facebook.com",
          "https://*.facebook.net",
          "https://*.facebook.com",
          // Monnify checkout
          "https://*.monnify.com",
          "https://*.sdk.monnify.com",
        ],

        // Web fonts
        "font-src": [
          "'self'",
          "data:",
          "https://fonts.gstatic.com",
          "https://unicons.iconscout.com",
          "https://ka-f.fontawesome.com",
        ],

        // Stylesheets
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://unicons.iconscout.com",
          "https://www.gstatic.com",
          "https://ka-f.fontawesome.com",
        ],

        "upgrade-insecure-requests": true,
      },
      xFrameOptions: "deny",
    },
  },

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

  ssr: true,
  spaLoadingTemplate: true,
  routeRules: {},

  googleSignIn: {
    clientId:
      "56799988480-4d51egljupar9la4djc2tknjodn2vsj5.apps.googleusercontent.com",
  },
  css: [
    "vue-toastification/dist/index.css",
    "vue3-carousel/dist/carousel.css",
    "@programic/vue3-tooltip/dist/index.css",
    "@google-translate-select/theme-chalk/dist/index.css",
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
    registerType: "prompt",
    manifest: {
      name: "Matta trade",
      short_name: "Matta",
      description: "Africa's Leading B2B Marketplace for chemicals and materials",
      theme_color: "#1570EF",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      icons: [
        {
          src: "/icons/android-icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
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
        {
          src: "/icons/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
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
          innerHTML: JSON.stringify({
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
          innerHTML: JSON.stringify({
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
          innerHTML: JSON.stringify({
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
          innerHTML: JSON.stringify({
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
        {
          src: "https://cdn.jsdelivr.net/npm/@iplookup/geocode/iplookup.min.js",
          type: "text/javascript",
          defer: true, // Defer loading until after the HTML is parsed
        },
      ],

      __dangerouslyDisableSanitizersByTagID: {
        "ld-json": ["innerHTML"],
      },
    },
  },

  compatibilityDate: "2025-02-22",
  nitro: {
    baseURL: "/",
    prerender: {
      crawlLinks: true,
      failOnError: false, // Don't crash if one route fails
    },
    compressPublicAssets: true,
    minify: true,
  },

  experimental: {
    payloadExtraction: true,
    inlineSSRStyles: false, // Better to have separate CSS for caching
    renderJsonPayloads: true,
  },

  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // Group common heavy libraries
              if (id.includes("apexcharts") || id.includes("vue3-apexcharts")) return "vendor-charts";
              if (id.includes("tinymce")) return "vendor-editor";
              if (id.includes("pdf-viewer") || id.includes("vue-pdf") || id.includes("pdfjs")) return "vendor-pdf";
              if (id.includes("moment")) return "vendor-moment";
              if (id.includes("iconify") || id.includes("heroicons") || id.includes("fa")) return "vendor-icons";
              if (id.includes("swiper")) return "vendor-swiper";
              if (id.includes("headlessui")) return "vendor-headless";
              if (id.includes("vee-validate") || id.includes("yup") || id.includes("vuelidate")) return "vendor-forms";
              
              // Everything else from node_modules goes to vendor
              return "vendor";
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "pinia"],
    },
  },
});
