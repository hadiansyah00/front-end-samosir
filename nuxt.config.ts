import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  // GLOBAL CSS
  css: [
    "~/assets/css/input.css",
    "~/assets/css/transitions.css",
    "remixicon/fonts/remixicon.css",
    "~/assets/css/nprogress.css",
  ],

  // ALLOWED IMAGES
  image: {
    domains: ["apps.samosirtour.id"],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // MODULES
  modules: ["@pinia/nuxt", "nuxt-simple-sitemap"],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  // ==============================================
  // 🔐 RUNTIME CONFIG (AMAN UNTUK GA & MAPS)
  // ==============================================
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrlBase: process.env.NUXT_PUBLIC_API_URL_BASE,

      // Google Analytics ID
      gaId: "G-27F5TW7S6G",

      // Google Maps API Key
      googleMapsKey: "AIzaSyXXXXX-xxxxxxxxxxxxxxxxxxxx",
    },
  },

  // ==============================================
  // 🌐 DEFAULT META & OG IMAGE
  // ==============================================
  app: {
    head: {
      title: "Samosir Tour – Rental Mobil & Paket Wisata Samosir",

      meta: [
        {
          name: "description",
          content:
            "Samosir Tour menyediakan layanan rental mobil dan paket wisata Samosir & Danau Toba terbaik.",
        },

        // OG TAGS
        { property: "og:title", content: "Samosir Tour" },
        {
          property: "og:description",
          content:
            "Rental Mobil & Paket Wisata Samosir dengan pelayanan profesional.",
        },
        {
          property: "og:image",
          content: "https://samosirtour.id/logo_samosir.png", // 🔥 buat file ini di /public
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://samosirtour.id" },

        // TWITTER CARD
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Samosir Tour" },
        {
          name: "twitter:description",
          content:
            "Rental Mobil & Paket Wisata Samosir dengan layanan terbaik.",
        },
        {
          name: "twitter:image",
          content: "https://samosirtour.id/logo_samosir.png",
        },
      ],

      // ==============================================
      // 📊 GOOGLE ANALYTICS (gtag)
      // ==============================================
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-27F5TW7S6G",
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-27F5TW7S6G', { send_page_view: true });
          `,
        },

        // ==============================================
        // 🗺 GOOGLE MAPS JAVASCRIPT API
        // ==============================================
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_MAPS_API_KEY || "AIzaSyXXXXX"
          }&libraries=places`,
          async: true,
          defer: true,
        },
      ],
    },
  },

  // ==============================================
  // 🗺 SITEMAP CONFIG
  // ==============================================
  sitemap: {
    siteUrl: "https://samosirtour.id",
    urls: [
      "/",
      "/tentang-kami",
      "/daftar-mobil-dan-harga",
      "/paket-wisata-samosir",
      "/galleri",
      "/artikel",
    ],
    autoLastmod: true,
  },

  // ==============================================
  // 📡 FETCH DINAMIS UNTUK SITEMAP
  // ==============================================
  nitro: {
    hooks: {
      "sitemap:resolved": async (ctx) => {
        // PACKAGES
        try {
          const pkg = await $fetch("https://samosirtour.id/api/v1/packages");
          pkg?.forEach((p) => {
            if (p.slug) ctx.urls.push(`/tour-packages/${p.slug}`);
          });
        } catch (e) {
          console.error("Gagal fetch packages", e);
        }

        // ARTIKEL
        try {
          const res = await $fetch(
            "https://apps.samosirtour.id/api/v1/articles"
          );
          const articles = res?.data?.articles ?? [];
          articles.forEach((a) => {
            if (a.slug) ctx.urls.push(`/artikel/${a.slug}`);
          });
        } catch (e) {
          console.error("Gagal fetch artikel", e);
        }
      },
    },
  },

  compatibilityDate: "2025-02-28",
});
