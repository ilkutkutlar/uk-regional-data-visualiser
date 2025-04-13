<script lang="ts">
export default {
  props: {
    year: {
      type: String,
      default: "2025",
    },
    value: {
      type: String,
      default: "0",
    },
    changeFromLastYear: {
      type: Number,
      default: 0,
    },
    isSelectedRow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    changeTextClass() {
      if (isNaN(this.changeFromLastYear)) return ["text-grey"];
      if (this.changeFromLastYear > 0) return ["text-green"];
      if (this.changeFromLastYear < 0) return ["text-red"];
      return ["text-yellow"];
    },
    changeDirectionIcon() {
      if (isNaN(this.changeFromLastYear) || this.changeFromLastYear === 0) {
        return "$minus";
      }
      return this.changeFromLastYear > 0 ? "$arrowUpThin" : "$arrowDownThin";
    },
    changeFromLastYearPretty() {
      if (isNaN(this.changeFromLastYear)) return "N/A";
      return `${this.changeFromLastYear.toFixed(2)}%`;
    },
  },
};
</script>

<template>
  <tr data-cy="row">
    <td>
      <v-icon
        data-cy="select-icon"
        :icon="isSelectedRow ? '$chevronRight' : ''"
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
