<template>
  <section v-if="items && items.length" class="container mx-auto px-4 py-20">
    <h2 class="text-3xl font-bold text-center mb-12">Keunggulan Kami</h2>

    <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white opacity-0 animate-fadeUp"
        :style="{ animationDelay: index * 0.15 + 's' }"
      >
        <!-- Icon -->
        <i :class="['text-5xl text-green-600 mb-4', item.icode]"></i>

        <!-- Judul -->
        <h3 class="text-xl font-semibold mb-2">{{ item.judul }}</h3>

        <!-- Deskripsi -->
        <p class="text-gray-600 text-sm">{{ item.deskripsi }}</p>
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
