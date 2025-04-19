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
    setDataset(newDataset: Dataset) {
      /* `dataset` must be set directly as patching does not
          actually set `dataset` to point to the new dataset,
          instead setting each of its class attributes to
          the new dataset's values, which causes issues. */
      this.dataset = newDataset;
    },
    setYear(newYear: string) {
      this.year = newYear;
    },
    clearSelected() {
      this.$patch({ selectedRegionId: "" });
    },
    clearHighlighted() {
      this.$patch({
        highlightedRegionId: "",
      });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
