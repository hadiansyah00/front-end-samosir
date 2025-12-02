<template>
  <main class="min-h-screen bg-white">
    <!-- HERO -->
    <section class="w-full bg-gradient-to-r from-[#8B0000] to-[#D40000] py-20">
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6"
      >
        <!-- LEFT -->
        <div class="text-white">
          <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Artikel Samosir Tour
          </h1>
          <p class="text-lg text-white opacity-90 max-w-xl">
            Informasi wisata, tips perjalanan, dan update terbaru seputar
            Samosir.
          </p>
        </div>

        <!-- RIGHT: Random Image khusus halaman Artikel -->
        <div>
          <img
            :src="articleHero"
            alt="Artikel Hero"
            class="w-full h-72 md:h-96 object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>

    <!-- FILTERS: hanya search -->
    <section class="container mx-auto px-6 md:px-12 py-10">
      <div class="flex items-center gap-4">
        <input
          v-model="search"
          @input="onSearch"
          type="text"
          placeholder="Cari artikel..."
          class="border rounded-xl px-4 py-3 w-full md:w-1/2"
        />
      </div>
    </section>

    <!-- LIST -->
    <section class="container mx-auto px-6 md:px-12 pb-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-if="loading">
          <div
            v-for="n in 6"
            :key="n"
            class="animate-pulse bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div class="h-48 bg-gray-200 rounded-xl mb-3"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </template>

        <NuxtLink
          v-else
          v-for="a in articles"
          :key="a.id"
          :to="`/artikel/${a.slug}`"
          class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <img
            v-if="a.thumbnail"
            :src="a.thumbnail"
            class="h-48 w-full object-cover"
          />
          <div class="p-6">
            <h3 class="mt-1 text-xl font-bold text-gray-900 line-clamp-2">
              {{ a.title }}
            </h3>
            <p class="mt-2 text-gray-600 text-sm line-clamp-3">
              {{ a.excerpt }}
            </p>
            <p class="mt-4 text-gray-400 text-xs flex items-center gap-1">
              <i class="ri-calendar-line"></i> {{ formatDate(a.published_at) }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div class="mt-10 flex justify-center gap-3">
        <button
          v-if="pagination.prev_page_url"
          @click="changePage(pagination.current_page - 1)"
          class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Sebelumnya
        </button>
        <button
          v-if="pagination.next_page_url"
          @click="changePage(pagination.current_page + 1)"
          class="px-4 py-2 rounded-lg bg-[#C00000] text-white hover:bg-[#A30000]"
        >
          Selanjutnya
        </button>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

// STATES
const loading = ref(true);
const articlesRaw = ref([]);
const pagination = ref({});
const search = ref("");
const page = ref(1);

// FORMAT TANGGAL
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// FETCH LIST
async function fetchArticles() {
  loading.value = true;

  const params = new URLSearchParams({
    search: search.value || "",
    page: String(page.value),
  });

  try {
    const res = await $fetch(`${apiUrl}/articles?${params.toString()}`);

    const list = res?.data ?? [];

    articlesRaw.value = list.map((a) => {
      const thumb =
        a.thumbnail ?? a.cover_image ?? a.image ?? a.images?.[0]?.image ?? null;

      const finalThumb = thumb
        ? thumb.startsWith("http")
          ? thumb
          : `${imageBaseUrl}/storage/${thumb.replace(/^\/+/, "")}`
        : null;

      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        published_at: a.published_at,
        thumbnail: finalThumb,
      };
    });

    pagination.value = res?.pagination ?? {};
  } catch (e) {
    console.error("[ARTICLES ERROR]:", e);
  } finally {
    loading.value = false;
  }
}

// GANTI PAGE
function changePage(p) {
  page.value = p;
  fetchArticles();
}

// DEBOUNCE SEARCH
let searchTimer = null;
function onSearch() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    page.value = 1;
    fetchArticles();
  }, 350);
}

// LOAD PERTAMA
onMounted(() => {
  fetchArticles();
});

// OUTPUT
const articles = computed(() => articlesRaw.value);
// Ambil gallery untuk random hero image (khusus halaman artikel)
const { data: galleryData } = await useFetch(
  `${apiUrl}/api/v1/home?include=gallerys`
);
import fallbackHero from "~/assets/img/backgrounds/samosir-bg.jpg";

const galleries = galleryData.value?.data?.gallerys || [];

// Random image khusus artikel
const articleHero = computed(() => {
  if (!galleries.length) return fallbackHero;

  const randomIndex = Math.floor(Math.random() * galleries.length);
  const random = galleries[randomIndex];

  if (!random?.image) return fallbackHero;

  return `${imageBaseUrl}/storage/${random.image}`;
});
</script>
