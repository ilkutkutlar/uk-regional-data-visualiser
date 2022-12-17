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
      isDataDownloaded: false,
      infoPanelVisible: false,
      infoPanelCloseButtonVisible: false,
      infoPanelTitleText: "",
      infoPanelBodyText: "",
    };
  },
  methods: {
    setInfoPanelToRegionDetails(regionId) {
      this.infoPanelTitleText = this.keyFormatter(regionId);
      const regionValue = this.data ? this.data[regionId] : "";
      this.infoPanelBodyText = this.dataset.valueFormatter(regionValue);
    },
    mouseOver(d) {
      this.highlightedRegions = this.highlightedRegions.concat([d.target.id]);
      if (!this.selectedRegion) {
        this.setInfoPanelToRegionDetails(d.target.id);
        this.infoPanelVisible = true;
      }
    },
    mouseOut(d) {
      if (d.target.id !== this.selectedRegion) {
        this.highlightedRegions = removeByValue(
          this.highlightedRegions,
          d.target.id
        );
      }
      if (!this.selectedRegion) {
        this.infoPanelVisible = false;
      }
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
      this.setInfoPanelToRegionDetails(regionId);
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
      this.infoPanelVisible = false;
      if (this.selectedRegion) this.highlightedRegions = [];
      this.selectedRegion = null;
    },
  },
  mounted() {
    this.dataset.downloadData().then(() => {
      this.isDataDownloaded = true;
    });
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
      this.isDataDownloaded = false;
      newDataset.downloadData().then(() => {
        this.timePeriod = this.dataset.timePeriods.slice(-1)[0];
        this.isDataDownloaded = true;
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
    :titleText="this.infoPanelTitleText"
    :bodyText="this.infoPanelBodyText"
    :visible="this.infoPanelVisible"
    :closeButtonVisible="this.infoPanelCloseButtonVisible"
    @closeButtonClicked="this.closeButtonClicked"
  />

  <div id="main" class="row m-0">
    <DataDetailsPanel
      v-if="this.isDataDownloaded"
      v-model:dataset="this.dataset"
      v-model:timePeriod="this.timePeriod"
      @dataRowMouseEnter="this.dataRowMouseEnter"
      @dataRowMouseLeave="this.dataRowMouseLeave"
    />
    <RegionsMap
      ref="regionsMap"
      v-if="this.isDataDownloaded"
      :dataset="this.dataset"
      :timePeriod="this.timePeriod"
      :highlightedRegions="this.highlightedRegions"
      @regionMouseOver="this.mouseOver"
      @regionMouseOut="this.mouseOut"
      @regionClick="this.click"
    />
  </div>
</template>
