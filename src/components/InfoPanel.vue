<script>
import InfoPanelRow from "./InfoPanelRow.vue";
import { useCurrent } from "../store";
import _ from "lodash";

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
    rank() {
      const rankIndex = _.chain(this.current.dataForCurrentYear)
        .toPairs()
        .sortBy((item) => item[1])
        .reverse()
        .findIndex((x) => x[0] === this.displayedRegion)
        .value();
      const rank = rankIndex + 1;

      switch (rank.toString().slice(-1)) {
        case "1":
          return `${rank}st`;
        case "2":
          return `${rank}nd`;
        case "3":
          return `${rank}rd`;
        default:
          return `${rank}th`;
      }
    },
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
    displayedRegionName() {
      return this.current.dataset.prettyNameOf(this.displayedRegion);
    },
    displayedRegionCounty() {
      return this.current.dataset.countyOf(this.displayedRegion);
    },
  },
};
</script>

<template>
  <v-card id="info-panel-root" v-show="displayedRegion">
    <template #title>
      <v-row no-gutters>
        <v-col cols="10">
          {{ displayedRegionName }}
          <div class="text-subtitle-1 text-medium-emphasis">
            <span v-if="displayedRegionCounty">
              {{ displayedRegionCounty }}
              <span v-if="rank !== '0th'" class="ms-1 me-1 text-high-emphasis">
                ⦁
              </span>
            </span>
            <span v-if="rank !== '0th'">{{ rank }} in the UK</span>
          </div>
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
