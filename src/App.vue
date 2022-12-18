<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
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
    InfoPanel,
    DataDetailsPanel,
    RegionsMap,
  },
  data() {
    return {
      dataset: this.allDatasets[0],
      timePeriod: "2021",
      highlightedRegions: [],
      selectedRegion: null,
      infoPanelVisible: false,
      infoPanelRegionId: null,
      infoPanelCloseButtonVisible: false,
    };
  },
  methods: {
    mouseOver(d) {
      this.highlightedRegions = this.highlightedRegions.concat([d.target.id]);
      if (this.selectedRegion) return;
      this.infoPanelRegionId = d.target.id;
    },
    mouseOut(d) {
      if (d.target.id !== this.selectedRegion) {
        this.highlightedRegions = removeByValue(
          this.highlightedRegions,
          d.target.id
        );
      }
      if (this.selectedRegion) return;
      this.infoPanelRegionId = null;
    },
    click(d) {
      const regionId = d.target.id;
      if (this.selectedRegion) {
        this.highlightedRegions = removeByValue(
          this.highlightedRegions,
          this.selectedRegion
        );
      }
      this.selectedRegion = regionId;
      this.highlightedRegions = [regionId];
      this.infoPanelRegionId = regionId;
      this.infoPanelCloseButtonVisible = true;
      this.$refs.regionsMap.centreRegion(regionId);
    },
    dataRowMouseEnter(regionId) {
      this.highlightedRegions = [regionId];
    },
    dataRowMouseLeave() {
      this.highlightedRegions = [];
    },
    closeButtonClicked() {
      this.infoPanelRegionId = null;
      this.infoPanelCloseButtonVisible = false;
      if (this.selectedRegion) this.highlightedRegions = [];
      this.selectedRegion = null;
    },
  },
  mounted() {
    this.dataset.downloadData().then(() => {});
  },
  computed: {
    keyFormatter() {
      return (area) => this.dataset.svgMap.prettyNames[area];
    },
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
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar />
  <KeyWindow :dataset="this.dataset" />
  <InfoPanel
    :titleText="this.keyFormatter(this.infoPanelRegionId)"
    :bodyText="
      this.dataset.valueFormatter(
        this.dataset.valueForArea(this.timePeriod, this.infoPanelRegionId)
      )
    "
    :visible="this.infoPanelRegionId"
    :closeButtonVisible="this.infoPanelCloseButtonVisible"
    @closeButtonClicked="this.closeButtonClicked"
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
      @regionMouseOver="this.mouseOver"
      @regionMouseOut="this.mouseOut"
      @regionClick="this.click"
    />
  </div>
</template>
