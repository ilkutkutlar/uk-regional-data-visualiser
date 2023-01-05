import { defineStore } from "pinia";
import type { Dataset } from "./dataset";
import { earnings } from "./datasets/earnings";
import { removeByValue } from "./utils";

export const selected = defineStore("selected", {
  state: () => ({
    dataset: earnings as Dataset,
    timePeriod: "2021" as string,
    highlightedRegions: [] as Array<string>,
    selectedRegion: "" as string,
  }),
  getters: {},
  actions: {
    setDataset(value: Dataset) {
      this.dataset = value;
    },
    setTimePeriod(value: string) {
      this.timePeriod = value;
    },
    setSelectedRegion(value: string) {
      this.selectedRegion = value;
    },
    clearSelectedRegion() {
      this.selectedRegion = "";
    },
    setHighlightedRegions(value: Array<string>) {
      this.highlightedRegions = value;
    },
    addHighlightedRegion(value: string) {
      this.setHighlightedRegions(this.highlightedRegions.concat([value]));
    },
    removeHighlightedRegion(value: string) {
      this.setHighlightedRegions(removeByValue(this.highlightedRegions, value));
    },
    clearHighlightedRegions() {
      this.setHighlightedRegions([]);
    },
  },
});
