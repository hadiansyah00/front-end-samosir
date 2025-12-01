<!-- layouts/default.vue -->
<!-- layouts/default.vue -->
<script setup lang="ts">
import Navbar from "~/components/navbar/Navbar.vue";
import AppFooter from "~/components/footer/Footer.vue";

const seoStore = useSeoStore();
const menuStore = useMenuStore();

// Fetch SEO once (SSR)
await useAsyncData("seo-settings", () => {
  if (!seoStore.frontSettings) {
    return seoStore.fetchFrontSettings();
  }
});

// Fetch menus
await useAsyncData("menus-data", () => {
  if (menuStore.menus.length === 0) {
    return menuStore.fetchMenus();
  }
});

// ===========================
// ⭐ APPLY SEO TO <HEAD> HERE
// ===========================
useHead({
  title: seoStore.frontSettings?.meta_title,
  meta: [
    {
      name: "description",
      content: seoStore.frontSettings?.meta_description,
    },
    {
      name: "keywords",
      content: seoStore.frontSettings?.meta_keywords,
    },
    {
      property: "og:title",
      content: seoStore.frontSettings?.meta_title,
    },
    {
      property: "og:description",
      content: seoStore.frontSettings?.meta_description,
    },
    {
      property: "og:image",
      content: seoStore.frontSettings?.og_image
        ? seoStore.frontSettings.og_image
        : "",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
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
