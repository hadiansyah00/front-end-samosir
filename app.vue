<!-- app.vue -->

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
