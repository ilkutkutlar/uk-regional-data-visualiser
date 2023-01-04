<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import RegionsInfoPanel from "./components/RegionsInfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { removeByValue } from "./utils";

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
    this.dataset.downloadData().then(() => {});
  },
  computed: {
    data() {
      return this.dataset.data[this.timePeriod];
    },
  },
  watch: {
    dataset(newDataset) {
      newDataset.downloadData().then(() => {
        this.timePeriod = newDataset.timePeriods.slice(-1)[0];
      });
    },
  },
  data() {
    return {
      dataset: this.allDatasets[0],
      timePeriod: "2021",
      highlightedRegions: [],
      selectedRegion: "",
      infoPanelRegionId: "",
    };
  },
  methods: {
    regionMouseOver(d) {
      this.highlightedRegions = this.highlightedRegions.concat([d.target.id]);
      if (this.selectedRegion) return;
      this.infoPanelRegionId = d.target.id;
    },
    regionMouseOut(d) {
      if (d.target.id !== this.selectedRegion) {
        this.highlightedRegions = removeByValue(
          this.highlightedRegions,
          d.target.id
        );
      }
      if (this.selectedRegion) return;
      this.infoPanelRegionId = "";
    },
    regionClick(d) {
      if (this.selectedRegion) {
        this.highlightedRegions = removeByValue(
          this.highlightedRegions,
          this.selectedRegion
        );
      }
      this.selectedRegion = d.target.id;
      this.highlightedRegions = [d.target.id];
      this.infoPanelRegionId = d.target.id;
      this.$refs.regionsMap.centreRegion(d.target.id);
    },
    dataRowMouseEnter(regionId) {
      this.highlightedRegions = [regionId];
    },
    dataRowMouseLeave() {
      this.highlightedRegions = [];
    },
    infoPanelCloseButtonClicked() {
      this.infoPanelRegionId = "";
      if (this.selectedRegion) this.highlightedRegions = [];
      this.selectedRegion = "";
    },
  },
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar :dataset="this.dataset" :timePeriod="this.timePeriod" />
  <KeyWindow :dataset="this.dataset" />
  <RegionsInfoPanel
    :dataset="this.dataset"
    :timePeriod="this.timePeriod"
    :regionId="this.infoPanelRegionId"
    :selectedRegionId="this.selectedRegion"
    @closeButtonClicked="this.infoPanelCloseButtonClicked"
  />

  <div id="main" class="row m-0">
    <DataDetailsPanel
      v-if="this.dataset.isDataDownloaded"
      v-model:dataset="this.dataset"
      v-model:timePeriod="this.timePeriod"
      @dataRowMouseEnter="this.dataRowMouseEnter"
      @dataRowMouseLeave="this.dataRowMouseLeave"
    />
    <RegionsMap
      ref="regionsMap"
      v-if="this.dataset.isDataDownloaded"
      :dataset="this.dataset"
      :timePeriod="this.timePeriod"
      :highlightedRegions="this.highlightedRegions"
      @regionMouseOver="this.regionMouseOver"
      @regionMouseOut="this.regionMouseOut"
      @regionClick="this.regionClick"
    />
  </div>
</template>
