<!-- layouts/default.vue -->
<script setup lang="ts">
import Navbar from "~/components/navbar/Navbar.vue";
import AppFooter from "~/components/footer/Footer.vue";

const seoStore = useSeoStore();
const menuStore = useMenuStore();

/*
  Load data hanya sekali di layout
  Nuxt otomatis men-cache setiap navigasi SPA
*/
await Promise.all([
  seoStore.frontSettings ? null : seoStore.fetchFrontSettings(),
  menuStore.menus.length > 0 ? null : menuStore.fetchMenus(),
]);
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

    <!-- Pastikan navbar fixed → kasih padding top yang stabil -->
    <main class="flex-1 pt-[80px]">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
