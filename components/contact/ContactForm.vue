<template>
  <section class="container mx-auto px-6 md:px-10 mt-16">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Form Kontak</h3>

    <form
      @submit.prevent="submitForm"
      class="bg-white rounded-xl border border-gray-200 shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <!-- NAMA -->
      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-700">Nama</label>
        <input
          v-model="form.nama"
          type="text"
          :class="[
            'mt-2 border rounded-lg px-4 py-2 transition',
            errors.nama ? 'border-red-500' : 'border-gray-300',
          ]"
          required
        />
        <p v-if="errors.nama" class="text-red-500 text-xs mt-1">
          {{ errors.nama }}
        </p>
      </div>

      <!-- EMAIL -->
      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          :class="[
            'mt-2 border rounded-lg px-4 py-2 transition',
            errors.email ? 'border-red-500' : 'border-gray-300',
          ]"
          required
        />
        <p v-if="errors.email" class="text-red-500 text-xs mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- PESAN -->
      <div class="flex flex-col md:col-span-2">
        <label class="text-sm font-medium text-gray-700">Pesan</label>
        <textarea
          v-model="form.pesan"
          rows="4"
          :class="[
            'mt-2 border rounded-lg px-4 py-2 transition',
            errors.pesan ? 'border-red-500' : 'border-gray-300',
          ]"
          required
        ></textarea>
        <p v-if="errors.pesan" class="text-red-500 text-xs mt-1">
          {{ errors.pesan }}
        </p>
      </div>

      <!-- BUTTON -->
      <div class="md:col-span-2">
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#C00000] hover:bg-[#A70000] disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
        >
          <span v-if="!loading">Kirim Pesan</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Mengirim...
          </span>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
const config = useRuntimeConfig();

const form = reactive({
  nama: "",
  email: "",
  pesan: "",
});

const errors = reactive({
  nama: "",
  email: "",
  pesan: "",
});

const loading = ref(false);

// VALIDATION
const validate = () => {
  errors.nama = form.nama ? "" : "Nama wajib diisi.";
  errors.email = form.email ? "" : "Email wajib diisi.";
  errors.pesan = form.pesan ? "" : "Pesan wajib diisi.";

  return !errors.nama && !errors.email && !errors.pesan;
};

const submitForm = () => {
  if (!validate()) return;

  loading.value = true;

  // Nomor WhatsApp backend (ambil dari .env)
  const nomorWa = config.public.waNumber || "628136000576";

  const text = encodeURIComponent(
    `Halo Samosir Tour,
Nama: ${form.nama}
Email: ${form.email}
Pesan:
${form.pesan}`
  );

  const url = `https://wa.me/${nomorWa}?text=${text}`;

  setTimeout(() => {
    loading.value = false;
    window.open(url, "_blank");
  }, 700);
};
</script>
