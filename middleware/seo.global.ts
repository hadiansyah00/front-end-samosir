import { useSeoStore } from "~/stores/seoStore";

export default defineNuxtPlugin(async () => {
  const seoStore = useSeoStore();

  // Fetch once only (SEO jarang berubah)
  if (!seoStore.frontSettings) {
    await seoStore.fetchFrontSettings();
  }

  const seo = seoStore.frontSettings || {};

  if (!seo || typeof seo !== "object") return;

  const config = useRuntimeConfig();
  const apiUrlBase = config.public.apiUrlBase;

  /**
   * -----------------------------------------------------------------------------
   * 🔧 Helper: Build Full Image URL
   * - If already full URL → return as is
   * - If empty → return null
   * - Otherwise generate Laravel public path
   * -----------------------------------------------------------------------------
   */
  const buildImg = (img?: string | null) => {
    if (!img) return null;

    // Full external URL
    if (/^https?:\/\//.test(img)) return img;

    // Laravel storage (public/storage/...)
    return `${apiUrlBase}/storage/${img}`;
  };

  /**
   * -----------------------------------------------------------------------------
   * ⭐ Debug only in dev
   * -----------------------------------------------------------------------------
   */
  if (import.meta.dev) {
    console.log("🔥 SEO SETTINGS:", seo);
    console.log("🔥 LOGO MAIN:", buildImg(seo.logo_main));
  }

  /**
   * -----------------------------------------------------------------------------
   * 🔥 Set Global SEO With useHead()
   * -----------------------------------------------------------------------------
   */
  useHead({
    title: seo.meta_title ?? "Samosir Tour",
    htmlAttrs: { lang: "id" },

    meta: [
      {
        name: "description",
        content: seo.meta_description ?? "",
      },
      {
        name: "keywords",
        content: seo.meta_keywords ?? "",
      },

      // Open Graph
      {
        property: "og:title",
        content: seo.og_title ?? seo.meta_title ?? "",
      },
      {
        property: "og:description",
        content: seo.og_description ?? seo.meta_description ?? "",
      },
      {
        property: "og:image",
        content: buildImg(seo.og_image) || buildImg(seo.logo_main),
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: config.public.baseUrl },
    ],

    link: [
      {
        rel: "icon",
        href: buildImg(seo.site_favicon) || "/favicon.ico",
      },
    ],
  });
});
