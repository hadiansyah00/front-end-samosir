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
    <!-- Navbar -->
    <Navbar />

    <!-- Page Content -->
    <main class="flex-1 mt-[80px]">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Bisa ditinggalkan clean */
</style>
