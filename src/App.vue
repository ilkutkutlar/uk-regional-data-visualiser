<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import RegionsInfoPanel from "./components/RegionsInfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { removeByValue } from "./utils";
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
  },
  computed: {
    data() {
      return this.selected.dataset.data[this.selected.timePeriod];
    },
  },
  watch: {
    dataset(newDataset) {
      newDataset.downloadData().then(() => {
        this.setTimePeriod(newDataset.timePeriods.slice(-1)[0]);
      });
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
      this.selected.setSelectedRegion(d.target.id);
      this.selected.setHighlightedRegions([d.target.id]);
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
  <DataSelectionBar
    :dataset="this.selected.dataset"
    :timePeriod="this.selected.timePeriod"
  />
  <KeyWindow :dataset="this.selected.dataset" />
  <RegionsInfoPanel
    :dataset="this.selected.dataset"
    :timePeriod="this.selected.timePeriod"
    :regionId="this.infoPanelRegionId"
    :selectedRegionId="this.selected.selectedRegion"
    @closeButtonClicked="this.infoPanelCloseButtonClicked"
  />

  <div id="main" class="row m-0">
    <DataDetailsPanel
      v-if="this.selected.dataset.isDataDownloaded"
      v-model:dataset="this.selected.dataset"
      v-model:timePeriod="this.selected.timePeriod"
      @dataRowMouseEnter="this.dataRowMouseEnter"
      @dataRowMouseLeave="this.dataRowMouseLeave"
    />
    <RegionsMap
      ref="regionsMap"
      v-if="this.selected.dataset.isDataDownloaded"
      :dataset="this.selected.dataset"
      :timePeriod="this.selected.timePeriod"
      :highlightedRegions="this.selected.highlightedRegions"
      @regionMouseOver="this.regionMouseOver"
      @regionMouseOut="this.regionMouseOut"
      @regionClick="this.regionClick"
    />
  </div>
</template>
