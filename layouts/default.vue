<!-- layouts/default.vue -->
<script setup lang="ts">
import Navbar from "~/components/navbar/Navbar.vue";
import AppFooter from "~/components/footer/Footer.vue";

const seoStore = useSeoStore();
const menuStore = useMenuStore();

/*
  Load data SSR-safe
  - useAsyncData TIDAK membuat error Nitro
  - data dicache otomatis di SSR & client
  - SPA navigate tidak memanggil ulang
*/
await useAsyncData("seo-settings", () => {
  if (!seoStore.frontSettings) {
    return seoStore.fetchFrontSettings();
  }
});

await useAsyncData("menus-data", () => {
  if (menuStore.menus.length === 0) {
    return menuStore.fetchMenus();
  }
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
