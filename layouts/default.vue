<!-- layouts/default.vue -->
<script setup>
import Navbar from "~/components/navbar/Navbar.vue";
import AppFooter from "~/components/footer/Footer.vue";

// Load SEO settings at layout-level (auto once)
const seoStore = useSeoStore();
if (!seoStore.frontSettings) {
  await seoStore.fetchFrontSettings();
}

const menuStore = useMenuStore();
if (menuStore.menus.length === 0) {
  await menuStore.fetchMenus();
}
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

    <main class="flex-1 mt-[80px]">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* Bisa ditinggalkan clean */
</style>
