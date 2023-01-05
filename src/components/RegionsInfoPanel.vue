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
      const currentIndex = this.options.dataset.timePeriods.indexOf(
        this.options.timePeriod
      );
      const timePeriods = this.options.dataset.timePeriods;
      if (currentIndex == 0) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 2],
            timePeriods[currentIndex + 1],
            this.options.timePeriod,
          ];
        } else if (timePeriods.length == 2) {
          return [timePeriods[currentIndex + 1], this.options.timePeriod];
        } else {
          return [this.options.timePeriod];
        }
      } else if (currentIndex == 1) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 1],
            this.options.timePeriod,
            timePeriods[currentIndex - 1],
          ];
        } else {
          return [
            this.options.timePeriod,
            this.options.dataset.timePeriods[currentIndex - 1],
          ];
        }
      } else {
        return [
          this.options.timePeriod,
          this.options.dataset.timePeriods[currentIndex - 1],
          this.options.dataset.timePeriods[currentIndex - 2],
        ];
      }
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
