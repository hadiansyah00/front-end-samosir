import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/input.css",
    "~/assets/css/transitions.css",
    "remixicon/fonts/remixicon.css",
  ],
  image: {
    domains: ["apps.samosirtour.id"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrlBase: process.env.NUXT_PUBLIC_API_URL_BASE,
    },
  },
  compatibilityDate: "2025-02-28",
});
