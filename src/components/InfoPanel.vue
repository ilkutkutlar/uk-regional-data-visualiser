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
      }

      if (this.current.highlightedRegions.length > 0) {
        return this.current.highlightedRegions[0];
      }

      return "";
    },
    displayedYears() {
      const years = this.current.dataset.years;
      const currentIndex = years.indexOf(this.current.year);

      let lowerBound;
      switch (currentIndex) {
        case 0:
          lowerBound = currentIndex;
          break;
        case 1:
          lowerBound = currentIndex - 1;
          break;
        default:
          lowerBound = currentIndex - 2;
      }

      return years.slice(lowerBound, lowerBound + 3).reverse();
    },
  },
};
</script>

<template>
  <v-card id="info-panel-root" v-show="displayedRegion">
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
      <table density="compact" style="width: 100%; border-collapse: collapse">
        <tbody>
          <InfoPanelRow
            v-for="year in displayedYears"
            :key="year"
            :isSelectedRow="year == current.year"
            :year="year"
            :value="current.dataset.valueOf(year, displayedRegion, true)"
            :changeFromLastYear="changeBetweenYears(parseInt(year) - 1, year)"
          />
        </tbody>
      </table>
    </template>
  </v-card>
</template>

<style>
#info-panel-root {
  z-index: 10;
  position: fixed;
  word-break: break-word;
  top: var(--v-layout-top);
  right: 0;
  width: 20em;
  margin-top: 1.5em;
  margin-right: 1.5em;
}

@media (max-width: 991.98px) {
  #info-panel-root {
    width: unset;
    left: 0;
    margin: 8px;
  }
}
</style>
