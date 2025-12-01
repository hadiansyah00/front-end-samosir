<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
const config = useRuntimeConfig();

// Base API
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

// Loading & error state
const loading = ref(true);
const error = ref<string | null>(null);

// =====================================================
// FETCH DATA ABOUT (SESUAI STRUKTUR INDEX.VUE)
// =====================================================
const { data: homeAbout, refresh: refreshAbout } = await useAsyncData(
  "about-page",
  () => $fetch(`${apiUrl}/home?include=abouts`)
);

// NORMALISASI DATA
const about = computed(() => {
  const a = homeAbout.value?.data?.abouts?.[0];
  if (!a) return null;

  return {
    id: a.id,
    title: a.title,
    description: a.description,
    vision: a.vision,
    mission: a.mission,
    image: a.image
      ? `${imageBaseUrl}/storage/${a.image}`
      : "/images/placeholder-about.jpg",
  };
});

// HERO IMAGE
const aboutImage = computed(() => about.value?.image || null);

// PARSE DESCRIPTION → PARAGRAPH ARRAY
const descriptionParagraphs = computed(() => {
  if (!about.value?.description) return [];
  return about.value.description
    .replace(/\r\n/g, "\n")
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
});

// MISSION LIST (Jika format mulai dari "-")
const missionAsList = computed(() => {
  if (!about.value?.mission) return [];
  return about.value.mission
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item.startsWith("-"))
    .map((item) => item.substring(1).trim());
});

// DEBUGGING
watch(
  () => homeAbout.value,
  (val) => {
    console.log(
      "%cABOUT API RESPONSE:",
      "color:#C00000; font-weight:bold",
      val
    );
  },
  { deep: true }
);

// =====================================================
// INIT AOS
// =====================================================
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  loading.value = false;

  AOS.init({
    duration: 900,
    once: true,
    offset: 50,
    easing: "ease-out-cubic",
  });
});
</script>

<template>
  <main class="min-h-screen">
    <!-- HERO -->
    <section class="relative" data-aos="fade-in">
      <div
        v-if="aboutImage"
        class="h-[420px] md:h-[520px] lg:h-[580px] w-full bg-center bg-cover"
        :style="`background-image: url(${aboutImage});`"
        aria-hidden="true"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"
        ></div>
      </div>

      <div
        v-else
        class="w-full h-[420px] md:h-[520px] lg:h-[580px] flex items-center justify-center text-white shadow-lg bg-gradient-to-r from-[#C00000]/95 to-[#8B0000]/95"
      ></div>

      <!-- overlay -->
      <div
        class="container mx-auto px-6 md:px-8 lg:px-12 absolute inset-0 pointer-events-none"
      >
        <div class="h-full flex items-center">
          <div
            class="pointer-events-auto max-w-3xl text-white"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h1
              class="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
            >
              {{ about?.title ?? "Tentang Kami" }}
            </h1>

            <p
              class="mt-4 text-sm md:text-base text-white max-w-2xl opacity-90"
            >
              {{ descriptionParagraphs[0] ?? "" }}
            </p>

            <div class="mt-6 flex gap-3">
              <a
                :href="`https://wa.me/628136000576`"
                class="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium shadow-lg bg-gradient-to-r from-[#C00000] to-[#8B0000]"
                data-aos="zoom-in"
              >
                <i class="ri-whatsapp-line text-lg"></i>
                Hubungi Kami
              </a>

              <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium bg-white/90 text-gray-900"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <i class="ri-arrow-left-line"></i>
                Kembali ke Beranda
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <section class="container mx-auto px-6 md:px-8 lg:px-12 -mt-12 relative">
      <div
        class="bg-white rounded-2xl shadow-xl overflow-hidden"
        data-aos="fade-up"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Image left -->
          <div class="hidden lg:block lg:order-first" data-aos="fade-right">
            <img
              v-if="aboutImage"
              :src="aboutImage"
              alt="Tentang Samosir Tour"
              class="w-full h-full object-cover block"
              loading="lazy"
            />
            <div
              class="w-full h-full bg-gray-100 flex items-center justify-center"
              v-else
            >
              <i class="ri-map-pin-line text-4xl text-gray-400"></i>
            </div>
          </div>

          <!-- Text right -->
          <div class="p-8 md:p-12 lg:p-16" data-aos="fade-left">
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-900">
              Siapa Kami
            </h2>

            <div class="mt-4 space-y-4 text-gray-700">
              <template v-if="descriptionParagraphs.length">
                <p
                  v-for="(p, idx) in descriptionParagraphs"
                  :key="idx"
                  class="leading-relaxed"
                  data-aos="fade-up"
                  :data-aos-delay="(idx + 1) * 80"
                >
                  {{ p }}
                </p>
              </template>
            </div>

            <!-- Vision & Mission -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div
                class="p-5 rounded-xl shadow-md border border-gray-100"
                data-aos="zoom-in"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="flex-none w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-[#C00000]/95 to-[#8B0000]/95"
                  >
                    <i class="ri-eye-line text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">Visi</h3>
                    <p class="mt-2 text-sm text-gray-700" v-if="about?.vision">
                      {{ about.vision }}
                    </p>
                    <p v-else class="mt-2 text-sm text-gray-500">
                      Belum ada visi yang diatur.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="p-5 rounded-xl shadow-md border border-gray-100"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="flex-none w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-[#C00000]/95 to-[#8B0000]/95"
                  >
                    <i class="ri-list-check"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold">Misi</h3>

                    <div class="mt-2 text-sm text-gray-700">
                      <ul
                        v-if="missionAsList.length"
                        class="list-none space-y-2"
                      >
                        <li
                          v-for="(m, i) in missionAsList"
                          :key="i"
                          class="flex items-start gap-3"
                          data-aos="fade-up"
                          :data-aos-delay="(i + 1) * 100"
                        >
                          <span class="mt-1 text-[#C00000]"
                            ><i class="ri-checkbox-circle-line"></i
                          ></span>
                          <span>{{ m }}</span>
                        </li>
                      </ul>

                      <div v-else>
                        <p
                          v-if="about?.mission"
                          v-for="(p, idx) in about.mission
                            .replace(/\r\n/g, '\n')
                            .split('\n\n')"
                          :key="idx"
                        >
                          {{ p }}
                        </p>
                        <p v-else class="text-gray-500">
                          Belum ada misi yang diatur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA small -->
            <div class="mt-8 flex flex-wrap gap-3" data-aos="fade-up">
              <a
                :href="`https://wa.me/62`"
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow bg-gradient-to-r from-[#C00000] to-[#8B0000] text-white"
              >
                <i class="ri-whatsapp-line"></i>
                Pesan Sekarang
              </a>

              <NuxtLink
                to="/paket"
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-gray-100 text-gray-800"
              >
                <i class="ri-briefcase-line"></i>
                Lihat Paket Tour
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SMALL FOOTER CTA -->
    <section class="container mx-auto px-6 md:px-8 lg:px-12 mt-12 mb-20">
      <div
        class="rounded-2xl overflow-hidden bg-gradient-to-r from-[#C00000]/95 to-[#8B0000]/95 text-white shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        data-aos="zoom-in"
      >
        <div>
          <h3 class="text-xl md:text-2xl font-bold">
            Siap menjelajahi Samosir?
          </h3>
          <p class="mt-1 text-sm md:text-base opacity-90">
            Hubungi kami sekarang untuk paket tour yang sesuai kebutuhanmu.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <a
            :href="`https://wa.me/62`"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 font-semibold"
            data-aos="fade-left"
          >
            <i class="ri-whatsapp-line"></i>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
