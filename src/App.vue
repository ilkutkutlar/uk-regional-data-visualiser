<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { useCurrent } from "./store";
import _ from "lodash";

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
            this.current.$patch({ year: _.last(state.dataset.years) });
          });
          break;
        case "year":
          this.current.clearHighlightedRegions();
          this.current.clearSelectedRegion();
          break;
      }
    });
    this.current.dataset.downloadData().then(() => {});
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
  <!-- <MenuOffcanvas /> -->
  <!-- <DataSelectionBar /> -->
  <KeyWindow />
  <InfoPanel />

  <v-row no-gutters>
    <v-col cols="3">
      <DataDetailsPanel v-if="current.dataset.isDataDownloaded" />
    </v-col>
    <v-col cols="9">
      <RegionsMap v-if="current.dataset.isDataDownloaded" />
    </v-col>
  </v-row>
</template>

<style>
@media (min-width: 992px) {
  .offcanvas-side-panel-lg {
    visibility: visible !important;
    /* transform: none !important; */
    width: 25% !important;
    height: 94vh !important;
    top: unset !important;
    padding: 0 !important;
    border-right: 1px solid #dee2e6 !important;
    /* background-color: #e9ecef !important; */
  }

  .position-relative-lg {
    position: relative !important;
  }
}
</style>
