<template>
  <li>
    <template v-if="item.children.length">
      <NavDropdown :item="item" />
    </template>

    <template v-else>
      <NuxtLink
        :to="item.url"
        class="text-gray-700 hover:text-primary transition"
      >
        {{ item.name }}
      </NuxtLink>
    </template>
  </li>
</template>

<script setup>
defineProps({ item: Object });
</script>
