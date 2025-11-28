<template>
  <section v-if="items && items.length" class="relative w-full py-20 px-4">
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-red-600/10 via-red-500/5 to-white pointer-events-none"
    ></div>

    <div class="container mx-auto relative z-10">
      <!-- Title -->
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800 animate-fadeIn"
      >
        Keunggulan Kami
      </h2>

      <!-- List -->
      <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="group flex flex-col items-center text-center p-7 rounded-2xl shadow-md bg-white border border-red-100 opacity-0 animate-fadeUp hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          :style="{ animationDelay: index * 0.18 + 's' }"
        >
          <!-- ICON -->
          <div
            class="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/10 text-red-600 mb-4 group-hover:bg-red-500/20 transition-all duration-300"
          >
            <i :class="[item.icode, 'text-4xl']"></i>
          </div>

          <!-- TITLE -->
          <h3
            class="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-all"
          >
            {{ item.judul }}
          </h3>

          <!-- DESCRIPTION -->
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ item.deskripsi }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Keunggulan {
  judul: string;
  icode: string;
  deskripsi: string;
}

defineProps<{
  items: Keunggulan[];
}>();
</script>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeUp {
  animation: fadeUp 0.8s ease-out forwards;
}
</style>
