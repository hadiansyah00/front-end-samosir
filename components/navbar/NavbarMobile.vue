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
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-4 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-4 opacity-0"
  >
    <div
      v-if="props.modelValue"
      class="md:hidden fixed inset-x-0 top-[YOUR_HEADER_HEIGHT] z-50 bg-[#C00000] shadow-2xl rounded-b-3xl overflow-hidden border-t border-white/10"
    >
      <div class="flex flex-col py-2 divide-y divide-white/10">
        <NuxtLink
          v-for="item in menus"
          :key="item.id"
          :to="
            item.slug === 'home' || item.slug === 'beranda'
              ? '/'
              : '/' + item.slug
          "
          class="group flex items-center justify-between px-6 py-4 text-white transition-all duration-200 active:bg-black/20 hover:bg-white/10"
          @click="emit('update:modelValue', false)"
        >
          <span class="text-base font-semibold tracking-wide">{{
            item.name
          }}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-transform"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </NuxtLink>
      </div>

      <div class="h-1.5 w-12 bg-white/20 mx-auto rounded-full mb-3 mt-1"></div>
    </div>
  </Transition>
</template>
