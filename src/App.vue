<script lang="ts">
import _ from "lodash";
import DataDetailsPanel from "@/components/DataDetailsPanel.vue";
import DataSelectionBar from "@/components/DataSelectionBar.vue";
import InfoPanel from "@/components/InfoPanel.vue";
import KeyWindow from "@/components/KeyWindow.vue";
import RegionsMap from "@/components/RegionsMap.vue";
import { useCurrent } from "@/store";
import { useTheme } from "vuetify";
import type { Dataset } from "./dataset";
import { earnings } from "./datasets/earnings";

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
      current: useCurrent(),
      theme: useTheme(),
      highlightedRegionId: "" as string,
      selectedRegionId: "" as string,
      dataset: earnings as Dataset,
    };
  },
  computed: {
    toggleThemeButtonIcon() {
      return this.theme.global.current.dark ? "$weatherNigh" : "$weatherSunny";
    },
  },
  watch: {
    dataset(newDataset) {
      this.highlightedRegionId = "";
      this.selectedRegionId = "";
      newDataset
        .downloadData()
        .then(() => this.current.setYear(_.last(newDataset.years)));
    },
  },
  mounted() {
    this.current.$onAction(({ name, store, after }) => {
      switch (name) {
        case "setYear":
          this.highlightedRegionId = "";
          this.selectedRegionId = "";
          break;
      }
    });
    this.dataset.downloadData().then(() => {});
  },
  methods: {
    toggleTheme() {
      this.theme.global.name = this.theme.global.current.dark
        ? "light"
        : "dark";
    },
    onResize() {
      this.current.drawer = window.innerWidth >= 992;
    },
    deselectRegion() {
      if (this.selectedRegionId) this.highlightedRegionId = "";
      this.selectedRegionId = "";
    },
    onDataRowClick(region: string) {
      this.selectedRegionId = region;
    },
    onDataRowMouseEnter(region: string) {
      this.highlightedRegionId = region;
    },
    onDataRowMouseLeave(region: string) {
      if (region === this.selectedRegionId) return;
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
          @click.stop="current.toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>UK Regional Data Visualiser</v-toolbar-title>
        <v-btn :icon="toggleThemeButtonIcon" @click="toggleTheme"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="current.drawer"
        location="left"
        permanent
        :width="400"
        color="secondary"
      >
        <DataDetailsPanel
          v-if="dataset.isDataDownloaded"
          v-model:current-year="current.year"
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
              @click="current.toggleDrawer"
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
          :selected-year="current.year"
          :selected-region-id="selectedRegionId"
          :highlighted-region-id="highlightedRegionId"
          @close-button-clicked="deselectRegion"
        />
        <DataSelectionBar
          :dataset-name="dataset.metadata.name"
          :selected-year="current.year"
          @toggle-drawer-button-clicked="current.toggleDrawer"
        />
        <RegionsMap
          v-if="dataset.isDataDownloaded"
          v-model:highlighted-region-id="highlightedRegionId"
          :year="current.year"
          :selected-region-id="selectedRegionId"
          :dataset="dataset"
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
