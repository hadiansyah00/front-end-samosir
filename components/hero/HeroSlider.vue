<script setup lang="ts">
const { $Swiper: Swiper, $SwiperSlide: SwiperSlide } = useNuxtApp();

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { Pagination, EffectFade, Autoplay } from "swiper/modules";

const props = defineProps<{
  sliders: Array<{
    id: number;
    title?: string;
    subtitle?: string;
    link?: string;
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
        :modules="[Pagination, EffectFade, Autoplay]"
        effect="fade"
        :fadeEffect="{ crossFade: true }"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="w-full h-full"
      >
        <SwiperSlide
          v-for="slide in sliders"
          :key="slide.id"
          class="relative w-full h-full"
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

          <!-- GRADIENT PANEL KIRI -->
          <div
            class="absolute inset-y-0 left-0 w-[75%] sm:w-[60%] md:w-[50%] bg-gradient-to-r from-black/70 to-transparent flex items-center"
          >
            <div class="p-6 sm:p-10 animate-text">
              <!-- Title -->
              <h2
                class="text-white text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow"
              >
                {{ slide.title }}
              </h2>

              <!-- Subtitle -->
              <p
                v-if="slide.subtitle"
                class="text-white/90 mt-2 text-sm sm:text-base md:text-lg max-w-xl drop-shadow"
              >
                {{ slide.subtitle }}
              </p>

              <!-- CTA -->
              <a
                v-if="slide.link"
                :href="slide.link"
                target="_blank"
                class="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* Dots kecil & putih */
.swiper-pagination-bullet {
  background: white !important;
  width: 8px !important;
  height: 8px !important;
  opacity: 0.4;
}
.swiper-pagination-bullet-active {
  opacity: 1 !important;
}

/* Fade-in + Slide-up text */
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-text {
  animation: fadeSlideUp 0.9s ease-out forwards;
}
</style>
