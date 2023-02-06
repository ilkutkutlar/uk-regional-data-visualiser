<script>
export default {
  props: ["year", "value", "changeFromLastYear", "isSelectedRow"],
  data() {
    return {
      normalClass: ["pt-1", ""],
      selectedClass: ["pt-1", "rounded-2", "v-theme-light"],
    };
  },
  computed: {
    changeTextClass() {
      if (isNaN(this.changeFromLastYear)) {
        return ["text-grey"];
      } else if (this.changeFromLastYear > 0) {
        return ["text-green"];
      } else if (this.changeFromLastYear < 0) {
        return ["text-red"];
      }
      return ["text-yellow"];
    },
    changeDirectionIcon() {
      if (
        isNaN(this.changeFromLastYear) ||
        this.changeFromLastYear === "0.00"
      ) {
        return "mdi-minus";
      }
      return this.changeFromLastYear > 0
        ? "mdi-arrow-up-thin"
        : "mdi-arrow-down-thin";
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
      <span class="font-weight-bold"> {{ year }} </span>:
      {{ value }}
    </div>
    <div class="flex-fill text-end" :class="changeTextClass">
      {{ changeFromLastYearPretty }}
      <v-icon :icon="changeDirectionIcon"></v-icon>
    </div>
  </div>
</template>
