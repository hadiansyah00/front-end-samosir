<template>
  <main class="min-h-screen bg-white">
    <!-- HERO -->
    <section
      class="relative h-[360px] md:h-[460px] lg:h-[520px] w-full overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${headerImg})` }"
      ></div>
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="relative z-10 h-full flex items-center">
        <div class="px-6 md:px-16 lg:px-24 max-w-3xl">
          <div
            class="p-6 rounded-xl backdrop-blur-sm"
            style="
              background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.55),
                rgba(0, 0, 0, 0)
              );
            "
          >
            <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight">
              Paket Wisata Samosir
            </h1>
            <p class="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
              Jelajahi keindahan Samosir dengan pilihan paket liburan terbaik
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- LIST PACKAGE -->
    <section class="container mx-auto px-6 md:px-12 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- skeleton while loading -->
        <template v-if="loading">
          <div
            v-for="n in 6"
            :key="'skeleton-' + n"
            class="animate-pulse bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div class="h-48 bg-gray-100 rounded-md mb-4"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-8"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </template>

        <!-- real list -->
        <NuxtLink
          v-else
          v-for="tour in tours"
          :key="tour.id"
          :to="`/paket-wisata-samosir/${tour.slug}`"
          class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
          data-aos="fade-up"
        >
          <div class="h-48 bg-gray-100 relative">
            <img
              v-if="tour.thumbnail"
              :src="tour.thumbnail"
              :alt="tour.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-400"
            >
              No Image
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ tour.title }}
            </h3>

            <div class="mt-2 flex items-center gap-2 text-gray-500 text-sm">
              <i class="ri-time-line"></i>
              {{ tour.duration || "-" }}
            </div>

            <p class="mt-3 text-gray-600 line-clamp-3">
              {{ tour.description }}
            </p>

            <p class="mt-4 text-[20px] font-bold text-[#C00000]">
              Rp {{ formatPrice(tour.price_start_from) }}
              <span class="text-sm text-gray-500">/ pax</span>
            </p>

            <div class="mt-5">
              <span
                class="block w-full text-center py-2.5 text-white font-medium rounded-xl bg-[#C00000]"
              >
                Lihat Detail
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
<script setup>
import AOS from "aos";
import "aos/dist/aos.css";
import { ref, computed, onMounted, watchEffect } from "vue";
import headerImg from "~/assets/img/backgrounds/bukit-holbung-bg.jpg";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

// local state
const loading = ref(true);
const toursRaw = ref([]);

// DEBUG: runtime config
console.log("[DEBUG] apiUrl:", apiUrl);
console.log("[DEBUG] imageBaseUrl:", imageBaseUrl);

// Fetch data (useAsyncData + local mapping)
// NOTE: endpoint yang sekarang kamu sebutkan adalah `${apiUrl}/tour-packages`
const { data, pending, error } = await useAsyncData("tour-packages-list", () =>
  $fetch(`${apiUrl}/tour-packages`)
);

// Robust mapping function
function mapToursFromResponse(res) {
  if (!res) return [];

  // Common shapes:
  // 1) res.data.tourPackages (object)
  // 2) res.data["tour-packages"]
  // 3) res.tourPackages
  // 4) res.data (array) or res (array)

  // Hit 1 & 2
  const nested = res?.data;
  if (nested) {
    if (Array.isArray(nested.tourPackages)) return nested.tourPackages;
    if (Array.isArray(nested["tour-packages"])) return nested["tour-packages"];
    if (Array.isArray(nested)) return nested; // unlikely but safe
  }

  // Hit 3
  if (Array.isArray(res.tourPackages)) return res.tourPackages;

  // Hit 4
  if (Array.isArray(res)) return res;

  // If object with key 'data' that is object with numeric keys
  // fallback: try to find any array inside res.data
  if (nested && typeof nested === "object") {
    for (const k of Object.keys(nested)) {
      if (Array.isArray(nested[k])) return nested[k];
    }
  }

  return [];
}

// Reactive mapping when response changes
watchEffect(() => {
  console.log("[DEBUG] raw API response:", data.value);

  // choose source array robustly
  const sourceArray = mapToursFromResponse(data.value);
  console.log("[DEBUG] resolved sourceArray length:", sourceArray.length);

  // map to uniform shape
  toursRaw.value = sourceArray.map((t) => {
    // some APIs use thumbnail, some use cover_image; try both
    const thumbnailPath =
      t.thumbnail ?? t.cover_image ?? t.images?.[0]?.image ?? null;

    const mapped = {
      id: t.id ?? null,
      title: t.title ?? t.name ?? "Untitled Package",
      slug: t.slug ?? t.id ?? "",
      duration: t.duration ?? t.duration_text ?? t.days ?? "",
      description: t.description ?? t.excerpt ?? "",
      price_start_from: Number(t.price_start_from ?? t.price ?? 0),
      thumbnail: thumbnailPath
        ? thumbnailPath.startsWith("http")
          ? thumbnailPath
          : `${imageBaseUrl}/storage/${String(thumbnailPath).replace(
              /^\/+/,
              ""
            )}`
        : null,
      raw: t, // keep raw payload if needed
    };

    // debugging per item
    console.log("[DEBUG] mapped tour item:", mapped);
    return mapped;
  });

  // loading based on pending
  loading.value = !!pending.value;

  // show API error if any
  if (error?.value) {
    console.error("[ERROR] fetching tour-packages:", error.value);
  }
});

// computed for template
const tours = computed(() => toursRaw.value);

// format function
const formatPrice = (v) => Number(v || 0).toLocaleString("id-ID");

// SEO + JSON-LD (update when tours change)
useHead({
  title: "Paket Wisata Samosir - Pilihan Liburan Terbaik",
  meta: [
    {
      name: "description",
      content:
        "Pilih paket wisata terbaik untuk menjelajahi Pulau Samosir. Paket lengkap, harga transparan, dan pelayanan profesional.",
    },
    {
      property: "og:title",
      content: "Paket Wisata Samosir - Pilihan Liburan Terbaik",
    },
    {
      property: "og:description",
      content:
        "Pilih paket wisata terbaik untuk menjelajahi Pulau Samosir. Paket lengkap, harga transparan, dan pelayanan profesional.",
    },
  ],
});

// AOS init
onMounted(() => {
  if (process.client) {
    console.log("AOS initialized");
    AOS.init({ duration: 900, once: true });
  }
});
</script>
