<script>
import InfoPanel from "./InfoPanel.vue";

export default {
  components: {
    InfoPanel,
  },
  props: ["dataset", "timePeriod", "regionId", "selectedRegionId"],
  computed: {
    titleText() {
      return this.dataset.svgMap.prettyNames[this.regionId];
    },
    otherTimePeriods() {
      const currentIndex = this.dataset.timePeriods.indexOf(this.timePeriod);
      const timePeriods = this.dataset.timePeriods;
      if (currentIndex == 0) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 2],
            timePeriods[currentIndex + 1],
            this.timePeriod,
          ];
        } else if (timePeriods.length == 2) {
          return [timePeriods[currentIndex + 1], this.timePeriod];
        } else {
          return [this.timePeriod];
        }
      } else if (currentIndex == 1) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 1],
            this.timePeriod,
            timePeriods[currentIndex - 1],
          ];
        } else {
          return [this.timePeriod, this.dataset.timePeriods[currentIndex - 1]];
        }
      } else {
        return [
          this.timePeriod,
          this.dataset.timePeriods[currentIndex - 1],
          this.dataset.timePeriods[currentIndex - 2],
        ];
      }
    },
    bodyText() {
      return this.otherTimePeriods
        .map((year) => {
          const value = this.dataset.valueForArea(year, this.regionId, true);
          if (year == this.timePeriod) {
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
    :closeButtonVisible="this.selectedRegionId"
    @closeButtonClicked="this.$emit('closeButtonClicked')"
  />
</template>
