<script>
export default {
  props: {
    outerDivClasses: String,
    id: String,
    name: String,
    ariaLabel: String,
    label: String,
    items: Array
  }
}
</script>

<template>
  <div class="form-floating" :class="outerDivClasses">
    <select :id="id" :name="name" :aria-label="ariaLabel" class="form-select">
      <option v-for="item in this.items" :value="item.value">
        {{ item.text }}
      </option>
    </select>
    <label :for="name">{{ label }}</label>
  </div>
</template>
