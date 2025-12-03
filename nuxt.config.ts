// nuxt.config.ts
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

  modules: ["@pinia/nuxt", "nuxt-simple-sitemap"],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrlBase: process.env.NUXT_PUBLIC_API_URL_BASE,
      gaId: process.env.NUXT_PUBLIC_GA_ID,
      googleMapsKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY,
      gtmId: "GTM-PJZ2BD9M",
    },
  },

  app: {
    head: {
      title: "Samosir Tour – Rental Mobil & Paket Wisata Samosir",
      htmlAttrs: { lang: "id" },

      link: [
        { rel: "canonical", href: "https://samosirtour.id" },
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
        { property: "og:site_name", content: "Samosir Tour" },
        { property: "og:title", content: "Samosir Tour" },
        {
          property: "og:description",
          content:
            "Rental Mobil & Paket Wisata Samosir dengan pelayanan profesional.",
        },
        {
          property: "og:image",
          content: "https://samosirtour.id/og_image_samosirtour.webp",
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
          content: "https://samosirtour.id/og_image_samosirtour.webp",
        },
      ],

      script: [
        // ==========================================
        // 🔵 GOOGLE TAG MANAGER
        // ==========================================
        {
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJZ2BD9M');`,
        },

        // ==========================================
        // 🟣 GOOGLE ANALYTICS 4
        // ==========================================
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

      // ==========================================
      // 🔵 GTM NOSCRIPT
      // ==========================================
      noscript: [
        {
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJZ2BD9M"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          body: true,
        },
      ],
    },
  },

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

  nitro: {
    hooks: {
      "sitemap:resolved": async (ctx) => {
        try {
          const res = await $fetch("https://samosirtour.id/api/v1/packages");
          res?.forEach((p) => ctx.urls.push(`/tour-packages/${p.slug}`));
        } catch {}
        try {
          const articleRes = await $fetch(
            "https://apps.samosirtour.id/api/v1/articles"
          );
          articleRes?.data?.articles?.forEach((a) =>
            ctx.urls.push(`/artikel/${a.slug}`)
          );
        } catch {}
      },
    },
  },

  compatibilityDate: "2025-02-28",
});
