<!-- pages/index.vue -->
<script setup lang="ts">
import HeroSlider from "~/components/hero/HeroSlider.vue";

const config = useRuntimeConfig();

// Base API untuk JSON
const apiUrl = config.public.apiUrl; // https://apps.samosirtour.id/api/v1
// Base API untuk gambar
const imageBaseUrl = config.public.apiUrlBase; // https://apps.samosirtour.id

// --- Typescript Model ---
interface Slider {
  id: number;
  title: string;
  image: string; // relative image path
}

interface HomeResponse {
  data: {
    sliders: Slider[];
  };
}

// --- Fetch Sliders ---
const {
  data: homeData,
  pending,
  error,
} = await useFetch<HomeResponse>(`${apiUrl}/home?include=sliders`, {
  key: "home-sliders",
});

// --- Extract sliders ---
const sliders = computed(() => {
  const list = homeData.value?.data?.sliders ?? [];

  return list.map((item: any) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    link: item.link,

    // HeroSlider butuh "image" → jadi kita kirim ulang sebagai image
    image: item.image ? `${imageBaseUrl}/storage/${item.image}` : "",

    // Untuk mobile
    image_mobile: item.image_mobile
      ? `${imageBaseUrl}/storage/${item.image_mobile}`
      : "",
  }));
});

// Debug client
if (process.client) {
  watch(
    () => sliders.value,
    (val) => console.log("🔥 SLIDER DATA:", val),
    { immediate: true }
  );
}
</script>

<template>
  <section class="w-full mt-0 pt-0">
    <!-- 🚀 HERO SLIDER -->
    <ClientOnly>
      <HeroSlider :sliders="sliders" />
    </ClientOnly>

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
