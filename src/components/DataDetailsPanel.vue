<script>
import { filterDataByKey } from "../utils";
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
        data = filterDataByKey(data, this.keyFormatter, this.searchText);
      }
      return _.fromPairs(
        _.sortBy(_.toPairs(data), (item) => item[1]).reverse()
      );
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
    dataRowMouseLeave() {
      this.current.clearHighlightedRegions();
    },
  },
  data() {
    return {
      current: useCurrent(),
      drawer: true,
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
      class="mt-4"
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
    ></v-select>

    <v-tabs v-model="tab" align-tabs="center" grow>
      <v-tab value="metadata">Metadata</v-tab>
      <v-tab value="data">Data</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="metadata">
        <v-card
          variant="outlined"
          class="mt-5"
          prepend-icon="mdi-card-text-outline"
        >
          <template #title> Description </template>
          <template #text>
            {{ current.dataset.metadata.description }}
          </template>
        </v-card>
        <v-card variant="outlined" class="mt-5" prepend-icon="mdi-link-variant">
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
      </v-window-item>

      <v-window-item value="data">
        <v-text-field
          class="mt-5"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search data..."
          v-model="searchText"
          variant="outlined"
        ></v-text-field>

        <v-table>
          <tbody>
            <tr
              v-for="entry in Object.entries(filteredData)"
              class="cursor-pointer"
              :key="entry[0]"
              @mouseenter="() => dataRowMouseEnter(entry[0])"
              @mouseleave="dataRowMouseLeave"
            >
              <td>{{ keyFormatter(entry[0]) }}</td>
              <td>
                <span class="font-weight-bold">{{
                  current.dataset.valueFormatter(entry[1])
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
  background-color: rgb(var(--v-theme-on-surface-variant));
}

.cursor-pointer {
  cursor: pointer;
}

@media (min-width: 992px) {
  .offcanvas-side-panel-lg {
    visibility: visible !important;
    /* transform: none !important; */
    width: 25% !important;
    height: 94vh !important;
    top: unset !important;
    padding: 0 !important;
    border-right: 1px solid #dee2e6 !important;
    /* background-color: #e9ecef !important; */
  }

  .position-relative-lg {
    position: relative !important;
  }
}
</style>
