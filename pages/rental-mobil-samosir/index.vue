<script setup lang="ts">
import { slugify } from "~/utils/slugify";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const { data: home } = await useAsyncData("cars-list", () =>
  $fetch(`${apiUrl}/home?include=cars,abouts`)
);

const cars = computed(() =>
  (home.value?.data?.cars || []).map((c: any) => ({
    ...c,
    slug: slugify(c.name),
  }))
);

const about = computed(() => home.value?.data?.abouts?.[0] || null);
</script>

<template>
  <section class="max-w-5xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-[#0A3A75] mb-4">Rental Mobil Samosir</h1>
    <p class="text-gray-600 mb-8">
      Samosir Tour — penyedia sewa mobil profesional di Samosir & Danau Toba.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="car in cars" :key="car.id" class="bg-white rounded-lg shadow">
        <nuxt-link :to="`/rental-mobil-samosir/${car.slug}`" class="block">
          <img
            :src="`${config.public.apiUrlBase}/storage/${car.image}`"
            alt=""
            class="w-full h-44 object-cover rounded-t-lg"
            loading="lazy"
          />
          <div class="p-4">
            <h2 class="font-semibold text-lg text-gray-800">{{ car.name }}</h2>
            <p class="text-sm text-gray-500 mt-2">
              Klik untuk lihat detail & info tentang Samosir Tour
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- optional About snippet -->
    <div class="mt-12 bg-[#f7fafc] p-6 rounded-lg">
      <h3 class="text-xl font-semibold">Tentang Samosir Tour</h3>
      <p class="text-gray-600 mt-2">
        {{
          about
            ? about.description
            : "Samosir Tour — layanan travel & rental profesional di Samosir."
        }}
      </p>
    </div>
  </section>
</template>
