<script>
import { useCurrent } from "../store";
import _ from "lodash";

export default {
  inject: ["allDatasets"],
  computed: {
    yearSelectItems() {
      /* This is a computed property because `years`
         uses the "data" property, which is downloaded
         asynchronously, and might not have been downloaded
         when this template has been initialised. Make it
         a computed property so it is updated when data
         has been downloaded */
      return this.current.dataset.years;
    },
    filteredData() {
      let data = this.current.dataset.data[this.current.year] ?? {};
      if (this.searchText) {
        data = _.pickBy(data, (_, key) => {
          const formatted = this.keyFormatter(key) ?? "";
          return formatted
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      }
      return _.chain(data)
        .toPairs()
        .sortBy((item) => item[1])
        .reverse()
        .fromPairs()
        .value();
    },
    selectedYear: {
      get() {
        return this.current.year;
      },
      set(value) {
        this.current.$patch({ year: value });
      },
    },
    selectedDataset: {
      get() {
        return this.current.dataset.metadata.id;
      },
      set(value) {
        this.current.dataset = this.allDatasets.find(
          (dataset) => dataset.metadata.id == value
        );
      },
    },
  },
  methods: {
    dataRowMouseEnter(region) {
      this.current.addHighlightedRegion(region);
    },
    dataRowMouseLeave(region) {
      if (region === this.current.selectedRegion) return;
      this.current.removeHighlightedRegion(region);
    },
    dataRowClick(region) {
      this.current.$patch({
        selectedRegion: region,
        highlightedRegions: [region],
      });
    },
  },
  data() {
    return {
      current: useCurrent(),
      dataSelectItems: this.allDatasets.map((dataset) => {
        return { value: dataset.metadata.id, text: dataset.metadata.name };
      }),
      keyFormatter: (region) =>
        this.current.dataset.svgMap.prettyNames.get(region),
      searchText: "",
      tab: null,
    };
  },
};
</script>

<template>
  <v-container>
    <v-select
      variant="outlined"
      label="Choose a dataset"
      item-title="text"
      item-value="value"
      :items="dataSelectItems"
      v-model="selectedDataset"
    ></v-select>
    <v-select
      variant="outlined"
      label="Choose a year"
      :items="yearSelectItems"
      v-model="selectedYear"
      attach
    ></v-select>

    <v-tabs v-model="tab" align-tabs="center" grow>
      <v-tab value="metadata">Metadata</v-tab>
      <v-tab value="data">Data</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="metadata">
        <v-card
          class="mt-5 border"
          prepend-icon="mdi-card-text-outline"
          variant="flat"
        >
          <template #title> Description </template>
          <template #text>
            {{ current.dataset.metadata.description }}
          </template>
        </v-card>
        <v-card
          class="mt-5 border"
          prepend-icon="mdi-link-variant"
          variant="flat"
        >
          <template #title> Source </template>
          <template #text>
            <a
              :href="current.dataset.metadata.sourceLink"
              class="d-block"
              target="blank"
            >
              {{ current.dataset.metadata.source }}
            </a>
          </template>
        </v-card>

        <v-card
          class="mt-5 border"
          prepend-icon="mdi-land-fields"
          variant="flat"
        >
          <template #title> Boundaries </template>
          <template #text> {{ current.dataset.metadata.boundaries }} </template>
        </v-card>
      </v-window-item>

      <v-window-item value="data">
        <v-text-field
          class="mt-5"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search data..."
          v-model="searchText"
          variant="outlined"
        ></v-text-field>

        <v-table class="rounded border">
          <tbody>
            <tr
              v-for="(value, region) in filteredData"
              class="cursor-pointer"
              :class="{ selected: this.current.selectedRegion === region }"
              :key="region"
              @click="() => dataRowClick(region)"
              @mouseenter="() => dataRowMouseEnter(region)"
              @mouseleave="() => dataRowMouseLeave(region)"
            >
              <td>{{ keyFormatter(region) }}</td>
              <td>
                <span class="font-weight-bold">{{
                  current.dataset.valueFormatter(value)
                }}</span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style>
tr:hover {
  color: #26a69a;
  background-color: rgb(var(--v-theme-primary), var(--v-selected-opacity));
}

.selected {
  background-color: rgb(var(--v-theme-primary), var(--v-selected-opacity));
}

.cursor-pointer {
  cursor: pointer;
}

a:link,
a:visited {
  color: rgb(var(--v-theme-primary));
}

a:hover {
  color: rgb(var(--v-theme-primary-darken-1));
}

.v-list.bg-transparent {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>
