<script>
import InfoPanelRow from "./InfoPanelRow.vue";
import { useCurrent } from "../store";

export default {
  components: {
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
  <v-card id="info-panel-root" v-show="displayedRegion" class="ma-2">
    <template #title>
      <v-row no-gutters>
        <v-col cols="10">
          {{ current.dataset.svgMap.prettyNames.get(displayedRegion) }}
        </v-col>
        <v-col cols="2">
          <v-btn
            v-show="current.selectedRegion"
            class="float-end"
            @click="closeButtonClicked"
            aria-label="Close"
            icon="mdi-close"
            variant="plain"
            size="medium"
          ></v-btn>
        </v-col>
      </v-row>
    </template>
    <template #text>
      <InfoPanelRow
        v-for="year in displayedYears"
        :key="year"
        :isSelectedRow="year == current.year"
        :year="year"
        :value="current.dataset.valueOf(year, displayedRegion, true)"
        :changeFromLastYear="changeBetweenYears(parseInt(year) - 1, year)"
      />
    </template>
  </v-card>
</template>

<style>
#info-panel-root {
  z-index: 10 !important;
  position: fixed;
  word-break: break-word;
  top: var(--v-layout-top) !important;
  right: 0;
  width: 20em;
  margin-top: 2em;
  margin-right: 2em;
}

@media (max-width: 991.98px) {
  #info-panel-root {
    width: unset;
    left: 0;
  }
}
</style>
