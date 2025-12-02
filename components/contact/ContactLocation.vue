<template>
  <section class="container mx-auto px-6 md:px-10 mt-20">
    <h3 class="text-2xl font-bold text-gray-900 mb-8">Lokasi Kantor</h3>

    <div class="grid md:grid-cols-2 gap-10">
      <!-- Loop Lokasi -->
      <div
        v-for="(loc, index) in locations"
        :key="index"
        class="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
      >
        <!-- Map -->
        <iframe
          :src="loc.map"
          width="100%"
          height="300"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          class="rounded-t-xl"
        ></iframe>

        <!-- Info -->
        <div class="p-6">
          <h4 class="font-bold text-lg text-gray-900">{{ loc.name }}</h4>

          <p class="mt-2 text-gray-700 whitespace-pre-line">
            {{ loc.address }}
          </p>

          <!-- Phone -->
          <div v-if="loc.phone" class="mt-4 flex items-center gap-3">
            <i class="ri-phone-line text-gray-700"></i>
            <a
              :href="`tel:${loc.phone}`"
              class="text-[#C00000] font-semibold hover:underline"
            >
              {{ loc.phone }}
            </a>
          </div>

          <!-- WhatsApp -->
          <div class="mt-4 flex" v-if="loc.wa">
            <a
              :href="`https://wa.me/${loc.wa}`"
              target="_blank"
              class="inline-flex items-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg gap-2 font-semibold transition"
            >
              <i class="ri-whatsapp-line text-xl"></i>
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const locations = [
  {
    name: "Samosir Tour — Kantor Tuktuk",
    address: `Jl. Lingkar Tuktuk Siadong (Depan Dermaga Tuktuk)
Desa Tuktuk Siadong, Kecamatan Simanindo,
Kabupaten Samosir, Sumatera Utara 22395`,
    phone: "08136000576",
    wa: "628136000576",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.515214502237!2d98.8491181!3d2.6612834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031e90025ebbf65%3A0x2a3d853a5482ab4c!2sSamosirtour!5e0!3m2!1sid!2sid!4v1764691724796!5m2!1sid!2sid",
  },
  {
    name: "Samosir Tour — Rental Mobil Samosir",
    address: `Tuktuk Siadong,
Simanindo, Samosir Regency,
Sumatera Utara 22395`,
    phone: "08136000576",
    wa: "628136000576",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510145.83194208605!2d98.23919628906249!3d2.6615625000000076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031e9e606f650ed%3A0xdc3ae9d92c280eae!2sRental%20mobil%20samosir!5e0!3m2!1sid!2sid!4v1764690251004!5m2!1sid!2sid",
  },
];
</script>
