<script>
export default {
  props: ["id", "classes", "toggleType", "target"],
};
</script>

<template>
  <div
    :id="id"
    :class="classes"
    type="button"
    :data-bs-toggle="toggleType"
    :data-bs-target="`#${target}`"
    aria-expanded="false"
    aria-controls="target"
    @click="this.$emit('click')"
  >
    <slot></slot>
  </div>
</template>
