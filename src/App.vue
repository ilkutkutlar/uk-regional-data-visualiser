<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import RegionsInfoPanel from "./components/RegionsInfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { selected } from "./store";

export default {
  inject: ["allDatasets"],
  components: {
    Navbar,
    MenuOffcanvas,
    DataSelectionBar,
    KeyWindow,
    RegionsInfoPanel,
    DataDetailsPanel,
    RegionsMap,
  },
  mounted() {
    this.selected.$subscribe((mutation, state) => {
      if (mutation.events.key !== "dataset") return;
      state.dataset.downloadData().then(() => {
        this.selected.timePeriod = state.dataset.timePeriods.slice(-1)[0];
      });
    });
    this.selected.dataset.downloadData().then(() => {});
  },
  data() {
    return {
      selected: selected(),
    };
  },
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar />
  <KeyWindow />
  <RegionsInfoPanel />

  <div id="main" class="row m-0">
    <DataDetailsPanel v-if="this.selected.dataset.isDataDownloaded" />
    <RegionsMap
      ref="regionsMap"
      v-if="this.selected.dataset.isDataDownloaded"
    />
  </div>
</template>
