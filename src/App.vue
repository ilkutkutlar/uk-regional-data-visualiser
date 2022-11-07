<script>
import Navbar from "./components/Navbar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { population } from "./datasets/population.ts";

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
      allDatasets: [population],
      dataset: population,
      timePeriod: "2020",
      highlightedRegion: null,
      selectedRegion: null,
      isDataDownloaded: false,
      infoPanelVisible: false,
      infoPanelTitleText: "",
      infoPanelBodyText: "",
    };
  },
  methods: {
    _mouseOver(d) {
      const regionId = d.target.id;
      this.highlightedRegion = regionId;

      if (!this.selectedRegion) {
        const data = this.dataset.data[this.timePeriod];
        const keyFormatter = (area) => this.dataset.svgMap.prettyNames[area];
        const valueFormatter = this.dataset.stylingOptions.valueFormatter;
        const regionName = keyFormatter(regionId);
        const regionValue = data ? data[regionId] : "";

        this.infoPanelTitleText = regionName;
        this.infoPanelBodyText = valueFormatter(regionValue);
        this.infoPanelVisible = true;
      }
    },
    _mouseOut(d) {
      if (this.selectedRegion !== d.target.id) {
        this.highlightedRegion = null;
      }
      if (!this.selectedRegion) {
        this.infoPanelVisible = false;
      }
    },
    _click(d) {
      // this._selectRegion(d.target.id);
    },
  },
  created() {
    // TODO: You can use nextTick here!
    this.dataset.downloadData().then(() => {
      this.isDataDownloaded = true;
    });
  },
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar />
  <KeyWindow />
  <InfoPanel
    :titleText="this.infoPanelTitleText"
    :bodyText="this.infoPanelBodyText"
    :visible="this.infoPanelVisible"
  />

  <div id="main" class="row m-0">
    <DataDetailsPanel :dataset="this.dataset" :allDatasets="this.allDatasets" />
    <RegionsMap
      v-if="this.isDataDownloaded"
      :dataset="this.dataset"
      :timePeriod="this.timePeriod"
      :highlightedRegion="this.highlightedRegion"
      @regionMouseOver="this._mouseOver"
      @regionMouseOut="this._mouseOut"
      @regionClick="this._click"
    />
  </div>
</template>
