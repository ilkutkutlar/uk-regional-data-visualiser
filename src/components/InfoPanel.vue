<script lang="ts">
import _ from "lodash";
import InfoPanelRow from "@/components/InfoPanelRow.vue";
import { useCurrent } from "@/store";

export default {
  components: {
    InfoPanelRow,
  },
  data() {
    return {
      current: useCurrent(),
    };
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

      const rankStr = rank.toString();
      if (
        rankStr.endsWith("11") ||
        rankStr.endsWith("12") ||
        rankStr.endsWith("13")
      ) {
        return `${rankStr}th`;
      } else {
        switch (rankStr.slice(-1)) {
          case "1":
            return `${rank}st`;
          case "2":
            return `${rank}nd`;
          case "3":
            return `${rank}rd`;
          default:
            return `${rank}th`;
        }
      }
    },
    displayedRegion() {
      if (this.current.selectedRegionID) {
        return this.current.selectedRegionID;
      }

      if (this.current.highlightedRegionID) {
        return this.current.highlightedRegionID;
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
      return this.current.dataset.boundaries.prettyNameOf(this.displayedRegion);
    },
    displayedRegionCounty() {
      return this.current.dataset.boundaries.countyOf(this.displayedRegion);
    },
  },
  methods: {
    closeButtonClicked() {
      if (this.current.selectedRegionID) this.current.clearHighlighted();
      this.current.clearSelected();
    },
    changeBetweenYears(fromYear: string, toYear: string): number {
      const fromValue = this.current.dataset.valueOf(
        fromYear,
        this.displayedRegion,
      );
      const toValue = this.current.dataset.valueOf(
        toYear,
        this.displayedRegion,
      );
      if (isNaN(fromValue) || isNaN(toValue)) return NaN;
      return ((toValue - fromValue) / fromValue) * 100;
    },
  },
};
</script>

<template>
  <v-card v-show="displayedRegion" id="info-panel-root">
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
            v-show="current.selectedRegionID"
            class="float-end"
            aria-label="Close"
            icon="$close"
            variant="plain"
            size="medium"
            @click="closeButtonClicked"
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
            :is-selected-row="year == current.year"
            :year="year"
            :value="
              current.dataset.valueFormatter(
                current.dataset.valueOf(year, displayedRegion),
              )
            "
            :change-from-last-year="
              changeBetweenYears((parseInt(year) - 1).toString(), year)
            "
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
