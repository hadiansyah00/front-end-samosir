<template>
  <footer
    class="bg-gradient-to-r from-[#C00000] to-[#8B0000] shadow-md py-2 text-white pt-14 pb-6"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- LOGO + DESCRIPTION -->
        <div>
          <img v-if="logoMain" :src="logoMain" alt="Logo" class="h-14 mb-5" />

          <p class="text-white leading-relaxed">
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
              class="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 flex items-center justify-center transition"
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
                class="text-white hover:text-gray-300 transition"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- COPYRIGHT -->
      <div
        class="border-t border-white mt-12 pt-6 text-center text-white text-sm"
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

  // Jika sudah URL full
  if (/^https?:\/\//.test(path)) return path;

  return `${config.public.apiUrlBase}/storage/${path}`;
};

// LOGO
const logoMain = computed(() => buildImg(frontSettings.value.logo_main));

// SOCIAL LINKS
const socialLinks = computed(() => {
  const raw = frontSettings.value.social_links;
  if (!raw) return [];

  try {
    // Parse JSON jika masih string
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    console.error("❌ ERROR parsing social_links:", e);
    return [];
  }
});

/* -----------------------------------------------------
   ✅ IMPROVED FOOTER SECTIONS PARSER
----------------------------------------------------- */
const footerSections = computed(() => {
  const raw = frontSettings.value.footer_links;

  if (!raw) return [];

  try {
    // Parse JSON jika string, atau gunakan langsung jika array
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

    // Normalisasi text → label
    return parsed.map((section) => ({
      title: section.title,
      links: section.links.map((link) => ({
        label: link.label || link.text, // fallback dari "text"
        url: link.url,
      })),
    }));
  } catch (error) {
    console.error("❌ FOOTER: Gagal parsing footer_links", error);
    return [];
  }
});

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
    console.log("Footer Sections (final parsed):", footerSections.value);
    console.log("================================");
  },
  { immediate: true, deep: true }
);
</script>
