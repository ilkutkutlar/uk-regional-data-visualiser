import { defineStore } from "pinia";
import type { Dataset } from "./dataset";
import { earnings } from "./datasets/earnings";
import _ from "lodash";

export const useCurrent = defineStore("current", {
  state: () => ({
    dataset: earnings as Dataset,
    year: "2021" as string,
    highlightedRegions: [] as Array<string>,
    selectedRegion: "" as string,
    isDarkMode: false as boolean,
  }),
  getters: {
    dataForCurrentYear: (state) => state.dataset.data[state.year],
  },
  actions: {
    clearSelectedRegion() {
      this.selectedRegion = "";
    },
    addHighlightedRegion(value: string) {
      this.$patch({
        highlightedRegions: this.highlightedRegions.concat([value]),
      });
    },
    removeHighlightedRegion(value: string) {
      this.$patch({
        highlightedRegions: _.without(this.highlightedRegions, value),
      });
    },
    clearHighlightedRegions() {
      this.$patch({ highlightedRegions: [] });
    },
  },
});
