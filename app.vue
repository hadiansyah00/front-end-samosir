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
    <FloatingButtons />
  </NuxtLayout>
</template>
<!-- Tambahkan di bawah -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap");
@import "@/assets/css/nprogress.css";
@import "aos/dist/aos.css";
</style>
