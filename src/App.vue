<script lang="ts">
import _ from "lodash";
import DataDetailsPanel from "@/components/DataDetailsPanel.vue";
import DataSelectionBar from "@/components/DataSelectionBar.vue";
import { type Dataset } from "@/dataset";
import { earnings } from "@/datasets/earnings";
import InfoPanel from "@/components/InfoPanel.vue";
import KeyWindow from "@/components/KeyWindow.vue";
import RegionsMap from "@/components/RegionsMap.vue";
import { useTheme } from "vuetify";

export default {
  components: {
    KeyWindow,
    InfoPanel,
    DataDetailsPanel,
    DataSelectionBar,
    RegionsMap,
  },
  inject: ["allDatasets"],
  data() {
    return {
      theme: useTheme(),
      highlightedRegionId: "" as string,
      selectedRegionId: "" as string,
      dataset: earnings as Dataset,
      year: "2021" as string,
      isDrawerOpen: true as boolean,
    };
  },
  computed: {
    toggleThemeButtonIcon() {
      return this.theme.global.current.dark ? "$weatherNigh" : "$weatherSunny";
    },
    geoJsonFilePath() {
      const maybeFilePath = this.dataset.boundaries.boundariesFiles.get(
        this.year,
      )?.filePath;
      if (!maybeFilePath) {
        throw new Error(
          `No file path found for the GeoJSON file for year ${this.year}`,
        );
      }
      return maybeFilePath;
    },
    /**
     * Get the ID property for the GeoJSON file for a given year. This is the property
     * of each feature in the GeoJSON file that contain the code for the region the
     * feature depicts.
     * @throws Will throw an error if the year is not found in the boundaries files.
     */
    geoJsonIdProperty() {
      const maybeIdProperty = this.dataset.boundaries.boundariesFiles.get(
        this.year,
      )?.idProperty;
      if (!maybeIdProperty) {
        throw new Error(
          `No ID property found for the GeoJSON file for year ${this.year}`,
        );
      }
      return maybeIdProperty;
    },
  },
  watch: {
    dataset(newDataset) {
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
    deselectRegion() {
      if (this.selectedRegionId) this.highlightedRegionId = "";
      this.selectedRegionId = "";
    },
    onDataRowClick(regionId: string) {
      this.selectedRegionId = regionId;
    },
    onDataRowMouseEnter(regionId: string) {
      this.highlightedRegionId = regionId;
    },
    onDataRowMouseLeave(regionId: string) {
      if (regionId === this.selectedRegionId) return;
      this.highlightedRegionId = "";
    },
    onRegionSingleClick(regionId: string) {
      this.selectedRegionId = regionId;
    },
    onRegionPointerMove(regionId: string) {
      this.highlightedRegionId = regionId;
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
        <v-toolbar-title>UK Regional Data Visualiser</v-toolbar-title>
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
          @data-row-click="onDataRowClick"
          @data-row-mouse-enter="onDataRowMouseEnter"
          @data-row-mouse-leave="onDataRowMouseLeave"
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
          :year="year"
          :selected-region-id="selectedRegionId"
          :dataset="dataset"
          :geo-json-id-property="geoJsonIdProperty"
          :geo-json-file-path="geoJsonFilePath"
          @region-single-click="onRegionSingleClick"
          @region-pointer-move="onRegionPointerMove"
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
</style>
