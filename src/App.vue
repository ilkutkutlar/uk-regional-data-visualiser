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
    this.selected.dataset.downloadData().then(() => {});
    this.selected.$subscribe((mutation, state) => {
      if (mutation.events.key !== "dataset") return;
      state.dataset.downloadData().then(() => {
        this.selected.setTimePeriod(state.dataset.timePeriods.slice(-1)[0]);
      });
    });
  },
  computed: {
    data() {
      return this.selected.dataset.data[this.selected.timePeriod];
    },
  },
  data() {
    return {
      selected: selected(),
      infoPanelRegionId: "",
    };
  },
  methods: {
    regionMouseOver(d) {
      this.selected.addHighlightedRegion(d.target.id);
      if (this.selected.selectedRegion) return;
      this.infoPanelRegionId = d.target.id;
    },
    regionMouseOut(d) {
      if (d.target.id !== this.selected.selectedRegion) {
        this.selected.removeHighlightedRegion(d.target.id);
      }
      if (this.selected.selectedRegion) return;
      this.infoPanelRegionId = "";
    },
    regionClick(d) {
      if (this.selected.selectedRegion) {
        this.selected.removeHighlightedRegion(this.selected.selectedRegion);
      }
      this.selected.$patch({
        selectedRegion: d.target.id,
        highlightedRegions: [d.target.id],
      });
      this.infoPanelRegionId = d.target.id;
      this.$refs.regionsMap.centreRegion(d.target.id);
    },
    dataRowMouseEnter(regionId) {
      this.selected.setHighlightedRegions([regionId]);
    },
    dataRowMouseLeave() {
      this.selected.clearHighlightedRegions();
    },
    infoPanelCloseButtonClicked() {
      this.infoPanelRegionId = "";
      if (this.selected.selectedRegion) this.selected.clearHighlightedRegions();
      this.selected.clearSelectedRegion();
    },
  },
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar />
  <KeyWindow />
  <RegionsInfoPanel
    :regionId="this.infoPanelRegionId"
    @closeButtonClicked="this.infoPanelCloseButtonClicked"
  />

  <div id="main" class="row m-0">
    <DataDetailsPanel
      v-if="this.selected.dataset.isDataDownloaded"
      @dataRowMouseEnter="this.dataRowMouseEnter"
      @dataRowMouseLeave="this.dataRowMouseLeave"
    />
    <RegionsMap
      ref="regionsMap"
      v-if="this.selected.dataset.isDataDownloaded"
      @regionMouseOver="this.regionMouseOver"
      @regionMouseOut="this.regionMouseOut"
      @regionClick="this.regionClick"
    />
  </div>
</template>
