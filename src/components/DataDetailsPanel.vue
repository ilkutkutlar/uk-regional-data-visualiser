<script lang="ts">
import _ from "lodash";

import LicenceInfoCard from "@/components/LicenceInfoCard.vue";
import { RegionalDataset } from "@/dataset";

import { earnings } from "@/datasets/earnings";
import { hpi } from "@/datasets/hpi";
import { lifeExpectancyFemale } from "@/datasets/life_expectancy_female";
import { lifeExpectancyMale } from "@/datasets/life_expectancy_male";
import { netInternalMigration } from "@/datasets/net_internal_migration";
import { population } from "@/datasets/population";
import { pubsAndBars } from "@/datasets/pubs_and_bars";

export default {
  components: {
    LicenceInfoCard,
  },
  props: {
    dataset: {
      type: RegionalDataset,
      required: true,
    },
    currentYear: {
      type: String,
      required: true,
    },
    selectedRegionId: {
      type: String,
      required: true,
    },
  },
  emits: [
    "dataRowMouseLeave",
    "dataRowMouseEnter",
    "dataRowClick",
    "update:currentYear",
    "update:dataset",
  ],
  data() {
    return {
      searchText: "" as string,
      tab: null as string | null,
      allDatasets: [
        earnings,
        hpi,
        population,
        netInternalMigration,
        pubsAndBars,
        lifeExpectancyFemale,
        lifeExpectancyMale,
      ] as Array<RegionalDataset>,
    };
  },
  computed: {
    yearSelectItems() {
      /* This is a computed property because `years`
         uses the "data" property, which is downloaded
         asynchronously, and might not have been downloaded
         when this template has been initialised. Make it
         a computed property so it is updated when data
         has been downloaded */
      return this.dataset.years;
    },
    dataSelectItems() {
      return this.allDatasets.map((dataset: RegionalDataset) => {
        return { value: dataset.metadata.id, text: dataset.metadata.name };
      });
    },
    keyFormatter() {
      return (region: string) => this.dataset.boundaries.prettyNameOf(region);
    },
    filteredData() {
      const dataForCurrentYear = this.dataset.tables[this.selectedYear].data;
      let data = dataForCurrentYear ?? {};
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
        return this.currentYear;
      },
      set(value: string) {
        this.$emit("update:currentYear", value);
      },
    },
    selectedDataset: {
      get() {
        return this.dataset.metadata.id;
      },
      set(value: string) {
        const selectedDataset = this.allDatasets.find(
          (dataset: RegionalDataset) => dataset.metadata.id === value,
        );
        this.$emit("update:dataset", selectedDataset);
      },
    },
    /**
     * Get the source URL for the GeoJSON file for a given year.
     */
    geoJsonSourceUrl() {
      return (
        this.dataset.boundaries.boundariesFiles.get(this.selectedYear)
          ?.sourceUrl ??
        this.dataset.boundaries.boundariesFiles.get("default")?.sourceUrl
      );
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
        <v-card class="mt-5 border" prepend-icon="$cardText" variant="flat">
          <template #title>Description</template>
          <template #text>
            {{ dataset.metadata.description }}
          </template>
        </v-card>

        <v-card class="mt-5 border" prepend-icon="$linkVariant" variant="flat">
          <template #title>Source</template>
          <template #text>
            <a
              :href="dataset.metadata.sourceLink"
              class="d-block"
              target="blank"
            >
              {{ dataset.metadata.source }}
            </a>
          </template>
        </v-card>

        <LicenceInfoCard :licence-type="dataset.metadata.licenceType" />

        <v-card class="mt-5 border" prepend-icon="$landFields" variant="flat">
          <template #title>Boundaries</template>
          <template #text>
            <a :href="geoJsonSourceUrl">
              {{ dataset.boundaries.name }}
            </a>
            <div v-once class="mt-2">
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
          prepend-inner-icon="$magnify"
          placeholder="Search data..."
          variant="outlined"
        ></v-text-field>

        <v-table class="rounded border">
          <tbody>
            <tr
              v-for="(value, region) in filteredData"
              :key="region"
              class="cursor-pointer"
              :class="{ selected: selectedRegionId === region }"
              @click="$emit('dataRowClick', region.toString())"
              @mouseenter="$emit('dataRowMouseEnter', region.toString())"
              @mouseleave="$emit('dataRowMouseLeave', region.toString())"
            >
              <td>{{ keyFormatter(region.toString()) }}</td>
              <td>
                <span class="font-weight-bold">{{
                  dataset.valueFormatter(value)
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
