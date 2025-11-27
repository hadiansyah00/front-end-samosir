<template>
  <footer class="bg-gray-900 text-gray-300 pt-14 pb-6">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- LOGO + DESCRIPTION -->
        <div>
          <img v-if="logoMain" :src="logoMain" alt="Logo" class="h-14 mb-5" />

          <p class="text-gray-400 leading-relaxed">
            {{
              frontSettings?.footer_description ||
              "Website resmi kami dengan pelayanan terbaik."
            }}
          </p>

          <!-- SOCIAL ICONS -->
          <div class="flex gap-4 mt-5">
            <a
              v-for="soc in socialLinks"
              :key="soc.name"
              :href="soc.url"
              target="_blank"
              rel="noopener"
              class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
            >
              <i :class="soc.icon" class="text-lg"></i>
            </a>
          </div>
        </div>

        <!-- FOOTER LINK SECTIONS -->
        <div v-for="section in footerSections" :key="section.title">
          <h4 class="text-white font-semibold text-lg mb-4">
            {{ section.title }}
          </h4>

          <ul class="space-y-3">
            <li v-for="link in section.links" :key="link.label">
              <NuxtLink
                :to="link.url"
                class="text-gray-400 hover:text-white transition"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- COPYRIGHT -->
      <div
        class="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm"
      >
        {{ frontSettings?.copyright_text || "© 2025 - All Rights Reserved" }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSeoStore } from "~/stores/seoStore";

// Ambil Store
const seoStore = useSeoStore();
const config = useRuntimeConfig();

const frontSettings = computed(() => seoStore.frontSettings || {});

// Helper URL gambar
const buildImg = (path) => {
  if (!path) return null;

  // Sudah URL full
  if (/^https?:\/\//.test(path)) return path;

  return `${config.public.apiUrlBase}/storage/${path}`;
};

// LOGO
const logoMain = computed(() => buildImg(frontSettings.value.logo_main));

// SOCIAL LINKS
const socialLinks = computed(() => frontSettings.value.social_links || []);

// FOOTER SECTIONS
const footerSections = computed(() => frontSettings.value.footer_links || []);

/* -----------------------------------------------------
   🔥 DEBUG LOGGING — MUNCUL DI BROWSER CONSOLE
----------------------------------------------------- */
watch(
  () => frontSettings.value,
  (val) => {
    console.log("================================");
    console.log("🔥 FOOTER DEBUG START");
    console.log("Raw footerSettings:", val);
    console.log("Logo (raw):", val?.logo_main);
    console.log("Logo (final URL):", logoMain.value);
    console.log("Social Links:", socialLinks.value);
    console.log("Footer Sections:", footerSections.value);
    console.log("================================");
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
footer {
  background: #0e0e0e;
}
</style>
