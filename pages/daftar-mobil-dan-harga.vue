<template>
  <main class="min-h-screen bg-white">
    <!-- =======================
        HERO CLEAN TRAVELOKA 
    ======================== -->
    <!-- ============= HERO ARMADA (match Tentang Kami) ============= -->
    <!-- HERO -->
    <section class="relative mb-10" data-aos="fade-in">
      <!-- Jika ada gambar -->
      <div
        v-if="headerImg"
        class="h-[420px] md:h-[520px] lg:h-[580px] w-full bg-center bg-cover"
        :style="`background-image: url(${headerImg});`"
        aria-hidden="true"
      >
        <!-- Gradient overlay kiri → transparan (sama persis seperti Halaman About) -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"
        ></div>
      </div>

      <!-- Jika tidak ada gambar -->
      <div
        v-else
        class="w-full h-[420px] md:h-[520px] lg:h-[580px] flex items-center justify-center text-white shadow-lg bg-gradient-to-r from-[#C00000]/95 to-[#8B0000]/95"
      ></div>

      <!-- TEXT OVERLAY -->
      <div
        class="container mx-auto px-6 md:px-8 lg:px-12 absolute inset-0 pointer-events-none"
      >
        <div class="h-full flex items-center">
          <div
            class="pointer-events-auto max-w-3xl text-white"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <!-- Title untuk Daftar Mobil -->
            <h1
              class="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
            >
              Daftar Armada Kami
            </h1>

            <!-- Sub Text -->
            <p
              class="mt-4 text-sm md:text-base text-white max-w-2xl opacity-90"
            >
              Pilihan kendaraan nyaman & bersih untuk perjalanan Anda di
              Samosir.
            </p>

            <!-- Buttons (optional — kalau tidak ingin, hapus saja) -->
            <div class="mt-6 flex gap-3">
              <a
                :href="`https://wa.me/62`"
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

    <!-- =======================
        LIST MOBIL CLEAN
    ======================== -->
    <section class="container mx-auto px-6 md:px-12 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <div
          v-for="car in cars"
          :key="car.id"
          class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          data-aos="fade-up"
        >
          <div class="h-48 bg-gray-100 relative">
            <img
              v-if="car.image"
              :src="car.image"
              :alt="car.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="flex items-center justify-center w-full h-full text-gray-400 text-6xl"
            >
              <i class="ri-car-line"></i>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-semibold text-gray-900">{{ car.name }}</h3>

            <div class="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <!-- <i class="ri-group-line text-gray-400"></i>
              {{ car.capacity }} -->
            </div>

            <!-- <p class="mt-3 text-gray-600 line-clamp-2">{{ car.description }}</p> -->

            <div
              class="grid grid-cols-3 gap-2 mt-5 py-3 border-t border-b border-gray-100"
            >
              <div
                class="flex flex-col items-center justify-center text-center"
              >
                <i class="ri-roadster-fill text-red-600 text-xl mb-1"></i>
                <span
                  class="text-[10px] font-medium text-gray-600 uppercase tracking-wide"
                  >All in</span
                >
              </div>

              <div
                class="flex flex-col items-center justify-center text-center border-l border-gray-100"
              >
                <i class="ri-key-2-fill text-red-600 text-xl mb-1"></i>
                <span
                  class="text-[10px] font-medium text-gray-600 uppercase tracking-wide"
                  >Lepas Kunci</span
                >
              </div>

              <div
                class="flex flex-col items-center justify-center text-center border-l border-gray-100"
              >
                <i class="ri-user-star-fill text-red-600 text-xl mb-1"></i>
                <span
                  class="text-[10px] font-medium text-gray-600 uppercase tracking-wide"
                  >Plus Driver</span
                >
              </div>
            </div>

            <!-- <div class="mt-4">
              <p class="text-[20px] font-bold text-[#C00000]">
                Rp {{ formatPrice(car.price_per_day) }}
                <span class="text-sm text-gray-500 font-normal">/ hari</span>
              </p>
            </div> -->

            <a
              :href="car.cta_whatsapp"
              target="_blank"
              class="mt-auto pt-4 block w-full py-2.5 text-center text-white font-medium rounded-xl bg-[#C00000] hover:bg-[#a80000] transition flex items-center justify-center gap-2"
            >
              <i class="ri-whatsapp-line text-lg"></i>
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

// ✔ IMPORT GAMBAR LOKAL AGAR NUXT BISA RESOLVE
import headerImg from "~/assets/img/backgrounds/bukit-holbung-bg.jpg";

// ✔ TITLE HALAMAN
useHead({
  title: "Samosir Rental Mobil - Daftar Armada Terbaru",
});

// FETCH DATA
const { data: homeData } = await useAsyncData("fleet-page", () =>
  $fetch(`${apiUrl}/home?include=cars`)
);

const cars = computed(() =>
  (homeData.value?.data?.cars || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    capacity: c.capacity,
    description: c.description,
    price_per_day: c.price_per_day,
    cta_whatsapp: c.cta_whatsapp,
    image: c.image ? `${imageBaseUrl}/storage/${c.image}` : null,
  }))
);

const formatPrice = (v: number) => v.toLocaleString("id-ID");

onMounted(() => {
  AOS.init({
    duration: 900,
    once: true,
    easing: "ease-out-cubic",
    offset: 40,
  });
});
</script>
