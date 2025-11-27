<script setup lang="ts">
const props = defineProps({
  sliders: { type: Array, default: () => [] },
});

const config = useRuntimeConfig();
const apiBase = config.public.apiBaseUrl;

// Build full URL dengan perlindungan error
const fileUrl = (path: unknown) => {
  if (!path || typeof path !== "string") return "";
  if (path.startsWith("http")) return path;
  return `${apiBase}/storage/${path}`;
};

// Debug (client only agar tidak error di SSR)
if (process.client) {
  watch(
    () => props.sliders,
    (val) => {
      console.log("🎨 HERO SLIDER RECEIVED:", JSON.parse(JSON.stringify(val)));
    },
    { immediate: true }
  );
}
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <!-- Prevent error kalau slider kosong -->
    <div
      v-if="props.sliders.length === 0"
      class="min-h-[40vh] flex items-center justify-center"
    >
      <div class="text-gray-400">Loading slider...</div>
    </div>

    <!-- Slider Loop -->
    <div
      v-for="(slide, i) in props.sliders"
      :key="slide?.id ?? i"
      class="w-full min-h-[70vh] bg-cover bg-center flex items-center justify-center"
      :style="{
        backgroundImage: slide?.image ? `url('${fileUrl(slide.image)}')` : '',
      }"
    >
      <div class="bg-black/40 text-white p-8 rounded-xl text-center max-w-xl">
        <h1 class="text-4xl font-bold mb-2">
          {{ slide?.title ?? "" }}
        </h1>

        <p class="text-xl opacity-90">
          {{ slide?.subtitle ?? "" }}
        </p>

        <NuxtLink
          v-if="slide?.link"
          :to="slide.link"
          class="inline-block mt-6 bg-white text-red-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
        >
          Kunjungi
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
