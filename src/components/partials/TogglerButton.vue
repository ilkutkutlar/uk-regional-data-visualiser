<script setup lang="ts">
defineProps<{
  id: string;
  classes: string;
  toggleType: string;
  target: string;
}>();
</script>

<template>
  <div
    id="{{ id }}"
    class="{{ classes }}"
    type="button" 
    data-bs-toggle="{{ toggleType }}"
    data-bs-target="#{{ target }}"
    aria-expanded="false"
    aria-controls="{{ target }}"
  >
    <slot></slot>
  </div>
</template>
