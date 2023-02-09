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
  <v-card
    class="card z-index-10 position-fixed break-word bg-opacity-75 top-0 end-0 me-4 w-20em mt-5em-lg start-0-md-down w-100-md-down top-64px-md-down border-radius-0-md-down"
    v-show="displayedRegion"
  >
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
.break-word {
  word-break: break-word;
}

.z-index-10 {
  z-index: 10 !important;
}

.w-20em {
  width: 20em !important;
}

.top-0 {
  top: 0 !important;
}

.end-0 {
  right: 0 !important;
}

@media (min-width: 992px) {
  .mt-5em-lg {
    margin-top: 6em !important;
  }
}

@media (max-width: 991.98px) {
  .bottom-0-md-down {
    bottom: 0 !important;
  }
  .start-0-md-down {
    left: 0 !important;
  }
  .w-100-md-down {
    width: 100% !important;
  }
  .top-64px-md-down {
    top: 64px !important;
  }
  .border-radius-0-md-down {
    border-radius: 0 !important;
  }
}
</style>