<template>
  <main class="bg-white min-h-screen">
    <!-- HERO DETAIL 2 COLUMN -->
    <section class="py-12 md:py-20 bg-gray-50">
      <div class="container mx-auto px-6 md:px-10 lg:px-14">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <!-- LEFT -->
          <div class="space-y-4">
            <h1
              class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            >
              {{ tour?.title || "Loading..." }}
            </h1>

            <div class="text-gray-700 space-y-1 text-base md:text-lg">
              <p class="flex gap-2 items-center">
                <i class="ri-time-line text-red-700"></i>
                {{ tour?.duration || "-" }}
              </p>

              <p class="flex gap-2 items-center">
                <i class="ri-map-pin-line text-red-700"></i>
                {{ tour?.meeting_point || "-" }}
              </p>
            </div>

            <p class="text-gray-600 max-w-xl">{{ tour?.description || "" }}</p>

            <!-- Price -->
            <div class="pt-3">
              <p class="text-sm text-gray-500">Harga mulai dari:</p>
              <p class="text-3xl font-extrabold text-[#C00000]">
                Rp {{ formatPrice(tour?.price_start_from || 0) }}
              </p>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4 pt-4">
              <a
                :href="waLink"
                target="_blank"
                rel="noopener"
                class="px-6 py-3 bg-gradient-to-r from-[#C00000] to-[#8B0000] text-white rounded-full font-semibold shadow-md hover:opacity-90"
              >
                Hubungi Kami
              </a>

              <NuxtLink
                to="/paket-wisata-samosir"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-100"
              >
                Kembali
              </NuxtLink>
            </div>
          </div>

          <!-- RIGHT THUMBNAIL -->
          <div>
            <div
              class="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#C00000]/40 to-[#8B0000]/40 p-3"
            >
              <img
                :src="tourThumbnail"
                class="w-full h-[360px] md:h-[420px] lg:h-[460px] object-cover rounded-xl"
                alt="thumbnail"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ITINERARY -->
    <section class="container mx-auto px-6 md:px-10 lg:px-14 py-12">
      <h2 class="text-2xl font-bold mb-4 text-gray-900">
        Itinerary Perjalanan
      </h2>
      <div class="prose max-w-none" v-html="itineraryHtml"></div>
    </section>

    <!-- FACILITIES -->
    <section class="container mx-auto px-6 md:px-10 lg:px-14 py-12">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Fasilitas</h2>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- INCLUDE -->
        <div>
          <h3 class="font-semibold text-lg mb-2 text-green-700">Include</h3>
          <ul class="space-y-1 text-gray-700">
            <li v-for="f in includes" :key="f.id">✔ {{ f.text }}</li>
          </ul>
        </div>

        <!-- EXCLUDE -->
        <div>
          <h3 class="font-semibold text-lg mb-2 text-red-700">Exclude</h3>
          <ul class="space-y-1 text-gray-700">
            <li v-for="f in excludes" :key="f.id">✖ {{ f.text }}</li>
          </ul>
        </div>

        <!-- BRING -->
        <div>
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            Yang Perlu Dibawa
          </h3>
          <ul class="space-y-1 text-gray-700">
            <li v-for="f in brings" :key="f.id">• {{ f.text }}</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { marked } from "marked";

marked.setOptions({ breaks: true });

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;
const domain = "https://samosirtour.id";

// example WA number (ganti nanti)
const waNumber = "681361217413";

const route = useRoute();
const slug = route.params.slug;

// async fetch
const { data, pending, error } = await useAsyncData(`tour-${slug}`, () =>
  $fetch(`${apiUrl}/tour-packages/${slug}`)
);

const tour = ref({});
watchEffect(() => {
  if (data.value && data.value.data) {
    tour.value = data.value.data;
  }
});

// derived values
const tourThumbnail = computed(() =>
  tour.value.thumbnail
    ? `${imageBaseUrl}/storage/${tour.value.thumbnail}`
    : `${domain}/default-thumbnail.jpg`
);

const itineraryHtml = computed(() =>
  tour.value.itinerary ? marked(tour.value.itinerary) : ""
);

const includes = computed(() =>
  (tour.value.facilities || []).filter((i) => i.type === "include")
);
const excludes = computed(() =>
  (tour.value.facilities || []).filter((i) => i.type === "exclude")
);
const brings = computed(() =>
  (tour.value.facilities || []).filter((i) => i.type === "bring")
);

const formatPrice = (v) => Number(v || 0).toLocaleString("id-ID");

// WhatsApp link (encode title)
const waText = computed(() => {
  const title = tour.value?.title || "paket wisata";
  return encodeURIComponent(`Halo, saya tertarik dengan paket: ${title}`);
});
const waLink = computed(() => `https://wa.me/${waNumber}?text=${waText.value}`);

// SEO + JSON-LD - update head only when data ready
watchEffect(() => {
  if (!tour.value || !tour.value.title) return;

  const title = `${tour.value.title} - Paket Wisata Samosir`;
  const description =
    tour.value.excerpt ||
    tour.value.description?.slice(0, 160) ||
    "Paket wisata di Pulau Samosir";
  const url = `${domain}/paket-wisata-samosir/${tour.value.slug}`;
  const image = tour.value.thumbnail
    ? `${imageBaseUrl}/storage/${tour.value.thumbnail}`
    : `${domain}/default-thumbnail.jpg`;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.value.title,
          description: tour.value.description || description,
          url: url,
          image: image,
          offers: {
            "@type": "Offer",
            priceCurrency: "IDR",
            price: tour.value.price_start_from || 0,
            url: url,
            availability: "https://schema.org/InStock",
          },
          itinerary: tour.value.itinerary || "",
        }),
      },
    ],
  });
});
</script>
