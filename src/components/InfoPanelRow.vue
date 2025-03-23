<script>
export default {
  props: ["year", "value", "changeFromLastYear", "isSelectedRow"],
  computed: {
    changeTextClass() {
      if (isNaN(this.changeFromLastYear)) return ["text-grey"];
      if (this.changeFromLastYear > 0) return ["text-green"];
      if (this.changeFromLastYear < 0) return ["text-red"];
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
  <tr data-cy="row">
    <td>
      <v-icon
        data-cy="select-icon"
        :icon="isSelectedRow ? 'mdi-chevron-right' : ''"
      ></v-icon>
      <span data-cy="year" class="font-weight-bold text-primary">
        {{ year }}
      </span>
      <span class="mx-2 font-weight-thin">|</span>
      <span data-cy="value">
        {{ value }}
      </span>
    </td>
    <td data-cy="change" class="text-end" :class="changeTextClass">
      {{ changeFromLastYearPretty }}
      <v-icon data-cy="change-icon" :icon="changeDirectionIcon"></v-icon>
    </td>
  </tr>
</template>
