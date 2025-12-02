<script setup lang="ts">
import { ref, computed } from "vue";

interface Car {
  id: number;
  name: string;
  capacity: string;
  price_per_day: number;
  description: string;
  cta_whatsapp: string;
  image: string | null;
}

const props = defineProps<{
  cars: Car[];
  imageBaseUrl: string;
}>();

// Format image
const formattedCars = computed(() =>
  props.cars.map((car) => {
    const isFullUrl = car.image?.startsWith("http");

    return {
      ...car,
      img:
        car.image !== null
          ? isFullUrl
            ? car.image // FULL URL → langsung pakai
            : `${props.imageBaseUrl}/storage/${car.image}` // hanya filename → prefix base URL
          : "/placeholder-car.png",
    };
  })
);

// === Load More ===
const itemsToShow = ref(4);

const visibleCars = computed(() =>
  formattedCars.value.slice(0, itemsToShow.value)
);

const showMore = () => {
  itemsToShow.value += 4;
};
</script>

<template>
  <section class="py-20 bg-white relative">
    <div
      class="absolute inset-0 bg-gradient-to-b from-red-600/10 via-red-500/5 to-white pointer-events-none"
    ></div>
    <div class="container mx-auto px-4 relative">
      <h2 class="text-3xl font-bold text-center mb-12">Daftar Mobil & Harga</h2>

      <!-- Grid Card -->
      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="car in visibleCars"
          :key="car.id"
          class="bg-white rounded-2xl shadow-xl p-5 flex flex-col animate-fadeUp opacity-0 transform transition hover:scale-[1.03]"
        >
          <img
            :src="car.img"
            alt="Car Image"
            class="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
          />

          <h3 class="text-xl font-bold mb-1">{{ car.name }}</h3>
          <!-- <p class="text-gray-500 text-sm mb-2">{{ car.capacity }}</p>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ car.description }}
          </p> -->

          <div
            class="flex justify-between items-center bg-gray-50 rounded-lg p-3 mb-4"
          >
            <div class="flex flex-col items-center gap-1">
              <i class="ri-roadster-fill text-red-600 text-xl"></i>
              <span class="text-[10px] font-medium text-gray-700">All in</span>
            </div>

            <div class="w-[1px] h-6 bg-gray-200"></div>

            <div class="flex flex-col items-center gap-1">
              <i class="ri-key-2-fill text-red-600 text-xl"></i>
              <span class="text-[10px] font-medium text-gray-700"
                >Lepas Kunci</span
              >
            </div>

            <div class="w-[1px] h-6 bg-gray-200"></div>

            <div class="flex flex-col items-center gap-1">
              <i class="ri-group-fill text-red-600 text-xl"></i>
              <span class="text-[10px] font-medium text-gray-700"
                >Plus Driver</span
              >
            </div>
          </div>
          <!-- <p class="text-lg font-bold text-red-600 mb-4">
            Rp {{ car.price_per_day.toLocaleString() }} / hari
          </p> -->

          <a
            :href="car.cta_whatsapp"
            target="_blank"
            class="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center font-semibold flex items-center justify-center gap-2"
          >
            <i class="ri-whatsapp-line"></i>
            Booking Sekarang
          </a>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="itemsToShow < formattedCars.length" class="text-center mt-12">
        <button
          @click="showMore"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          Tampilkan Lebih Banyak
        </button>
      </div>

      <!-- Link Ke Semua Mobil -->
      <div class="text-center mt-6">
        <NuxtLink
          to="/mobil"
          class="text-red-600 font-semibold hover:underline"
        >
          Lihat Semua Mobil →
        </NuxtLink>
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
  animation: fadeUp 0.6s ease-out forwards;
}
</style>
