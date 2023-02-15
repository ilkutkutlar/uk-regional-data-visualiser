<script>
export default {
  props: ["year", "value", "changeFromLastYear", "isSelectedRow"],
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
  <tr>
    <td>
      <v-icon :icon="isSelectedRow ? 'mdi-chevron-right' : ''"></v-icon>
      <span class="font-weight-bold text-primary">
        {{ year }}
      </span>
      <span class="mx-2 font-weight-thin">|</span>
      {{ value }}
    </td>
    <td class="text-end" :class="changeTextClass">
      {{ changeFromLastYearPretty }}
      <v-icon :icon="changeDirectionIcon"></v-icon>
    </td>
  </tr>
</template>
