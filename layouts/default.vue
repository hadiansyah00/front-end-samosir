<!-- layouts/default.vue -->
<script setup lang="ts">
import Navbar from "~/components/navbar/Navbar.vue";
import AppFooter from "~/components/footer/Footer.vue";
import Loading from "~/components/LoadingScreen.vue";
import { useUiLoadingStore } from "~/stores/uiLoading";

const seoStore = useSeoStore();
const menuStore = useMenuStore();

const config = useRuntimeConfig();
const apiBase = config.public.apiUrlBase;

// Loader state
const showLoading = ref(true);
const MIN_LOAD_MS = 600; // minimal 0.6 detik

// =============================
// SSR Fetch SEO & Menus
// =============================
await useAsyncData("seo-settings", () => {
  if (!seoStore.frontSettings) return seoStore.fetchFrontSettings();
});

await useAsyncData("menus-data", () => {
  if (menuStore.menus.length === 0) return menuStore.fetchMenus();
});

// =============================
// APPLY SEO PROPERLY
// =============================
const ogImageUrl = computed(() => {
  const img = seoStore.frontSettings?.og_image;

  if (!img) return `${apiBase}/default-og.jpg`;

  return `${apiBase}/${img.replace(/^\/+/, "")}`;
});

useHead({
  title: seoStore.frontSettings?.meta_title || "Samosir Tour",
  meta: [
    {
      name: "description",
      content: seoStore.frontSettings?.meta_description || "",
    },
    {
      name: "keywords",
      content: seoStore.frontSettings?.meta_keywords || "",
    },
    { property: "og:title", content: seoStore.frontSettings?.meta_title || "" },
    {
      property: "og:description",
      content: seoStore.frontSettings?.meta_description || "",
    },
    { property: "og:image", content: ogImageUrl.value },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content:
        typeof window !== "undefined"
          ? window.location.href
          : "https://samosirtour.id",
    },

    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: seoStore.frontSettings?.meta_title || "",
    },
    {
      name: "twitter:description",
      content: seoStore.frontSettings?.meta_description || "",
    },
    { name: "twitter:image", content: ogImageUrl.value },
  ],
});

// =============================
// CONTROL LOADER
// =============================
const uiLoading = useUiLoadingStore();

onMounted(async () => {
  // Minimal loading effect
  await new Promise((r) => setTimeout(r, MIN_LOAD_MS));

  // Tunggu store uiLoading kalau page memakainya
  await new Promise((res) => {
    const unwatch = watch(
      () => uiLoading.loading,
      (v) => {
        if (!v) {
          unwatch();
          res(null);
        }
      }
    );

    setTimeout(() => {
      unwatch();
      res(null);
    }, 3000);
  });

  showLoading.value = false; // hide loader
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Loading Screen -->
    <Loading v-if="showLoading" />

    <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
    </Head>

    <Navbar />

    <main class="flex-1 pt-[80px]">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
