import type { Dataset } from "@/dataset";
import { defineStore } from "pinia";
import { earnings } from "@/datasets/earnings";

export const useCurrent = defineStore("current", {
  state: () => ({
    dataset: earnings as Dataset,
    year: "2021" as string,
    isDarkMode: false as boolean,
    drawer: false as boolean,
    highlightedRegionId: "" as string,
    selectedRegionId: "" as string,
  }),
  getters: {
    dataForCurrentYear: (state) => state.dataset.data[state.year],
  },
  actions: {
    setYear(newYear: string) {
      this.year = newYear;
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
