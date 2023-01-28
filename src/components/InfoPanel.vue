<script>
import BaseInfoPanel from "./BaseInfoPanel.vue";
import InfoPanelRow from "./InfoPanelRow.vue";
import { useOptions } from "../store";

export default {
  components: {
    BaseInfoPanel,
    InfoPanelRow,
  },
  data() {
    return {
      options: useOptions(),
    };
  },
  methods: {
    closeButtonClicked() {
      if (this.options.selectedRegion) this.options.clearHighlightedRegions();
      this.options.clearSelectedRegion();
    },
    changeBetweenYears(fromYear, toYear) {
      const fromValue = this.options.dataset.valueOf(
        fromYear,
        this.displayedRegion
      );
      const toValue = this.options.dataset.valueOf(
        toYear,
        this.displayedRegion
      );
      if (isNaN(fromValue) || isNaN(toValue)) return "-";
      const pcChange = ((toValue - fromValue) / fromValue) * 100;
      return pcChange.toFixed(2);
    },
  },
  computed: {
    displayedRegion() {
      if (this.options.selectedRegion) {
        return this.options.selectedRegion;
      } else if (this.options.highlightedRegions.length > 0) {
        return this.options.highlightedRegions[0];
      } else {
        return "";
      }
    },
    displayedYears() {
      const years = this.options.dataset.years;
      const currentIndex = years.indexOf(this.options.year);

      const displayedYears = [this.options.year];
      switch (currentIndex) {
        case 0:
          if (years.length >= 2) {
            displayedYears.unshift(years[currentIndex + 1]);
          }
          if (years.length >= 3) {
            displayedYears.unshift(years[currentIndex + 2]);
          }
          break;
        case 1:
          displayedYears.push(years[currentIndex - 1]);
          if (years.length >= 3) {
            displayedYears.unshift(years[currentIndex + 1]);
          }
          break;
        default:
          displayedYears.push(years[currentIndex - 1]);
          displayedYears.push(years[currentIndex - 2]);
      }
      return displayedYears;
    },
  },
};
</script>

<template>
  <BaseInfoPanel
    v-show="displayedRegion"
    :closeButtonVisible="options.selectedRegion"
    @closeButtonClicked="closeButtonClicked"
  >
    <template #title>
      {{ options.dataset.svgMap.prettyNames.get(displayedRegion) }}
    </template>
    <template #body>
      <InfoPanelRow
        v-for="year in displayedYears"
        :key="year"
        :isSelectedRow="year == options.year"
        :year="year"
        :value="options.dataset.valueOf(year, displayedRegion, true)"
        :changeFromLastYear="changeBetweenYears(parseInt(year) - 1, year)"
      />
    </template>
  </BaseInfoPanel>
</template>
