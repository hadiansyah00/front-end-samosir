<template>
  <main class="pb-20">
    <ContactHeroCTA />
    <ContactForm />
    <ContactLocation />
  </main>
</template>

<script setup>
import ContactHeroCTA from "@/components/contact/ContactHeroCTA.vue";
import ContactForm from "@/components/contact/ContactForm.vue";
import ContactLocation from "@/components/contact/ContactLocation.vue";

useHead({
  title: "Kontak & Lokasi — Samosir Tour",
  meta: [
    {
      name: "description",
      content:
        "Hubungi Samosir Tour untuk pemesanan mobil, paket wisata, dan layanan transportasi di Pulau Samosir dan Danau Toba.",
    },
  ],
});
</script>
