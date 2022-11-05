<script>
export default {
  props: {
    id: String,
    classes: String,
    toggleType: String,
    target: String
  }
}
</script>

<template>
  <div
    :id="id"
    :class="classes"
    type="button" 
    :data-bs-toggle="toggleType"
    :data-bs-target="'#' + target"
    aria-expanded="false"
    aria-controls="target"
  >
    <slot></slot>
  </div>
</template>
