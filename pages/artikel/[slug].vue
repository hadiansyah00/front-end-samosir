<template>
  <main class="min-h-screen bg-white">
    <!-- HERO HEADER -->
    <section
      class="w-full py-16 md:py-24 px-6 md:px-10 bg-gradient-to-r from-[#8B0000] via-[#B30000] to-[#D40000] text-white"
    >
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <!-- LEFT CONTENT -->
        <div class="space-y-5">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
            {{ article.title }}
          </h1>

          <div class="flex items-center gap-6 text-sm opacity-90">
            <div class="flex items-center gap-2">
              <i class="ri-calendar-line text-lg"></i>
              <span>Diterbitkan: {{ formatDate(article.published_at) }}</span>
            </div>

            <!-- <div class="flex items-center gap-2">
              <i class="ri-user-line text-lg"></i>
              <span>Oleh: Admin</span>
            </div> -->
          </div>
        </div>

        <!-- RIGHT THUMBNAIL -->
        <div>
          <img
            :src="imageBaseUrl + '/storage/' + article.thumbnail"
            class="w-full rounded-xl shadow-2xl ring-4 ring-white/20 object-cover"
            alt="Thumbnail Artikel"
          />
        </div>
      </div>
    </section>

    <!-- ARTICLE CONTENT -->
    <section class="container mx-auto px-6 md:px-12 py-12">
      <article
        class="prose prose-lg md:prose-xl max-w-none prose-img:rounded-xl"
        v-html="article?.content"
      ></article>

      <!-- SHARE -->
      <div class="mt-12 border-t pt-8 flex items-center gap-3">
        <span class="text-gray-600">Bagikan:</span>

        <a
          :href="`https://wa.me/?text=${shareText}`"
          target="_blank"
          class="p-2 rounded-full bg-green-500 text-white"
        >
          <i class="ri-whatsapp-line text-xl"></i>
        </a>

        <a
          :href="`https://facebook.com/sharer/sharer.php?u=${currentUrl}`"
          target="_blank"
          class="p-2 rounded-full bg-blue-600 text-white"
        >
          <i class="ri-facebook-line text-xl"></i>
        </a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";

const route = useRoute();
const slug = route.params.slug;

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const imageBaseUrl = config.public.apiUrlBase;

const article = ref(null);
const loading = ref(true);

// fetch article detail
const { data, error } = await useAsyncData(`article-${slug}`, () =>
  $fetch(`${apiUrl}/articles/${slug}`)
);

watchEffect(() => {
  if (data.value?.data) {
    article.value = data.value.data;
  }
  loading.value = false;
});

// format publish date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// current URL for share button
const currentUrl = ref(`https://samosirtour.id/artikel/${slug}`);
const shareText = encodeURIComponent(article.value?.title || "");

// SEO
useHead({
  title: article.value?.title,
  meta: [
    { name: "description", content: article.value?.excerpt },
    { property: "og:title", content: article.value?.title },
    { property: "og:description", content: article.value?.excerpt },
    {
      property: "og:image",
      content: imageBaseUrl + "/storage/" + article.value?.thumbnail,
    },
    {
      property: "og:url",
      content: `https://samosirtour.id/artikel/${slug}`,
    },
  ],
});
</script>

<style>
/* Styling tambahan jika butuh */
.prose h2 {
  color: #111827;
  margin-top: 1.6rem;
}
.prose h3 {
  color: #374151;
}
.prose p {
  line-height: 1.75;
}
</style>
