<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import RegionsInfoPanel from "./components/RegionsInfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { useOptions } from "./store";

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
    this.options.$subscribe((mutation, state) => {
      if (mutation.events.key !== "dataset") return;
      state.dataset.downloadData().then(() => {
        this.options.year = state.dataset.years.slice(-1)[0];
      });
    });
    this.options.dataset.downloadData().then(() => {});
  },
  data() {
    return {
      options: useOptions(),
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
    <DataDetailsPanel v-if="this.options.dataset.isDataDownloaded" />
    <RegionsMap v-if="this.options.dataset.isDataDownloaded" />
  </div>
</template>
