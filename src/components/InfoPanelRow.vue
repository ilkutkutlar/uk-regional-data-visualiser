<script>
import ArrowUp from "./icons/ArrowUp.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import { useOptions } from "../store";

export default {
  components: {
    ArrowUp,
    ArrowDown,
  },
  props: ["year", "value", "changeFromLastYear", "isSelectedRow"],
  data() {
    return {
      normalClass: ["ps-2", "pe-2"],
      selectedClass: ["border", "border-primary", "p-2"],
      options: useOptions(),
    };
  },
  computed: {
    changeDirectionIcon() {
      return this.changeFromLastYear > 0 ? ArrowUp : ArrowDown;
    },
    selectedTheme() {
      return this.options.isDarkMode
        ? { "background-color": "var(--bs-gray-700)" }
        : { "background-color": "white" };
    },
  },
};
</script>

<template>
  <div
    class="d-flex"
    :class="isSelectedRow ? selectedClass : normalClass"
    :style="isSelectedRow ? selectedTheme : {}"
  >
    <div class="flex-fill">
      <span class="fw-bold"> {{ year }} </span>:
      {{ value }}
    </div>
    <div
      class="flex-fill text-end"
      :class="[changeFromLastYear > 0 ? 'text-success' : 'text-danger']"
    >
      {{ changeFromLastYear }}%
      <component :is="changeDirectionIcon"></component>
    </div>
  </div>
</template>
