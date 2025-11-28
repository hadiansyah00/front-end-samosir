<!-- pages/index.vue -->
<script setup lang="ts">
import HeroSlider from "~/components/hero/HeroSlider.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import KeunggulanSection from "~/components/sections/KeunggulanSection.vue";

const config = useRuntimeConfig();

const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

// ===== Models =====
interface Slider {
  id: number;
  title: string;
  subtitle?: string;
  link?: string;
  image: string;
  image_mobile?: string;
}

interface About {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
}

interface Keunggulan {
  judul: string;
  icode: string;
  deskripsi: string;
}

// ===== Single Fetch Home API =====
const { data: homeData } = await useFetch(
  `${apiUrl}/home?include=sliders,abouts,keunggulanKami`,
  {
    key: "home",
  }
);

// ===== Sliders =====
const sliders = computed<Slider[]>(() => {
  return (homeData.value?.data?.sliders ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    link: item.link,
    image: `${imageBaseUrl}/storage/${item.image}`,
    image_mobile: item.image_mobile
      ? `${imageBaseUrl}/storage/${item.image_mobile}`
      : "",
  }));
});

// ===== About =====
const about = computed<About | null>(() => {
  const item = homeData.value?.data?.abouts?.[0];
  if (!item) return null;

  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    image: `${imageBaseUrl}/storage/${item.image}`,
  };
});

// ===== Keunggulan Kami =====
const keunggulanKami = computed<Keunggulan[]>(() => {
  return homeData.value?.data?.keunggulanKami ?? [];
});
</script>

<template>
  <section class="w-full mt-0 pt-0">
    <!-- ⭐ HERO SLIDER -->
    <ClientOnly>
      <HeroSlider :sliders="sliders" />
    </ClientOnly>

    <!-- ⭐ ABOUT SECTION -->
    <AboutSection :about="about" />

    <!-- ⭐ KEUNGGULAN KAMI -->
    <KeunggulanSection :items="keunggulanKami" />
  </section>
</template>
