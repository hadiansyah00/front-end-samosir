<script setup lang="ts">
import { ref, computed } from "vue";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrlBase;

// Ambil data gallery
const { data } = await useFetch(`${apiUrl}/api/v1/home?include=gallerys`);

const galleries = data.value?.data?.gallerys || [];

// HERO IMAGE (konsisten seperti "tentang-kami")
const imageUrl = computed(() => {
  if (galleries.length === 0) return "/placeholder.jpg";
  const random = galleries[Math.floor(Math.random() * galleries.length)];
  return `${apiUrl}/storage/${random.image}`;
});

// Lightbox state
const showLightbox = ref(false);
const lightboxIndex = ref(0);

// ketika gambar diklik
const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  showLightbox.value = true;
};

// semua image full URL
const galleryImages = computed(() =>
  galleries.map((g) => `${apiUrl}/storage/${g.image}`)
);
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="w-full bg-gradient-to-r from-[#8B0000] to-[#D40000] py-20">
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6"
      >
        <!-- LEFT -->
        <div class="text-white">
          <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Galeri Samosir Tour
          </h1>
          <p class="text-lg text-white opacity-90 max-w-xl">
            Dokumentasi perjalanan, paket wisata, armada mobil, dan momen
            terbaik bersama pelanggan Samosir Tour.
          </p>
        </div>

        <!-- RIGHT -->
        <div>
          <img
            :src="imageUrl"
            alt="Gallery Hero"
            class="w-full h-72 md:h-96 object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>

    <!-- LIST GALLERY -->
    <section class="max-w-7xl mx-auto py-16 px-6">
      <h2 class="text-3xl font-bold mb-8 text-gray-800">Semua Dokumentasi</h2>

      <!-- Masonry -->
      <div class="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">
        <div
          v-for="(item, index) in galleries"
          :key="index"
          class="overflow-hidden rounded-xl shadow-lg cursor-pointer hover:opacity-80 transition"
          @click="openLightbox(index)"
        >
          <img
            :src="`${apiUrl}/storage/${item.image}`"
            class="w-full mb-4 object-cover rounded-xl"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox Slider -->
    <vue-easy-lightbox
      :visible="showLightbox"
      :imgs="galleryImages"
      :index="lightboxIndex"
      @hide="showLightbox = false"
    />
  </div>
</template>

<style>
/* Masonry fix for image spacing */
img {
  break-inside: avoid;
}
</style>
