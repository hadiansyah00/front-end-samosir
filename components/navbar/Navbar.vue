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
      'w-full z-50 transition-all duration-300 border-b-0',
      isSticky
        ? 'bg-gradient-to-r from-[#C00000] to-[#8B0000] shadow-md py-2'
        : 'bg-gradient-to-r from-[#C00000] to-[#8B0000] py-4',
    ]"
  >
    <div class="container mx-auto px-4 flex items-center">
      <!-- LEFT: LOGO -->
      <div class="flex-shrink-0">
        <NavbarLogo :isSticky="isSticky" />
      </div>

      <!-- CENTER: NAVBAR MENU -->
      <div class="hidden md:flex flex-1 justify-center">
        <NavbarDesktop />
      </div>

      <!-- RIGHT: BOOKING BUTTON + MOBILE TOGGLE -->
      <div class="flex items-center gap-4">
        <!-- BOOKING BUTTON (desktop only) -->
        <NuxtLink
          to="/booking"
          class="hidden md:inline-block bg-white text-[#C00000] font-semibold px-5 py-2 rounded-lg hover:bg-red-100 transition"
        >
          Booking
        </NuxtLink>

        <!-- MOBILE TOGGLE ICON -->
        <NavbarToggle v-model="isOpen" />
      </div>
    </div>

    <!-- MOBILE NAV -->
    <NavbarMobile v-model="isOpen" />
  </nav>
</template>
