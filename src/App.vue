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
    otherTimePeriods() {
      const currentIndex = this.dataset.timePeriods.indexOf(this.timePeriod);
      const timePeriods = this.dataset.timePeriods;
      if (currentIndex == 0) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 2],
            timePeriods[currentIndex + 1],
            this.timePeriod,
          ];
        } else if (timePeriods.length == 2) {
          return [timePeriods[currentIndex + 1], this.timePeriod];
        } else {
          return [this.timePeriod];
        }
      } else if (currentIndex == 1) {
        if (timePeriods.length >= 3) {
          return [
            timePeriods[currentIndex + 1],
            this.timePeriod,
            timePeriods[currentIndex - 1],
          ];
        } else {
          return [this.timePeriod, this.dataset.timePeriods[currentIndex - 1]];
        }
      } else {
        return [
          this.timePeriod,
          this.dataset.timePeriods[currentIndex - 1],
          this.dataset.timePeriods[currentIndex - 2],
        ];
      }
    },
    infoPanelBodyText() {
      return this.otherTimePeriods
        .map((year) => {
          const value = this.dataset.valueForArea(
            year,
            this.infoPanelRegionId,
            true
          );
          if (year == this.timePeriod) {
            return `<div style="background-color: lightgrey; padding-top: 0.3em; padding-bottom: 0.3em"><span class='fw-bold'>${year}</span>: ${value}</div>`;
          }
          return `<div><span class='fw-bold'>${year}</span>: ${value}</div>`;
        })
        .join("");
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
      selectedRegion: null,
      infoPanelRegionId: null,
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
      this.infoPanelRegionId = null;
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
      this.infoPanelRegionId = null;
      if (this.selectedRegion) this.highlightedRegions = [];
      this.selectedRegion = null;
    },
  },
};
</script>

<template>
  <Navbar />
  <MenuOffcanvas />
  <DataSelectionBar :dataset="this.dataset" :timePeriod="this.timePeriod" />
  <KeyWindow :dataset="this.dataset" />
  <InfoPanel
    :titleText="this.keyFormatter(this.infoPanelRegionId)"
    :bodyText="this.infoPanelBodyText"
    :visible="this.infoPanelRegionId"
    :closeButtonVisible="this.selectedRegion"
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
