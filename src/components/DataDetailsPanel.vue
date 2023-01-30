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
      return this.current.dataset.years.map((year) => {
        return { value: year, text: year };
      });
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
        <SelectFloating
          name="panel-select-dataset"
          label="Choose a dataset"
          aria-label="Dataset select"
          outer-div-classes="mb-1 mt-3"
          :items="dataSelectItems"
          :modelValue="current.dataset.metadata.id"
          @input="
            (event) => {
              this.current.dataset = this.allDatasets.find(
                (dataset) => dataset.metadata.id == event.target.value
              );
            }
          "
        />
        <SelectFloating
          name="panel-select-year"
          label="Choose a year"
          aria-label="Dataset year select"
          outer-div-classes="mb-3"
          :items="yearSelectItems"
          v-model="selectedYear"
        />

        <TabList
          :tabs="[
            {
              id: 'metadata-tab',
              contentId: 'metadata',
              title: 'Metadata',
              active: true,
            },
            {
              id: 'dataset-data-tab',
              contentId: 'dataset-data',
              title: 'Data',
              active: false,
            },
          ]"
        />
        <div class="tab-content">
          <TabContent id="metadata" tabId="metadata-tab" :active="true">
            <Card outerDivClasses="mt-3">
              <template #title><IconText />Description</template>
              <template #body>
                {{ current.dataset.metadata.description }}
              </template>
            </Card>
            <Card outerDivClasses="mt-3">
              <template #title><IconLink />Source</template>
              <template #body>
                <a
                  :href="current.dataset.metadata.sourceLink"
                  class="d-block"
                  target="blank"
                >
                  {{ current.dataset.metadata.source }}
                </a>
              </template>
            </Card>
          </TabContent>
          <TabContent id="dataset-data" tabId="dataset-data-tab">
            <div class="input-group w-100 mb-3 mt-3">
              <span class="input-group-text text-primary">
                <IconSearch />
              </span>
              <input
                type="text"
                class="form-control border-style-solid"
                placeholder="Search data..."
                aria-label="Data search text"
                v-model="searchText"
              />
            </div>
            <table class="table table-hover w-100 m-auto mb-3 border">
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
            </table>
          </TabContent>
        </div>
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
