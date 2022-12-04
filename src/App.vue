<script>
import Navbar from "./components/NavBar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { earnings } from "./datasets/earnings";
import { hpi } from "./datasets/hpi";
import { gdhi } from "./datasets/gdhi";
import { population } from "./datasets/population";
import { netInternalMigration } from "./datasets/net_internal_migration";
import { pubsAndBars } from "./datasets/pubs_and_bars";
import { removeByValue } from "./utils";
import { PerCapitaConverter } from "./per_capita";

export default {
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
      allDatasets: [
        earnings,
        hpi,
        gdhi,
        population,
        netInternalMigration,
        pubsAndBars,
      ],
      dataset: earnings,
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
      const data = this.dataset.data[this.timePeriod];
      const keyFormatter = (area) => this.dataset.svgMap.prettyNames[area];
      const valueFormatter = this.dataset.stylingOptions.valueFormatter;
      const regionName = keyFormatter(regionId);
      const regionValue = data ? data[regionId] : "";

      this.infoPanelTitleText = regionName;
      this.infoPanelBodyText = valueFormatter(regionValue);
    },
    dataRowMouseEnter(regionId) {
      this.highlightedRegions = [regionId];
    },
    dataRowMouseLeave() {
      this.highlightedRegions = [];
    },
  },
  created() {
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
      :allDatasets="this.allDatasets"
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
