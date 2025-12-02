<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { slugify } from "~/utils/slugify";

const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const slug = route.params.slug as string;

// ambil semua cars (atau panggil endpoint detail kalau ada)
const { data: home } = await useAsyncData("car-detail-" + slug, () =>
  $fetch(`${apiUrl}/home?include=cars,abouts`)
);

const cars = computed(() => home.value?.data?.cars || []);
const about = computed(() => home.value?.data?.abouts?.[0] || null);

const car = computed(
  () => cars.value.find((c: any) => slugify(c.name) === slug) || null
);

// SEO meta
useHead(() => {
  if (!car.value) {
    return { title: "Mobil tidak ditemukan - Samosir Tour" };
  }
  const title = `${car.value.name} | Rental Mobil Samosir - Samosir Tour`;
  const desc = `Sewa ${car.value.name} bersama Samosir Tour. Layanan profesional di Pulau Samosir & Danau Toba.`;
  const image = `${config.public.apiUrlBase}/storage/${car.value.image}`;
  return {
    title,
    meta: [
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:image", content: image },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [
      {
        rel: "canonical",
        href: `${config.public.siteUrl}/rental-mobil-samosir/${slug}`,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Samosir Tour",
          url: config.public.siteUrl,
          logo: `${config.public.siteUrl}/logo.png`,
          sameAs: [],
          image: image,
        }),
      },
    ],
  };
});
</script>
<template>
  <section class="max-w-3xl mx-auto py-12 px-4">
    <div v-if="car">
      <!-- NAMA MOBIL -->
      <h1 class="text-3xl font-bold text-[#010101]">{{ car.name }}</h1>

      <!-- GAMBAR -->
      <img
        :src="`${config.public.apiUrlBase}/storage/${car.image}`"
        :alt="car.name"
        class="mt-6 rounded-lg w-full object-cover shadow-md"
        loading="lazy"
      />

      <!-- ICON FEATURES -->
      <div
        class="flex justify-between items-center bg-gray-50 rounded-lg p-4 mt-6 shadow-sm"
      >
        <div class="flex flex-col items-center gap-1">
          <i class="ri-roadster-fill text-red-600 text-2xl"></i>
          <span class="text-[11px] font-medium text-gray-700">All In</span>
        </div>

        <div class="w-[1px] h-8 bg-gray-200"></div>

        <div class="flex flex-col items-center gap-1">
          <i class="ri-key-2-fill text-red-600 text-2xl"></i>
          <span class="text-[11px] font-medium text-gray-700">Lepas Kunci</span>
        </div>

        <div class="w-[1px] h-8 bg-gray-200"></div>

        <div class="flex flex-col items-center gap-1">
          <i class="ri-group-fill text-red-600 text-2xl"></i>
          <span class="text-[11px] font-medium text-gray-700">Plus Driver</span>
        </div>
      </div>

      <!-- HARGA -->
      <!-- <p
        v-if="car.price_per_day"
        class="text-xl font-bold text-red-600 mt-5 mb-4 text-center"
      >
        Rp {{ Number(car.price_per_day).toLocaleString() }} / hari
      </p> -->

      <!-- CTA WHATSAPP -->
      <a
        :href="car.cta_whatsapp"
        target="_blank"
        class="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center font-semibold flex items-center justify-center gap-2 shadow-md"
      >
        <i class="ri-whatsapp-line text-xl"></i>
        Booking Sekarang
      </a>

      <!-- ABOUT / DESKRIPSI LAYANAN -->
      <div class="mt-10 prose prose-lg">
        <h2 class="text-[#0A3A75]">Tentang Samosir Tour</h2>
        <p v-if="about">{{ about.description }}</p>

        <p v-else>
          Samosir Tour adalah layanan rental mobil profesional di Pulau Samosir
          & Danau Toba dengan armada terbaik dan pelayanan ramah.
        </p>
      </div>
    </div>

    <!-- JIKA MOBIL TIDAK ADA -->
    <div v-else class="text-center py-16">
      <p class="text-gray-600">Mobil tidak ditemukan.</p>
    </div>
  </section>
  <section class="container mx-auto px-6 md:px-8 lg:px-12 mt-14 mb-24">
    <div
      class="rounded-3xl overflow-hidden bg-gradient-to-br from-[#B60000] to-[#7A0000] text-white shadow-xl px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10"
      data-aos="zoom-in"
    >
      <!-- TEXT -->
      <div class="text-center md:text-left">
        <h3
          class="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug"
        >
          Siap Menjelajahi Samosir?
        </h3>
        <p class="mt-2 text-sm md:text-base text-white/90 max-w-md">
          Temukan armada terbaik dan paket tour sesuai kebutuhanmu. Ayo mulai
          perjalananmu sekarang!
        </p>
      </div>

      <!-- CTA BUTTONS -->
      <div class="flex items-center gap-4">
        <!-- BUTTON ➜ KE LIST MOBIL -->
        <NuxtLink
          to="/daftar-mobil-dan-harga"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-[2px]"
          data-aos="fade-left"
        >
          <i class="ri-roadster-fill text-lg"></i>
          Lihat Daftar Mobil
        </NuxtLink>

        <!-- WHATSAPP -->
        <a
          href="https://wa.me/628136000576"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all hover:-translate-y-[2px]"
        >
          <i class="ri-whatsapp-line text-lg"></i>
          WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
