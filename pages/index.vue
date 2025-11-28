<script setup lang="ts">
import HeroSlider from "~/components/hero/HeroSlider.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import KeunggulanSection from "~/components/sections/KeunggulanSection.vue";
import FleetSection from "~/components/sections/FleetSection.vue";
import AlasanSection from "~/components/sections/AlasanKami.vue";
import TestimonialSection from "~/components/sections/TestimonialSection.vue";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

// =======================
// FETCH DATA MENGGUNAKAN useAsyncData (lebih stabil dari useFetch)
// =======================
const { data: home, refresh } = await useAsyncData("home-page", () =>
  $fetch(
    `${apiUrl}/home?include=sliders,abouts,keunggulanKami,cars,alasans,testimonials`
  )
);

// force refresh setiap page dibuka kembali
onActivated(() => refresh());

// ====================================================
// ========  NORMALISASI DATA — CLEAN & RAPIH  ========
// ====================================================

// HERO SLIDERS
const sliders = computed(() =>
  (home.value?.data?.sliders || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    link: item.link,
    image: item.image ? `${imageBaseUrl}/storage/${item.image}` : "",
    image_mobile: item.image_mobile
      ? `${imageBaseUrl}/storage/${item.image_mobile}`
      : "",
  }))
);

// ABOUT SECTION
const about = computed(() => {
  const a = home.value?.data?.abouts?.[0];
  return a
    ? {
        id: a.id,
        title: a.title,
        subtitle: a.subtitle,
        description: a.description,
        image: `${imageBaseUrl}/storage/${a.image}`,
      }
    : null;
});

// KEUNGGULAN
const keunggulanKami = computed(() => home.value?.data?.keunggulanKami || []);

// ALASAN KAMI
const alasans = computed(() => home.value?.data?.alasans || []);

// CARS
const cars = computed(() =>
  (home.value?.data?.cars || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    capacity: c.capacity,
    price_per_day: c.price_per_day,
    description: c.description,
    cta_whatsapp: c.cta_whatsapp,
    image: c.image
      ? `${imageBaseUrl}/storage/${c.image}`
      : `${imageBaseUrl}/placeholder/car-default.png`,
  }))
);

// TESTIMONIALS
const testimonials = computed(() =>
  (home.value?.data?.testimonials || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    message: item.message,
    photo: item.photo
      ? `${imageBaseUrl}/storage/${item.photo}`
      : "/placeholder-user.png",
  }))
);
</script>

<template>
  <section class="w-full mt-0 pt-0">
    <!-- ⭐ HERO SLIDER -->
    <ClientOnly>
      <HeroSlider :sliders="sliders" />
    </ClientOnly>

    <!-- ⭐ ABOUT -->
    <AboutSection :about="about" />

    <!-- ⭐ KEUNGGULAN -->
    <KeunggulanSection :items="keunggulanKami" />

    <!-- ⭐ ALASAN -->
    <AlasanSection :alasans="alasans" />

    <!-- ⭐ DAFTAR MOBIL -->
    <FleetSection :cars="cars" />

    <!-- ⭐ TESTIMONIAL -->
    <TestimonialSection :testimonials="testimonials" />
  </section>
</template>
