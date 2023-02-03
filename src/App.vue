<script>
import KeyWindow from "./components/KeyWindow.vue";
import InfoPanel from "./components/InfoPanel.vue";
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import RegionsMap from "./components/RegionsMap.vue";
import { useCurrent } from "./store";
import _ from "lodash";
import { useTheme } from "vuetify";

export default {
  inject: ["allDatasets"],
  components: {
    KeyWindow,
    InfoPanel,
    DataDetailsPanel,
    RegionsMap,
  },
  mounted() {
    this.current.$subscribe((mutation, state) => {
      switch (mutation.events.key) {
        case "dataset":
          this.current.clearHighlightedRegions();
          this.current.clearSelectedRegion();
          state.dataset.downloadData().then(() => {
            this.current.$patch({ year: _.last(state.dataset.years) });
          });
          break;
        case "year":
          this.current.clearHighlightedRegions();
          this.current.clearSelectedRegion();
          break;
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
  },
  data() {
    return {
      current: useCurrent(),
      drawer: true,
      theme: useTheme(),
    };
  },
};
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Maps of Britain</v-toolbar-title>
        <v-btn @click="toggleTheme">toggle theme</v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" permanent>
        <DataDetailsPanel v-if="current.dataset.isDataDownloaded" />
      </v-navigation-drawer>

      <v-main>
        <!-- <KeyWindow />
        <InfoPanel /> -->
        <RegionsMap v-if="current.dataset.isDataDownloaded" />
      </v-main>
    </v-layout>
  </v-app>
</template>
