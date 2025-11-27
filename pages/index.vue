<!-- pages/index.vue -->
<script setup lang="ts">
import HeroSlider from "~/components/hero/HeroSlider.vue";

const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;
const apiBase = config.public.apiBase;
// Fetch API Home
const { data: homeData } = await useFetch("/api/v1/home?include=sliders", {
  baseURL: apiBase,
});

// Data slider
const sliders = computed(() => homeData.value?.data?.sliders ?? []);

// FIX: Log hanya di client, hindari SSR warning
if (process.client) {
  watch(
    () => sliders.value,
    (val) => {
      console.log(
        "🔥 SLIDERS LOADED (client):",
        JSON.parse(JSON.stringify(val))
      );
    },
    { immediate: true }
  );
}

// SEO
const seoStore = useSeoStore();
useHead({
  title: seoStore.getSetting("meta_title") ?? "Samosir Tour",
  meta: [
    {
      name: "description",
      content: seoStore.getSetting("meta_description") ?? "",
    },
  ],
});
</script>

<template>
  <section class="w-full">
    <!-- 🚀 HERO SLIDER -->
    <HeroSlider :sliders="sliders" />

    <!-- ✨ CONTENT SECTION -->
    <div class="container mx-auto px-6 py-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Tentang Layanan Kami
      </h2>

      <p class="text-gray-700 text-lg leading-relaxed max-w-3xl">
        Kami menyediakan layanan perjalanan wisata terbaik di Pulau Samosir
        dengan armada lengkap, harga transparan, dan pelayanan profesional.
        Halaman ini masih dalam tahap pengembangan—konten seperti daftar mobil,
        paket wisata, galeri, dan informasi harga akan segera ditampilkan
        setelah API selesai.
      </p>

      <!-- NEXT FEATURE BOX -->
      <div class="mt-10 p-6 bg-white shadow-md border rounded-2xl">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">
          Apa Selanjutnya?
        </h3>

        <ul class="list-disc ml-6 space-y-2 text-gray-700">
          <li>Integrasi API menu & halaman dinamis</li>
          <li>Hero slider dinamis dari backend Laravel</li>
          <li>Listing armada mobil (lepas kunci & dengan driver)</li>
          <li>Galeri destinasi wisata Samosir</li>
          <li>Paket tour & layanan tambahan</li>
        </ul>
      </div>
    </div>
  </section>
</template>
