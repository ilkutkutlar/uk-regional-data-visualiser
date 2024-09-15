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
    highlighted: "" as string,
    selected: "" as string,
  }),
  getters: {
    dataForCurrentYear: (state) => state.dataset.data[state.year],
  },
  actions: {
    clearSelected() {
      this.$patch({ selected: "" });
    },
    // selectRegion(value: string) {
    //   this.$patch({
    //     selectedRegion: value,
    //   });
    // },
    clearHighlighted() {
      this.$patch({
        highlighted: "",
      });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
