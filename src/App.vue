<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { useCurrent } from "./store";
import {
  setPreferredColourSchemeChangedListener,
  setTheme,
  getPreferredTheme,
} from "./colour_mode";

export default {
  inject: ["allDatasets"],
  components: {
    Navbar,
    MenuOffcanvas,
    DataSelectionBar,
    KeyWindow,
    InfoPanel,
    DataDetailsPanel,
    RegionsMap,
  },
  mounted() {
    this.current.$subscribe((mutation, state) => {
      switch (mutation.events.key) {
        case "dataset":
          this.current.clearHighlightedRegions();
          this.current.clearSelectedRegion();
          state.dataset.downloadData().then(() => {
            this.current.year = state.dataset.years.slice(-1)[0];
          });
          break;
        case "year":
          this.current.clearHighlightedRegions();
          this.current.clearSelectedRegion();
          break;
      }
    });
    this.current.dataset.downloadData().then(() => {});
    setTheme(getPreferredTheme());
    setPreferredColourSchemeChangedListener();
  },
  data() {
    return {
      current: useCurrent(),
    };
  },
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar />
  <KeyWindow />
  <InfoPanel />

  <div class="row m-0">
    <DataDetailsPanel v-if="current.dataset.isDataDownloaded" />
    <RegionsMap v-if="current.dataset.isDataDownloaded" />
  </div>
</template>
