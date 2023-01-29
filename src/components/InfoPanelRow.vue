<script>
import ArrowUp from "./icons/ArrowUp.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import Dash from "./icons/Dash.vue";
import { useCurrent } from "../store";

export default {
  components: {
    ArrowUp,
    ArrowDown,
    Dash,
  },
  props: ["year", "value", "changeFromLastYear", "isSelectedRow"],
  data() {
    return {
      normalClass: ["ps-2", "pe-2"],
      selectedClass: ["border", "p-2", "rounded-2", "bg-dark-subtle"],
      current: useCurrent(),
    };
  },
  computed: {
    changeTextClass() {
      if (isNaN(this.changeFromLastYear)) {
        return ["text-muted"];
      } else if (this.changeFromLastYear > 0) {
        return ["text-success"];
      } else if (this.changeFromLastYear < 0) {
        return ["text-danger"];
      }
      return ["text-warning"];
    },
    changeDirectionIcon() {
      if (
        isNaN(this.changeFromLastYear) ||
        this.changeFromLastYear === "0.00"
      ) {
        return Dash;
      }
      return this.changeFromLastYear > 0 ? ArrowUp : ArrowDown;
    },
    changeFromLastYearPretty() {
      if (isNaN(this.changeFromLastYear)) return "N/A";
      return `${this.changeFromLastYear}%`;
    },
  },
};
</script>

<template>
  <div class="d-flex" :class="isSelectedRow ? selectedClass : normalClass">
    <div class="flex-fill">
      <span class="fw-bold"> {{ year }} </span>:
      {{ value }}
    </div>
    <div class="flex-fill text-end" :class="changeTextClass">
      {{ changeFromLastYearPretty }}
      <component :is="changeDirectionIcon"></component>
    </div>
  </div>
</template>
