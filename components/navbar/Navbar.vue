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
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md',
      isSticky
        ? 'bg-gradient-to-r from-[#C00000]/95 to-[#8B0000]/95 shadow-lg h-[70px]'
        : 'bg-gradient-to-r from-[#C00000] to-[#8B0000] h-[90px]',
    ]"
  >
    <div class="container mx-auto px-4 h-full flex items-center">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <NavbarLogo :isSticky="isSticky" />
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex flex-1 justify-center">
        <NavbarDesktop />
      </div>

      <!-- Right Side (Booking + Toggle) -->
      <div class="flex items-center gap-4 ml-auto">
        <!-- Booking Desktop -->
        <NuxtLink
          to="https://wa.me/628136000576"
          class="hidden md:flex items-center gap-2 bg-white text-[#C00000] font-semibold px-5 py-2 rounded-xl shadow-sm hover:bg-red-100 transition-all"
          target="_blank"
        >
          <i class="ri-calendar-check-line text-lg"></i>
          Booking
        </NuxtLink>

        <!-- Mobile Toggle -->
        <NavbarToggle v-model="isOpen" />
      </div>
    </div>

    <!-- Mobile Offcanvas -->
    <NavbarMobile v-model="isOpen" />
  </nav>
</template>
