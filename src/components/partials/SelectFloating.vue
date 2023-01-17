<script>
import { useOptions } from "../../store";

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
  data() {
    return {
      options: useOptions(),
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    selectTheme() {
      return this.options.isDarkMode
        ? {
            "background-color": "var(--bs-gray-800)",
            color: "whitesmoke",
          }
        : {};
    },
    labelTheme() {
      return this.options.isDarkMode
        ? {
            color: "var(--bs-gray-400)",
          }
        : {};
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
      :style="selectTheme"
      v-model="this.value"
    >
      <option v-for="item in this.items" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
    <label :for="name" :style="labelTheme">{{ label }}</label>
  </div>
</template>
