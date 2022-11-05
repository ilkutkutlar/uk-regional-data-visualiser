<script>
export default {
  props: {
    outerDivClasses: String,
    id: String,
    name: String,
    ariaLabel: String,
    label: String
  },
  data() {
    return {
      label: this.label
    }
  }
}
</script>

<template>
  <div class="form-floating" :class="outerDivClasses">
    <select
      :id="id"
      :name="name"
      :aria-label="ariaLabel"
      class="form-select"
    ></select>
    <label :for="name">{{ label }}</label>
  </div>
</template>
