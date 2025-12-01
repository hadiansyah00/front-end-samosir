<template>
  <div class="loader-root" role="status" aria-label="Loading">
    <img :src="logo" class="logo" />
  </div>
</template>

<script setup lang="ts">
import logo from "~/assets/img/logo/logo_samosir_putih.png";
// no props: visibility dikontrol dari parent
</script>

<style scoped>
.loader-root {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c30909; /* merah */
  z-index: 99999;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Logo menjadi putih walau sumber bukan putih */
.logo {
  width: 140px;
  height: auto;
  filter: brightness(0) invert(1) drop-shadow(0 6px 18px rgba(0, 0, 0, 0.25));
  animation: pulse 1.4s ease-in-out infinite;
}

/* animasi pulsing */
@keyframes pulse {
  0% {
    transform: scale(0.96);
    opacity: 0.75;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
  100% {
    transform: scale(0.96);
    opacity: 0.75;
  }
}

/* smooth fade-out handled by parent via transition class if wanted */
</style>
