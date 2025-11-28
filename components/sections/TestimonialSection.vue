<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  testimonials: Testimonial[];
}>();

const current = ref(0);

const next = () => {
  current.value = (current.value + 1) % props.testimonials.length;
};

const prev = () => {
  current.value =
    (current.value - 1 + props.testimonials.length) % props.testimonials.length;
};

onMounted(() => {
  setInterval(next, 5000); // auto slide 5 detik
});
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <!-- TITLE -->
      <h2 class="text-3xl font-bold text-center mb-12">Testimoni Pelanggan</h2>

      <!-- SLIDER -->
      <div class="relative max-w-3xl mx-auto">
        <div
          v-for="(item, index) in testimonials"
          :key="item.id"
          class="transition-all duration-500"
          :class="[
            'p-8 bg-gray-50 shadow-lg rounded-2xl border',
            index === current ? 'opacity-100' : 'opacity-0 absolute inset-0',
          ]"
        >
          <!-- Foto -->
          <div class="flex justify-center mb-4">
            <img
              :src="item.photo"
              class="w-20 h-20 object-cover rounded-full border-2 border-red-500 shadow"
            />
          </div>

          <!-- Message -->
          <p class="text-lg text-gray-700 italic text-center mb-4">
            “{{ item.message }}”
          </p>

          <!-- Name -->
          <p class="text-center font-bold text-gray-900 text-xl">
            {{ item.name }}
          </p>
          <p class="text-center text-sm text-gray-500">
            {{ item.role }}
          </p>
        </div>

        <!-- BUTTONS -->
        <button
          @click="prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          ‹
        </button>

        <button
          @click="next"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          ›
        </button>
      </div>

      <!-- DOTS -->
      <div class="flex justify-center mt-6 gap-2">
        <span
          v-for="(item, index) in testimonials"
          :key="item.id"
          @click="current = index"
          class="w-3 h-3 rounded-full cursor-pointer transition"
          :class="index === current ? 'bg-red-600' : 'bg-gray-300'"
        ></span>
      </div>
    </div>
  </section>
</template>
