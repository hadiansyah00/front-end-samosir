<!-- components/sections/AboutSection.vue -->
<template>
  <section
    v-if="about"
    class="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
  >
    <!-- IMAGE -->
    <div class="opacity-0 animate-fadeLeft">
      <img
        :src="about.image"
        alt="Tentang Kami"
        class="w-full h-auto rounded-2xl shadow-xl object-cover hover:scale-[1.02] transition"
      />
    </div>

    <!-- TEXT -->
    <div class="flex flex-col opacity-0 animate-fadeRight space-y-4">
      <h2 class="text-4xl font-extrabold mb-2 text-black leading-tight">
        {{ about.title }}
      </h2>

      <p v-if="about.subtitle" class="text-xl text-black mb-3">
        {{ about.subtitle }}
      </p>

      <!-- Render CKEditor HTML secara aman -->
      <div
        class="prose prose-gray max-w-none text-justify leading-relaxed"
        v-html="about.description"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface About {
  id: number;
  title: string;
  subtitle?: string;
  description: string; // HTML dari CKEditor
  image: string;
}

defineProps<{ about: About | null }>();
</script>

<style scoped>
/* ANIMATIONS */
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
  animation: fadeLeft 0.7s ease-out forwards;
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeRight {
  animation: fadeRight 0.7s ease-out forwards;
  animation-delay: 0.15s;
}

/* Optional: improve style of HTML from CKEditor */
.prose :where(p) {
  margin-bottom: 1rem;
}

.prose :where(h1, h2, h3, h4) {
  color: #222;
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
}
</style>
