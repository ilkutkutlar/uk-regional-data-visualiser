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
  <InfoPanel
    v-show="displayedRegion"
    :closeButtonVisible="options.selectedRegion"
    @closeButtonClicked="closeButtonClicked"
  >
    <template #title>
      {{ options.dataset.svgMap.prettyNames[displayedRegion] }}
    </template>
    <template #body>
      <div
        :class="
          year == options.year
            ? ['bg-body', 'border', 'border-primary', 'p-2']
            : ['ps-2']
        "
        v-for="year in displayedYears"
        :key="year"
      >
        <span class="fw-bold"> {{ year }} </span>:
        {{ options.dataset.valueForArea(year, displayedRegion, true) }}
      </div>
    </template>
  </InfoPanel>
</template>
