<script lang="ts">
import _ from "lodash";
import { useTheme } from "vuetify";

import DataDetailsPanel from "@/components/DataDetailsPanel.vue";
import DataSelectionBar from "@/components/DataSelectionBar.vue";
import { earnings } from "@/datasets/earnings";
import InfoPanel from "@/components/InfoPanel.vue";
import KeyWindow from "@/components/KeyWindow.vue";
import { type RegionalDataset } from "@/dataset";

export default {
  components: {
    KeyWindow,
    InfoPanel,
    DataDetailsPanel,
    DataSelectionBar,
  },
  data() {
    return {
      theme: useTheme(),
      highlightedRegionId: "" as string,
      selectedRegionId: "" as string,
      dataset: earnings as RegionalDataset,
      year: "2021" as string,
      isDrawerOpen: true as boolean,
    };
  },
  computed: {
    toggleThemeButtonIcon() {
      return this.theme.global.current.dark ? "$weatherNight" : "$weatherSunny";
    },
    regionColours() {
      const mapping = new Map();

      for (const [regionCode, regionValue] of Object.entries(
        this.dataset.tables[this.year].data,
      )) {
        mapping.set(
          regionCode,
          this.dataset.colourMap.mapValueToColour(regionValue),
        );
      }

      return mapping;
    },
    geoJsonFilePath() {
      const files = this.dataset.boundaries.boundariesFiles;

      const maybePath = files.get(this.year)?.filePath;
      if (maybePath) return maybePath;

      const maybeDefaultPath = files.get("default")?.filePath;
      if (maybeDefaultPath) return maybeDefaultPath;

      throw new Error("Could not find a GeoJSON file path for this year");
    },
    extraViewOptions() {
      return {
        // center: [444377,339011],
        center: [288231,591158],
        minZoom: 7,
        zoom: 7,
        maxZoom: 11,
        // extent: [-532389, -477563, 1210118, 1581434],
        // extent: [-341962,-380064,1375862,1593397]
        // extent: [-749154,-521725,1337519,1833445]
      };
    },
  },
  watch: {
    dataset(newDataset: RegionalDataset) {
      this.highlightedRegionId = "";
      this.selectedRegionId = "";
      newDataset
        .downloadData()
        .then(() => (this.year = _.last(newDataset.years)));
    },
    year() {
      this.highlightedRegionId = "";
      this.selectedRegionId = "";
    },
  },
  mounted() {
    this.dataset.downloadData().then(() => {});
  },
  methods: {
    toggleTheme() {
      this.theme.global.name = this.theme.global.current.dark
        ? "light"
        : "dark";
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    onResize() {
      this.isDrawerOpen = window.innerWidth >= 992;
    },
    selectRegion(regionId: string) {
      this.selectedRegionId = regionId;
    },
    deselectRegion() {
      if (this.selectedRegionId) this.highlightedRegionId = "";
      this.selectedRegionId = "";
    },
    highlightRegion(regionId: string) {
      this.highlightedRegionId = regionId;
    },
    unhighlightRegion(regionId: string) {
      if (regionId === this.selectedRegionId) return;
      this.highlightedRegionId = "";
    },
  },
};
</script>

<template>
  <v-app v-resize="onResize">
    <v-layout>
      <v-app-bar prominent color="primary">
        <v-app-bar-nav-icon
          id="drawer-toggle-button"
          variant="text"
          @click.stop="toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title v-once>UK Regional Data Visualiser</v-toolbar-title>
        <v-btn :icon="toggleThemeButtonIcon" @click="toggleTheme"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="isDrawerOpen"
        location="left"
        permanent
        :width="400"
        color="secondary"
      >
        <DataDetailsPanel
          v-if="dataset.isDataDownloaded"
          v-model:current-year="year"
          v-model:dataset="dataset"
          :selected-region-id="selectedRegionId"
          @data-row-click="selectRegion"
          @data-row-mouse-enter="highlightRegion"
          @data-row-mouse-leave="unhighlightRegion"
        />
        <template #append>
          <v-container>
            <v-btn
              id="close-drawer-button"
              prepend-icon="$close"
              block
              color="primary"
              variant="tonal"
              @click="toggleDrawer"
              >Close</v-btn
            >
          </v-container>
        </template>
      </v-navigation-drawer>

      <v-main id="main">
        <KeyWindow
          :colour-map="dataset.colourMap"
          :value-formatter="dataset.valueFormatter"
        />
        <InfoPanel
          v-if="dataset.isDataDownloaded"
          :dataset="dataset"
          :selected-year="year"
          :selected-region-id="selectedRegionId"
          :highlighted-region-id="highlightedRegionId"
          @close-button-clicked="deselectRegion"
        />
        <DataSelectionBar
          :dataset-name="dataset.metadata.name"
          :selected-year="year"
          @toggle-drawer-button-clicked="toggleDrawer"
        />
        <RegionsMap
          v-if="dataset.isDataDownloaded"
          v-model:highlighted-region-id="highlightedRegionId"
          :extra-view-options="extraViewOptions"
          :selected-region-id="selectedRegionId"
          :region-colours="regionColours"
          :geo-json-file-path="geoJsonFilePath"
          :theme="theme.global.name"
          @region-single-click="selectRegion"
          @region-pointer-move="highlightRegion"
        />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
#main {
  --v-layout-bottom: 0px;
}

@media (max-width: 991.98px) {
  #main {
    --v-layout-bottom: 72px !important;
  }
}

#bottom-card {
  height: var(--v-layout-bottom);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
