<script>
import _ from "lodash";
import { useTheme } from "vuetify";

import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { useCurrent } from "./store";

export default {
  inject: ["allDatasets"],
  components: {
    KeyWindow,
    InfoPanel,
    DataDetailsPanel,
    DataSelectionBar,
    RegionsMap,
  },
  data() {
    return {
      current: useCurrent(),
      theme: useTheme(),
    };
  },
  computed: {
    toggleThemeButtonIcon() {
      return this.theme.global.current.dark
        ? "mdi-weather-night"
        : "mdi-weather-sunny";
    },
  },
  mounted() {
    this.current.$onAction(({ name, store, after }) => {
      switch (name) {
        case "setYear":
          this.current.clearHighlighted();
          this.current.clearSelected();
          break;
        case "setDataset":
          this.current.clearHighlighted();
          this.current.clearSelected();
          after(() => {
            store.dataset
              .downloadData()
              .then(() => this.current.setYear(_.last(store.dataset.years)));
          });
      }
    });
    this.current.dataset.downloadData().then(() => {});
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
  },
};
</script>

<template>
  <v-app v-resize="onResize">
    <v-layout>
      <v-app-bar prominent color="primary">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="this.current.toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Maps of Britain</v-toolbar-title>
        <v-btn @click="toggleTheme" :icon="toggleThemeButtonIcon"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="this.current.drawer"
        location="left"
        permanent
        :width="400"
        color="secondary"
      >
        <DataDetailsPanel v-if="current.dataset.isDataDownloaded" />
        <template v-slot:append>
          <v-container>
            <v-btn
              prepend-icon="mdi-close"
              block
              color="primary"
              variant="tonal"
              @click="this.current.toggleDrawer"
              >Close</v-btn
            >
          </v-container>
        </template>
      </v-navigation-drawer>

      <v-main id="main">
        <KeyWindow />
        <InfoPanel />
        <DataSelectionBar />
        <RegionsMap v-if="current.dataset.isDataDownloaded" />
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
