<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

import { useMenuStore } from "~/stores/menuStore";
const menuStore = useMenuStore();
const { menus } = storeToRefs(menuStore);
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.modelValue"
      class="md:hidden bg-[#C00000] shadow px-4 py-4 space-y-4 border-b-0 animate-slideDown"
    >
      <NuxtLink
        v-for="item in menus"
        :key="item.id"
        :to="item.url || '/' + item.slug"
        class="block font-medium text-white hover:text-blue-600"
        @click="emit('update:modelValue', false)"
      >
        {{ item.name }}
      </NuxtLink>
    </div>
  </transition>
</template>
