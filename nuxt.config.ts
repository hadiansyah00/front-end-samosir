import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "~/assets/css/input.css",
    "~/assets/css/transitions.css",
    "remixicon/fonts/remixicon.css",
    "~/assets/css/nprogress.css",
  ],

  image: {
    domains: ["apps.samosirtour.id"],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@pinia/nuxt", "@nuxtjs/sitemap"],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrlBase: process.env.NUXT_PUBLIC_API_URL_BASE,
    },
  },

  sitemap: {
    hostname: "https://samosirtour.id",

    // STATIC PAGES
    urls: [
      "/", // Homepage
      "/tentang-kami",
      "/daftar-mobil-dan-harga",
      "/paket-wisata-samosir",
      "/galleri",
      "/artikel",
    ],

    // DYNAMIC ROUTES
    routes: async () => {
      const dynamicRoutes = [];

      // ======================
      // 1. TOUR PACKAGES
      // ======================
      try {
        const packages = await fetch(
          "https://samosirtour.id/api/v1/packages"
        ).then((r) => r.json());

        if (Array.isArray(packages)) {
          packages.forEach((p) => {
            if (p.slug) {
              dynamicRoutes.push(`/tour-packages/${p.slug}`);
            }
          });
        }
      } catch (e) {
        console.error("Gagal fetch packages:", e);
      }

      // ======================
      // 2. ARTIKEL
      // ======================
      try {
        const artikelData = await fetch(
          "https://apps.samosirtour.id/api/v1/articles"
        ).then((r) => r.json());

        const articles = artikelData?.data?.articles || [];

        articles.forEach((a) => {
          if (a.slug) {
            dynamicRoutes.push(`/artikel/${a.slug}`);
          }
        });
      } catch (e) {
        console.error("Gagal fetch artikel:", e);
      }

      return dynamicRoutes;
    },
  },

  compatibilityDate: "2025-02-28",
});
