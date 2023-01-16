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
  <Navbar
    :class="{
      'bg-dark': this.options.isDarkMode,
      'border-bottom-0': this.options.isDarkMode,
    }"
  />
  <MenuOffcanvas />
  <DataSelectionBar />
  <KeyWindow />
  <RegionsInfoPanel />

  <div
    id="main"
    class="row m-0"
    :class="{ 'bg-grey-800': this.options.isDarkMode }"
  >
    <DataDetailsPanel
      v-if="this.options.dataset.isDataDownloaded"
      :class="{
        'bg-dark': this.options.isDarkMode,
        'border-end-0': this.options.isDarkMode,
      }"
    />
    <RegionsMap v-if="this.options.dataset.isDataDownloaded" />
  </div>
</template>

<style>
.bg-grey-800 {
  background-color: var(--bs-gray-800);
}
</style>
