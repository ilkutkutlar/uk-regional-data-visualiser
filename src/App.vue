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
      perCapita: false,
      infoPanelVisible: false,
      infoPanelCloseButtonVisible: false,
      infoPanelTitleText: "",
      infoPanelBodyText: "",
    };
  },
  methods: {
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
    setInfoPanelToRegionDetails(regionId) {
      const keyFormatter = (area) => this.dataset.svgMap.prettyNames[area];
      this.infoPanelTitleText = keyFormatter(regionId);

      const data = this.dataset.data[this.timePeriod];
      const regionValue = data ? data[regionId] : "";
      this.infoPanelBodyText = this.dataset.valueFormatter(regionValue);
    },
    dataRowMouseEnter(regionId) {
      this.highlightedRegions = [regionId];
    },
    dataRowMouseLeave() {
      this.highlightedRegions = [];
    },
  },
  mounted() {
    this.dataset.downloadData().then(() => {
      this.isDataDownloaded = true;
    });
  },
  watch: {
    dataset(newDataset) {
      this.isDataDownloaded = false;
      newDataset.downloadData().then(() => {
        this.timePeriod = this.dataset.timePeriods.slice(-1)[0];
        this.isDataDownloaded = true;
      });
    },
    perCapita(isShowPerCapita) {
      console.log(isShowPerCapita);
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
    @closeButtonClicked="
      () => {
        this.infoPanelVisible = false;
        if (this.selectedRegion) this.highlightedRegions = [];
        this.selectedRegion = null;
      }
    "
  />

  <div id="main" class="row m-0">
    <DataDetailsPanel
      v-if="this.isDataDownloaded"
      v-model:dataset="this.dataset"
      v-model:timePeriod="this.timePeriod"
      v-model:perCapita="this.perCapita"
      @dataRowMouseEnter="dataRowMouseEnter"
      @dataRowMouseLeave="dataRowMouseLeave"
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
