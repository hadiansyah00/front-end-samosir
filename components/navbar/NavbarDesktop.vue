<script setup lang="ts">
import { useMenuStore } from "~/stores/menuStore";
const menuStore = useMenuStore();
const { menus } = storeToRefs(menuStore);
</script>

<template>
  <div class="hidden md:flex gap-8 items-center">
    <NuxtLink
      v-for="item in menus"
      :key="item.id"
      :to="item.url || '/' + item.slug"
      class="text-white hover:text-neutral-300 transition font-medium"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>
