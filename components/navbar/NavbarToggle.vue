<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <button
    @click="emit('update:modelValue', !props.modelValue)"
    class="md:hidden text-white p-3 rounded-xl transition-all duration-200 active:scale-95 hover:bg-white/20"
  >
    <svg
      v-if="!props.modelValue"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-7 h-7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-7 h-7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
