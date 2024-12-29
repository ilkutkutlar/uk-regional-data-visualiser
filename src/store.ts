import { defineStore } from "pinia";
import type { Dataset } from "./dataset";
import { earnings } from "./datasets/earnings";
import _ from "lodash";

export const useCurrent = defineStore("current", {
  state: () => ({
    dataset: earnings as Dataset,
    year: "2021" as string,
    isDarkMode: false as boolean,
    drawer: false as boolean,
    highlightedRegionID: "" as string,
    selectedRegionID: "" as string,
  }),
  getters: {
    dataForCurrentYear: (state) => state.dataset.data[state.year],
  },
  actions: {
    clearSelected() {
      this.$patch({ selectedRegionID: "" });
    },
    clearHighlighted() {
      this.$patch({
        highlightedRegionID: "",
      });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
