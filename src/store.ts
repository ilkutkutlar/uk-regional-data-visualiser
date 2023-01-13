import { defineStore } from "pinia";
import type { Dataset } from "./dataset";
import { earnings } from "./datasets/earnings";
import { removeByValue } from "./utils";

export const useOptions = defineStore("options", {
  state: () => ({
    dataset: earnings as Dataset,
    year: "2021" as string,
    highlightedRegions: [] as Array<string>,
    selectedRegion: "" as string,
  }),
  getters: {
    selectedData: (state) => state.dataset.data[state.year],
    getSelectedValueFor: (state) => {
      return (region: string) => state.dataset.valueFor(state.year, region, true);
    },
  },
  actions: {
    clearSelectedRegion() {
      this.selectedRegion = "";
    },
    addHighlightedRegion(value: string) {
      this.highlightedRegions = this.highlightedRegions.concat([value]);
    },
    removeHighlightedRegion(value: string) {
      this.highlightedRegions = removeByValue(this.highlightedRegions, value);
    },
    clearHighlightedRegions() {
      this.highlightedRegions = [];
    },
  },
});
