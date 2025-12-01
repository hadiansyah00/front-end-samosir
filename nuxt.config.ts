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

  modules: [
    "@pinia/nuxt",
    "nuxt-simple-sitemap", // ✅ MODULE YANG BENAR
  ],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrlBase: process.env.NUXT_PUBLIC_API_URL_BASE,
    },
  },

  // ==============================================
  //  🚀 SITEMAP PROPER CONFIG FOR NUXT 3.15
  // ==============================================
  sitemap: {
    siteUrl: "https://samosirtour.id",

    // Static pages
    urls: [
      "/",
      "/tentang-kami",
      "/daftar-mobil-dan-harga",
      "/paket-wisata-samosir",
      "/galleri",
      "/artikel",
    ],

    // Dynamic routes
    autoLastmod: true,
  },

  // Generate dynamic URLs using server route
  nitro: {
    hooks: {
      "sitemap:resolved": async (ctx) => {
        // TOUR PACKAGES ======================
        try {
          const pkg = await $fetch("https://samosirtour.id/api/v1/packages");

          if (Array.isArray(pkg)) {
            pkg.forEach((p) => {
              if (p.slug) {
                ctx.urls.push(`/tour-packages/${p.slug}`);
              }
            });
          }
        } catch (e) {
          console.error("Gagal fetch packages", e);
        }

        // ARTIKEL ============================
        try {
          const res = await $fetch(
            "https://apps.samosirtour.id/api/v1/articles"
          );
          const articles = res?.data?.articles ?? [];

          articles.forEach((a) => {
            if (a.slug) {
              ctx.urls.push(`/artikel/${a.slug}`);
            }
          });
        } catch (e) {
          console.error("Gagal fetch artikel", e);
        }
      },
    },
  },

  compatibilityDate: "2025-02-28",
});
