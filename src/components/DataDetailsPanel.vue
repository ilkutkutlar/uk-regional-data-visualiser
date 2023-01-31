<script>
import IconText from "./icons/IconText.vue";
import IconLink from "./icons/IconLink.vue";
import IconSearch from "./icons/IconSearch.vue";
import SelectFloating from "./partials/SelectFloating.vue";
import TabList from "./partials/TabList.vue";
import TabContent from "./partials/TabContent.vue";
import Card from "./partials/Card.vue";
import { filterDataByKey } from "../utils";
import { useCurrent } from "../store";
import _ from "lodash";

export default {
  inject: ["allDatasets"],
  components: {
    SelectFloating,
    TabList,
    TabContent,
    Card,
    IconText,
    IconLink,
    IconSearch,
  },
  computed: {
    yearSelectItems() {
      /* This is a computed property because `years`
         uses the "data" property, which is downloaded
         asynchronously, and might not have been downloaded
         when this template has been initialised. Make it
         a computed property so it is updated when data
         has been downloaded */
      return this.current.dataset.years;
      // return this.current.dataset.years.map((year) => {
      //   return { value: year, text: year };
      // });
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
  },
  methods: {
    dataRowMouseEnter(region) {
      this.current.addHighlightedRegion(region);
    },
    dataRowMouseLeave() {
      this.current.clearHighlightedRegions();
    },
    datasetSelectInput(event) {
      this.current.dataset = this.allDatasets.find(
        (dataset) => dataset.metadata.id == event.target.value
      );
    },
  },
  data() {
    return {
      current: useCurrent(),
      dataSelectItems: this.allDatasets.map((dataset) => {
        return dataset.metadata.name;
        // return { value: dataset.metadata.id, text: dataset.metadata.name };
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
  <div
    id="data-details-offcanvas"
    aria-labelledby="data-details-offcanvas-label"
    class="offcanvas offcanvas-start offcanvas-side-panel-lg position-relative-lg col col-3 border-end"
    data-bs-backdrop="false"
    tabindex="-1"
  >
    <div class="offcanvas-header d-lg-none">
      <h5 id="data-details-offcanvas-label" class="offcanvas-title">Dataset</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body p-0">
      <div class="container">
        <v-select
          class="mb-1 mt-3"
          label="Choose a dataset"
          :items="dataSelectItems"
          :modelValue="current.dataset.metadata.id"
          @input="datasetSelectInput"
        ></v-select>
        <v-select
          class="mb-3"
          label="Choose a year"
          :items="yearSelectItems"
          v-model="selectedYear"
        ></v-select>

        <v-tabs v-model="tab" bg-color="primary" align-tabs="center" grow>
          <v-tab value="metadata">Metadata</v-tab>
          <v-tab value="data">Data</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="metadata">
            <v-card variant="outlined">
              <template #title> <IconText />Description </template>
              <template #text>
                {{ current.dataset.metadata.description }}
              </template>
            </v-card>

            <v-card variant="outlined">
              <template #title> <IconLink />Source </template>
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
              class="mb-3 mt-3"
              label=""
              prepend-inner-icon="mdi-magnify"
              placeholder="Search data..."
              v-model="searchText"
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
                    <span class="fw-bold">{{
                      current.dataset.valueFormatter(entry[1])
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>
</template>

<style>
td {
  padding: 0.5em 1em 0.5em 1em;
}

td,
tr,
table {
  border-bottom: rgba(0, 0, 0, 0.1) solid 1px !important;
}

.cursor-pointer {
  cursor: pointer;
}

@media (min-width: 992px) {
  .offcanvas-side-panel-lg {
    visibility: visible !important;
    transform: none !important;
    width: 25% !important;
    height: 94vh !important;
    top: unset !important;
    padding: 0 !important;
    border-right: 1px solid #dee2e6 !important;
    background-color: #e9ecef !important;
  }

  .position-relative-lg {
    position: relative !important;
  }
}
</style>
