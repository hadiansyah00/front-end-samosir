<script setup lang="ts">
const { $Swiper: Swiper, $SwiperSlide: SwiperSlide } = useNuxtApp();

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
const props = defineProps<{
  sliders: Array<{
    id: number;
    title?: string;
    image: string;
    image_mobile: string;
  }>;
}>();
</script>

<template>
  <ClientOnly>
    <div
      class="relative w-full h-[300px] sm:h-[380px] md:h-[500px] lg:h-[600px] overflow-hidden"
    >
      <Swiper
        :modules="[Pagination, Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="w-full h-full"
      >
        <SwiperSlide
          v-for="slide in sliders"
          :key="slide.id"
          class="w-full h-full"
        >
          <picture>
            <source
              v-if="slide.image_mobile"
              :srcset="slide.image_mobile"
              media="(max-width: 768px)"
            />

            <img
              :src="slide.image"
              :alt="slide.title || 'Slider Image'"
              class="w-full h-full object-cover"
            />
          </picture>

          <div
            v-if="slide.title"
            class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6"
          >
            <h2
              class="text-white text-2xl md:text-4xl font-semibold drop-shadow"
            >
              {{ slide.title }}
            </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </ClientOnly>
</template>

<style scoped>
.swiper-pagination-bullet {
  background: white !important;
  opacity: 0.6;
}
.swiper-pagination-bullet-active {
  opacity: 1 !important;
}
</style>
