<script>
import InfoPanel from "./InfoPanel.vue";
import { useOptions } from "../store";

export default {
  components: {
    InfoPanel,
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
  },
  computed: {
    displayedRegionId() {
      if (this.options.selectedRegion) {
        return this.options.selectedRegion;
      } else if (this.options.highlightedRegions.length > 0) {
        return this.options.highlightedRegions[0];
      } else {
        return "";
      }
    },
    isInfoPanelVisible() {
      return this.displayedRegionId;
    },
    titleText() {
      return this.options.dataset.svgMap.prettyNames[this.displayedRegionId];
    },
    otherTimePeriods() {
      const timePeriods = this.options.dataset.timePeriods;
      const currentIndex = timePeriods.indexOf(this.options.timePeriod);

      const periods = [this.options.timePeriod];
      switch (currentIndex) {
        case 0:
          if (timePeriods.length >= 2) {
            periods.unshift(timePeriods[currentIndex + 1]);
          }
          if (timePeriods.length >= 3) {
            periods.unshift(timePeriods[currentIndex + 2]);
          }
          break;
        case 1:
          periods.push(timePeriods[currentIndex - 1]);
          if (timePeriods.length >= 3) {
            periods.unshift(timePeriods[currentIndex + 1]);
          }
          break;
        default:
          periods.push(timePeriods[currentIndex - 1]);
          periods.push(timePeriods[currentIndex - 2]);
      }
      return periods;
    },
    bodyText() {
      return this.otherTimePeriods
        .map((year) => {
          const value = this.options.dataset.valueForArea(
            year,
            this.displayedRegionId,
            true
          );
          if (year === this.options.timePeriod) {
            return `
              <div class="bg-body border border-primary p-2">
                <span class='fw-bold'>${year}</span>: ${value}
              </div>
            `;
          }
          return `
            <div class="ps-2">
              <span class='fw-bold'>${year}</span>: ${value}
            </div>
          `;
        })
        .join("");
    },
  },
};
</script>

<template>
  <InfoPanel
    :titleText="titleText"
    :bodyText="bodyText"
    :visible="this.isInfoPanelVisible"
    :closeButtonVisible="options.selectedRegion"
    @closeButtonClicked="closeButtonClicked"
  />
</template>
