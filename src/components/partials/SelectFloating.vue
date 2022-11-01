<script setup lang="ts">
defineProps<{
  outerDivClasses: string;
  id: string;
  name: string;
  ariaLabel: string;
  label: string;
}>();
</script>

<template>
  <div class="form-floating {{ outerDivClasses }}">
    <select
      id="{{ id }}"
      name="{{ name }}"
      class="form-select"
      aria-label="{{ ariaLabel }}"
    ></select>
    <label for="{{ name }}">{{ label }}</label>
  </div>
</template>
