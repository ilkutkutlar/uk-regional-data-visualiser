<script>
import InfoPanel from "./InfoPanel.vue";
import { selected } from "../store";

export default {
  components: {
    InfoPanel,
  },
  props: ["regionId"],
  data() {
    return {
      selected: selected(),
    };
  },
  computed: {
    titleText() {
      return this.selected.dataset.svgMap.prettyNames[this.regionId];
    },
    otherTimePeriods() {
      const currentIndex = this.selected.dataset.timePeriods.indexOf(
        this.selected.timePeriod
      );
      const timePeriods = this.selected.dataset.timePeriods;
      if (currentIndex == 0) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 2],
            timePeriods[currentIndex + 1],
            this.selected.timePeriod,
          ];
        } else if (timePeriods.length == 2) {
          return [timePeriods[currentIndex + 1], this.selected.timePeriod];
        } else {
          return [this.selected.timePeriod];
        }
      } else if (currentIndex == 1) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 1],
            this.selected.timePeriod,
            timePeriods[currentIndex - 1],
          ];
        } else {
          return [
            this.selected.timePeriod,
            this.selected.dataset.timePeriods[currentIndex - 1],
          ];
        }
      } else {
        return [
          this.selected.timePeriod,
          this.selected.dataset.timePeriods[currentIndex - 1],
          this.selected.dataset.timePeriods[currentIndex - 2],
        ];
      }
    },
    bodyText() {
      return this.otherTimePeriods
        .map((year) => {
          const value = this.selected.dataset.valueForArea(
            year,
            this.regionId,
            true
          );
          if (year == this.selected.timePeriod) {
            return `<div style="background-color: lightgrey; padding-top: 0.3em; padding-bottom: 0.3em"><span class='fw-bold'>${year}</span>: ${value}</div>`;
          }
          return `<div><span class='fw-bold'>${year}</span>: ${value}</div>`;
        })
        .join("");
    },
  },
};
</script>

<template>
  <InfoPanel
    :titleText="this.titleText"
    :bodyText="this.bodyText"
    :visible="this.regionId"
    :closeButtonVisible="this.selected.selectedRegion"
    @closeButtonClicked="this.$emit('closeButtonClicked')"
  />
</template>
