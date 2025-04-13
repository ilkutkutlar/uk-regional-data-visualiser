<script lang="ts">
import _ from "lodash";
import { Dataset } from "@/dataset";
import LicenceInfoCard from "@/components/LicenceInfoCard.vue";
import { useCurrent } from "@/store";

export default {
  components: {
    LicenceInfoCard,
  },
  inject: ["allDatasets"],
  data() {
    return {
      current: useCurrent(),
      searchText: "",
      tab: null,
      dataSelectItems: this.allDatasets.map((dataset: Dataset) => {
        return { value: dataset.metadata.id, text: dataset.metadata.name };
      }),
    };
  },
  computed: {
    keyFormatter() {
      return (region: string) =>
        this.current.dataset.boundaries.prettyNameOf(region);
    },
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
      let data = this.current.dataForCurrentYear ?? {};
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
      set(value: string) {
        this.current.setYear(value);
      },
    },
    selectedDataset: {
      get() {
        return this.current.dataset.metadata.id;
      },
      set(value: string) {
        this.current.setDataset(
          this.allDatasets.find(
            (dataset: Dataset) => dataset.metadata.id === value,
          ),
        );
      },
    },
  },
  methods: {
    dataRowMouseEnter(region: string) {
      this.current.$patch({
        highlightedRegionID: region,
      });
    },
    dataRowMouseLeave(region: string) {
      if (region === this.current.selectedRegionID) return;
      this.current.clearHighlighted();
    },
    dataRowClick(region: string) {
      this.current.$patch({
        selectedRegionID: region,
      });
    },
  },
};
</script>

<template>
  <v-container>
    <v-select
      id="dataset-select"
      v-model="selectedDataset"
      variant="outlined"
      label="Choose a dataset"
      item-title="text"
      item-value="value"
      :items="dataSelectItems"
    ></v-select>
    <v-select
      id="dataset-year-select"
      v-model="selectedYear"
      variant="outlined"
      label="Choose a year"
      :items="yearSelectItems"
      attach
    ></v-select>

    <v-tabs v-model="tab" align-tabs="center" grow>
      <v-tab value="metadata">Metadata</v-tab>
      <v-tab value="data">Data</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item id="metadata-window-item" value="metadata">
        <v-card
          class="mt-5 border"
          prepend-icon="mdi-card-text-outline"
          variant="flat"
        >
          <template #title>Description</template>
          <template #text>
            {{ current.dataset.metadata.description }}
          </template>
        </v-card>

        <v-card
          class="mt-5 border"
          prepend-icon="mdi-link-variant"
          variant="flat"
        >
          <template #title>Source</template>
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

        <LicenceInfoCard :licence-type="current.dataset.metadata.licenceType" />

        <v-card
          class="mt-5 border"
          prepend-icon="mdi-land-fields"
          variant="flat"
        >
          <template #title>Boundaries</template>
          <template #text>
            <a
              :href="
                current.dataset.boundaries.getGeoJSONSourceUrlForYear(
                  current.year,
                )
              "
            >
              {{ current.dataset.metadata.boundaries }}
            </a>
            <div class="mt-2">
              Source: Office for National Statistics licensed under the
              <a
                href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                target="blank"
              >
                Open Government Licence v.3.0
              </a>
            </div>
            <div class="mt-2">
              Contains OS data © Crown copyright and database right
              {{ new Date().getFullYear() }}
            </div>
          </template>
        </v-card>
      </v-window-item>

      <v-window-item id="data-window-item" value="data">
        <v-text-field
          v-model="searchText"
          class="mt-5"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search data..."
          variant="outlined"
        ></v-text-field>

        <v-table class="rounded border">
          <tbody>
            <tr
              v-for="(value, region) in filteredData"
              :key="region"
              class="cursor-pointer"
              :class="{ selected: current.selectedRegionID === region }"
              @click="() => dataRowClick(region.toString())"
              @mouseenter="() => dataRowMouseEnter(region.toString())"
              @mouseleave="() => dataRowMouseLeave(region.toString())"
            >
              <td>{{ keyFormatter(region.toString()) }}</td>
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
