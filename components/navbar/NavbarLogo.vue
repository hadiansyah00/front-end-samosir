<script setup lang="ts">
const props = defineProps({
  isSticky: Boolean,
});

import { useSeoStore } from "~/stores/seoStore";
import logoDefault from "~/assets/img/logo/logo_samosir.png";

const seoStore = useSeoStore();
const { frontSettings } = storeToRefs(seoStore);

const config = useRuntimeConfig();
const apiUrlBase = config.public.apiUrlBase;

const getFile = (key: string, fallback = logoDefault): string => {
  const value = frontSettings.value?.[key];
  if (!value) return fallback;
  if (/^https?:\/\//.test(value)) return value;
  return `${apiUrlBase}/storage/${value}`;
};

const logoMain = computed(() => getFile("logo_main"));
const logoSticky = computed(() => getFile("logo_sticky"));
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2">
    <img
      :src="props.isSticky ? logoSticky : logoMain"
      class="h-10 w-auto transition-all"
      alt="Logo"
    />
  </NuxtLink>
</template>
