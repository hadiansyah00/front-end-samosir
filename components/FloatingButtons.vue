<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[999] flex flex-col gap-4">
    <!-- WhatsApp Button -->
    <a
      href="https://wa.me/628136000576?text=Halo%20Samosir%20Tour%2C%20saya%20ingin%20bertanya"
      target="_blank"
      class="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white text-3xl hover:bg-green-600 transition"
    >
      <i class="ri-whatsapp-line"></i>
    </a>

    <!-- Back to Top Button -->
    <button
      @click="scrollToTop"
      class="w-12 h-12 rounded-full bg-[#C00000] shadow-lg flex items-center justify-center text-white text-2xl hover:bg-red-700 transition"
    >
      <i class="ri-arrow-up-line"></i>
    </button>
  </div>
</template>
