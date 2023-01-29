<script>
import BaseInfoPanel from "./BaseInfoPanel.vue";
import InfoPanelRow from "./InfoPanelRow.vue";
import { useCurrent } from "../store";

export default {
  components: {
    BaseInfoPanel,
    InfoPanelRow,
  },
  data() {
    return {
      current: useCurrent(),
    };
  },
  methods: {
    closeButtonClicked() {
      if (this.current.selectedRegion) this.current.clearHighlightedRegions();
      this.current.clearSelectedRegion();
    },
    changeBetweenYears(fromYear, toYear) {
      const fromValue = this.current.dataset.valueOf(
        fromYear,
        this.displayedRegion
      );
      const toValue = this.current.dataset.valueOf(
        toYear,
        this.displayedRegion
      );
      if (isNaN(fromValue) || isNaN(toValue)) return NaN;
      const pcChange = ((toValue - fromValue) / fromValue) * 100;
      return pcChange.toFixed(2);
    },
  },
  computed: {
    displayedRegion() {
      if (this.current.selectedRegion) {
        return this.current.selectedRegion;
      } else if (this.current.highlightedRegions.length > 0) {
        return this.current.highlightedRegions[0];
      } else {
        return "";
      }
    },
    displayedYears() {
      const years = this.current.dataset.years;
      const currentIndex = years.indexOf(this.current.year);

      const displayedYears = [this.current.year];
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
    :closeButtonVisible="current.selectedRegion"
    @closeButtonClicked="closeButtonClicked"
  >
    <template #title>
      {{ current.dataset.svgMap.prettyNames.get(displayedRegion) }}
    </template>
    <template #body>
      <InfoPanelRow
        v-for="year in displayedYears"
        :key="year"
        :isSelectedRow="year == current.year"
        :year="year"
        :value="current.dataset.valueOf(year, displayedRegion, true)"
        :changeFromLastYear="changeBetweenYears(parseInt(year) - 1, year)"
      />
    </template>
  </BaseInfoPanel>
</template>
