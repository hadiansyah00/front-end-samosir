<script setup lang="ts">
import { ref, onMounted } from "vue";

// Asumsikan tipe data ini ada di tempat lain sesuai kode asli Anda
// interface Testimonial {
//   id: number | string;
//   message: string;
//   name: string;
//   role: string;
//   // photo dihilangkan dari interface jika menggunakan TypeScript ketat,
//   // tapi karena perintahnya jangan ubah value, kita biarkan saja prop-nya apa adanya.
// }

const props = defineProps<{
  testimonials: any[]; // Menggunakan any[] agar aman jika struktur aslinya masih menuntut 'photo'
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
  <section class="py-24 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900"
      >
        Apa Kata Mereka?
      </h2>

      <div class="relative max-w-4xl mx-auto px-8 md:px-12">
        <div class="relative min-h-[300px] flex items-center">
          <div
            v-for="(item, index) in testimonials"
            :key="item.id"
            class="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform grid place-items-center p-2"
            :class="[
              index === current
                ? 'opacity-100 translate-x-0 z-10'
                : 'opacity-0 translate-x-8 z-0 pointer-events-none',
            ]"
          >
            <div
              class="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl flex flex-col items-center text-center relative overflow-hidden w-full max-w-2xl mx-auto"
            >
              <svg
                class="absolute top-4 left-6 w-24 h-24 text-red-100 transform -scale-x-100 pointer-events-none opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
              </svg>

              <blockquote class="relative z-10 mb-8">
                <p
                  class="text-xl md:text-2xl leading-relaxed text-gray-800 font-medium italic"
                >
                  “{{ item.message }}”
                </p>
              </blockquote>

              <div class="relative z-10">
                <p class="font-bold text-gray-900 text-lg">
                  {{ item.name }}
                </p>
                <p class="text-sm text-red-600 font-medium mt-1">
                  {{ item.role }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 p-3 md:p-4 rounded-full shadow-md hover:shadow-lg hover:text-red-600 hover:scale-110 active:scale-95 transition-all duration-200 z-20 flex items-center justify-center group"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          @click="next"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 p-3 md:p-4 rounded-full shadow-md hover:shadow-lg hover:text-red-600 hover:scale-110 active:scale-95 transition-all duration-200 z-20 flex items-center justify-center group"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div class="flex justify-center mt-10 gap-3">
        <button
          v-for="(item, index) in testimonials"
          :key="item.id"
          @click="current = index"
          class="transition-all duration-300 rounded-full"
          :class="[
            // Dot yang aktif dibuat lebih lebar (seperti kapsul) untuk indikasi visual yang lebih kuat
            index === current
              ? 'w-8 h-3 bg-red-600'
              : 'w-3 h-3 bg-gray-300 hover:bg-gray-400',
          ]"
          :aria-label="'Go to testimonial ' + (index + 1)"
        ></button>
      </div>
    </div>
  </section>
</template>
