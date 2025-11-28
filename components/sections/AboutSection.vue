<!-- components/sections/AboutSection.vue -->
<template>
  <section
    v-if="about"
    class="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10"
  >
    <!-- IMAGE -->
    <div class="opacity-0 animate-fadeLeft">
      <img
        :src="about.image"
        alt="Tentang Kami"
        class="w-full h-auto rounded-xl shadow-lg object-cover"
      />
    </div>

    <!-- TEXT -->
    <div class="flex flex-col justify-center opacity-0 animate-fadeRight">
      <h2 class="text-3xl font-bold mb-4">
        {{ about.title }}
      </h2>

      <p v-if="about.subtitle" class="text-lg text-gray-600 mb-3 text-justify">
        {{ about.subtitle }}
      </p>

      <p class="text-gray-700 leading-relaxed text-justify">
        {{ about.description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface About {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
}

defineProps<{ about: About | null }>();
</script>

<style scoped>
/* ⬅️ Fade-in Left */
@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeLeft {
  animation: fadeLeft 0.8s ease-out forwards;
}

/* ➡️ Fade-in Right + Slide Up */
@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(40px) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

.animate-fadeRight {
  animation: fadeRight 0.8s ease-out forwards;
  animation-delay: 0.2s;
}
</style>
