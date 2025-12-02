import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  // ========================================================
  // GLOBAL CSS
  // ========================================================
  css: [
    "~/assets/css/input.css",
    "~/assets/css/transitions.css",
    "remixicon/fonts/remixicon.css",
    "~/assets/css/nprogress.css",
  ],

  // ========================================================
  // IMAGE DOMAINS
  // ========================================================
  image: {
    domains: ["apps.samosirtour.id"],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // ========================================================
  // MODULES
  // ========================================================
  modules: ["@pinia/nuxt", "nuxt-simple-sitemap"],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  // ========================================================
  // 🔐 RUNTIME CONFIG — aman untuk public keys
  // ========================================================
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrlBase: process.env.NUXT_PUBLIC_API_URL_BASE,

      gaId: process.env.NUXT_PUBLIC_GA_ID, // G-27F5TW7S6G
      googleMapsKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY,
    },
  },

  // ========================================================
  // 🌐 DEFAULT META (SEO + OG)
  // ========================================================
  app: {
    head: {
      title: "Samosir Tour – Rental Mobil & Paket Wisata Samosir",
      htmlAttrs: { lang: "id" },

      link: [
        { rel: "canonical", href: "https://samosirtour.id" },

        // Performance Preconnect
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        { rel: "preconnect", href: "https://www.googletagmanager.com" },
        { rel: "preconnect", href: "https://www.google-analytics.com" },
      ],

      meta: [
        {
          name: "description",
          content:
            "Samosir Tour menyediakan layanan rental mobil dan paket wisata Samosir & Danau Toba terbaik.",
        },

        // OG TAGS
        { property: "og:site_name", content: "Samosir Tour" },
        { property: "og:title", content: "Samosir Tour" },
        {
          property: "og:description",
          content:
            "Rental Mobil & Paket Wisata Samosir dengan pelayanan profesional.",
        },
        {
          property: "og:image",
          content: "https://samosirtour.id/logo_samosir.png",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://samosirtour.id" },

        // TWITTER
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

      // ========================================================
      // 📊 GOOGLE ANALYTICS (Auto Inject)
      // ========================================================
      script: [
        // GA TAG
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NUXT_PUBLIC_GA_ID}`,
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NUXT_PUBLIC_GA_ID}', { send_page_view: true });
          `,
        },

        // GOOGLE MAPS
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`,
          async: true,
          defer: true,
        },
      ],
    },
  },

  // ========================================================
  // 🗺 SITEMAP
  // ========================================================
  sitemap: {
    siteUrl: "https://samosirtour.id",
    autoLastmod: true,
    xsl: false,
    urls: [
      "/",
      "/tentang-kami",
      "/daftar-mobil-dan-harga",
      "/paket-wisata-samosir",
      "/galleri",
      "/artikel",
    ],
  },

  // ========================================================
  // 📡 DYNAMIC SITEMAP (Packages + Articles)
  // ========================================================
  nitro: {
    hooks: {
      "sitemap:resolved": async (ctx) => {
        // PACKAGES
        try {
          const res = await $fetch("https://samosirtour.id/api/v1/packages");
          res?.forEach((p) => {
            if (p.slug) ctx.urls.push(`/tour-packages/${p.slug}`);
          });
        } catch (e) {
          console.error("Gagal fetch packages", e);
        }

        // ARTICLES
        try {
          const articleRes = await $fetch(
            "https://apps.samosirtour.id/api/v1/articles"
          );
          const articles = articleRes?.data?.articles ?? [];
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
