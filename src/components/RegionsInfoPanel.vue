<script>
import InfoPanel from "./InfoPanel.vue";
import { selected } from "../store";

export default {
  components: {
    InfoPanel,
  },
  data() {
    return {
      selected: selected(),
    };
  },
  methods: {
    closeButtonClicked() {
      if (this.selected.selectedRegion) this.selected.clearHighlightedRegions();
      this.selected.clearSelectedRegion();
    },
  },
  computed: {
    displayedRegionId() {
      if (this.selected.selectedRegion) {
        return this.selected.selectedRegion;
      } else if (this.selected.highlightedRegions.length > 0) {
        return this.selected.highlightedRegions[0];
      } else {
        return "";
      }
    },
    isInfoPanelVisible() {
      return this.displayedRegionId;
    },
    titleText() {
      return this.selected.dataset.svgMap.prettyNames[this.displayedRegionId];
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
            this.displayedRegionId,
            true
          );
          if (year === this.selected.timePeriod) {
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
    :closeButtonVisible="selected.selectedRegion"
    @closeButtonClicked="closeButtonClicked"
  />
</template>
