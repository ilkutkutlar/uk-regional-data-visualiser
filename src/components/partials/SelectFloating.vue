<script>
export default {
  props: [
    "outerDivClasses",
    "id",
    "name",
    "ariaLabel",
    "label",
    "items",
    "modelValue",
  ],
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<template>
  <div class="form-floating" :class="outerDivClasses">
    <select
      :id="id"
      :name="name"
      :aria-label="ariaLabel"
      class="form-select"
      v-model="this.value"
    >
      <option v-for="item in this.items" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
    <label :for="name">{{ label }}</label>
  </div>
</template>
