<script lang="ts">
import _ from "lodash";
import DataDetailsPanel from "@/components/DataDetailsPanel.vue";
import DataSelectionBar from "@/components/DataSelectionBar.vue";
import InfoPanel from "@/components/InfoPanel.vue";
import KeyWindow from "@/components/KeyWindow.vue";
import RegionsMap from "@/components/RegionsMap.vue";
import { useCurrent } from "@/store";
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
      current: useCurrent(),
      theme: useTheme(),
    };
  },
  computed: {
    toggleThemeButtonIcon() {
      return this.theme.global.current.dark ? "$weatherNigh" : "$weatherSunny";
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
        <DataDetailsPanel v-if="current.dataset.isDataDownloaded" />
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
