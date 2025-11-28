<script setup lang="ts">
import { computed } from "vue";

interface Alasan {
  id: number;
  alasan: string;
}

const props = defineProps<{
  alasans: Alasan[];
}>();

const items = computed(() => props.alasans);
</script>

<template>
  <section class="py-20 bg-gray-50 relative">
    <div class="container mx-auto px-4">
      <!-- Title -->
      <h2 class="text-3xl font-bold text-center mb-6">
        Kenapa Memilih <span class="text-red-600">Samosir Tour?</span>
      </h2>

      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Kami menyediakan layanan perjalanan terbaik dengan pengalaman nyaman,
        aman, dan profesional untuk liburan Anda ke Danau Toba & Pulau Samosir.
      </p>

      <!-- List -->
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 animate-fadeUp opacity-0"
        >
          <!-- Icon -->
          <div
            class="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl"
          >
            ✓
          </div>

          <!-- Text -->
          <p class="text-gray-700 font-medium">
            {{ item.alasan }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-fadeUp {
  animation: fadeUp 0.65s ease-out forwards;
}
</style>
