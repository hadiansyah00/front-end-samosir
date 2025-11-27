<script setup lang="ts">
import NavbarLogo from "./NavbarLogo.vue";
import NavbarDesktop from "./NavbarDesktop.vue";
import NavbarMobile from "./NavbarMobile.vue";
import NavbarToggle from "./NavbarToggle.vue";

const isOpen = ref(false);
const isSticky = ref(false);

// Sticky behavior
if (process.client) {
  window.addEventListener("scroll", () => {
    isSticky.value = window.scrollY > 50;
  });
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isSticky
        ? 'bg-gradient-to-r from-[#C00000] to-[#8B0000] shadow-md h-[70px]'
        : 'bg-gradient-to-r from-[#C00000] to-[#8B0000] h-[90px]',
    ]"
  >
    <div class="container mx-auto px-4 h-full flex items-center">
      <div class="flex-shrink-0">
        <NavbarLogo :isSticky="isSticky" />
      </div>

      <div class="hidden md:flex flex-1 justify-center">
        <NavbarDesktop />
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink
          to="/booking"
          class="hidden md:inline-block bg-white text-[#C00000] font-semibold px-5 py-2 rounded-lg hover:bg-red-100 transition"
        >
          Booking
        </NuxtLink>

        <NavbarToggle v-model="isOpen" />
      </div>
    </div>

    <NavbarMobile v-model="isOpen" />
  </nav>
</template>
