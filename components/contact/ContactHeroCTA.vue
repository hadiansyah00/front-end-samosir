<template>
  <section class="container mx-auto px-6 md:px-10 mt-12">
    <div
      class="rounded-2xl bg-gradient-to-r from-[#C00000] to-[#8B0000] text-white shadow-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h2 class="text-2xl md:text-3xl font-bold">Butuh Bantuan?</h2>
        <p class="mt-2 text-white/90">
          Tim kami siap membantu Anda untuk kebutuhan rental mobil, paket
          wisata, ataupun informasi perjalanan di Samosir.
        </p>
      </div>

      <a
        :href="`https://wa.me/${config.public.waNumber}`"
        target="_blank"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-100 transition"
      >
        <i class="ri-whatsapp-line text-xl"></i>
        Hubungi via WhatsApp
      </a>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
</script>
