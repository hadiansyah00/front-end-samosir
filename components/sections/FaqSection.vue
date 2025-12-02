<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

// Menyimpan ID yang sedang dibuka
const active = ref<number | null>(null);

const toggle = (id: number) => {
  active.value = active.value === id ? null : id;
};
</script>

<template>
  <section id="faq" class="bg-gray-50 py-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- TITLE -->
      <h2 class="text-center text-3xl font-bold text-[#000000]">
        Frequently Asked Questions
      </h2>
      <p class="text-center text-gray-600 mt-2 mb-12">
        Pertanyaan yang sering diajukan pelanggan Samosir Tour
      </p>

      <!-- LIST FAQ -->
      <div class="space-y-4">
        <div
          v-for="faq in items"
          :key="faq.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <!-- HEADER -->
          <button
            @click="toggle(faq.id)"
            class="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
          >
            <span class="font-medium text-gray-800 text-lg">
              {{ faq.question }}
            </span>

            <svg
              :class="[
                'transition-transform duration-300',
                active === faq.id ? 'rotate-180' : '',
              ]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-[#e1130c]"
            >
              <path
                fill="currentColor"
                d="M12 15.5L4 7.5l1.4-1.4L12 12.7l6.6-6.6L20 7.5z"
              />
            </svg>
          </button>

          <!-- ANSWER -->
          <transition name="faq-accordion">
            <div
              v-if="active === faq.id"
              class="px-5 pb-5 text-gray-600 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animasi accordion */
.faq-accordion-enter-from,
.faq-accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.faq-accordion-enter-to,
.faq-accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}
.faq-accordion-enter-active,
.faq-accordion-leave-active {
  transition: all 0.3s ease;
}
</style>
