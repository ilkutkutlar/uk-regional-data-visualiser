<script>
import IconText from "./icons/IconText.vue";
import IconLink from "./icons/IconLink.vue";
import IconSearch from "./icons/IconSearch.vue";
import SelectFloating from "./partials/SelectFloating.vue";
import TabList from "./partials/TabList.vue";
import TabContent from "./partials/TabContent.vue";
import Card from "./partials/Card.vue";
import { filterDataByKey, sortObjectByValue } from "../utils";
import { useOptions } from "../store";

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
      return this.options.dataset.years.map((year) => {
        return { value: year, text: year };
      });
    },
    filteredData() {
      let data = this.options.dataset.data[this.options.year] ?? {};
      if (this.searchText) {
        data = filterDataByKey(data, this.keyFormatter, this.searchText);
      }
      return sortObjectByValue(data, false);
    },
  },
  methods: {
    dataRowMouseEnter(region) {
      this.options.addHighlightedRegion(region);
    },
    dataRowMouseLeave() {
      this.options.clearHighlightedRegions();
    },
  },
  data() {
    return {
      options: useOptions(),
      dataSelectItems: this.allDatasets.map((dataset) => {
        return { value: dataset.metadata.id, text: dataset.metadata.name };
      }),
      keyFormatter: (region) => this.options.dataset.svgMap.prettyNames[region],
      searchText: "",
      testValue: false,
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
          id="panel-data"
          name="panel-data"
          label="Choose a dataset"
          aria-label="Dataset select"
          outer-div-classes="mb-1 mt-3"
          :items="dataSelectItems"
          :modelValue="options.dataset.metadata.id"
          @input="
            (event) => {
              this.options.dataset = this.allDatasets.find(
                (dataset) => dataset.metadata.id == event.target.value
              );
            }
          "
        />
        <SelectFloating
          id="panel-data-time-year"
          name="panel-data-time-year"
          label="Year"
          aria-label="Dataset year select"
          outer-div-classes="mb-3"
          :items="yearSelectItems"
          v-model="options.year"
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
                {{ options.dataset.metadata.description }}
              </template>
            </Card>
            <Card outerDivClasses="mt-3">
              <template #title><IconLink />Source</template>
              <template #body>
                <a
                  :href="options.dataset.metadata.sourceLink"
                  class="d-block"
                  target="blank"
                >
                  {{ options.dataset.metadata.source }}
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
                id="search-data-text"
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
                  :id="`data-${entry[0]}`"
                  class="cursor-pointer"
                  :key="entry[0]"
                  @mouseenter="() => dataRowMouseEnter(entry[0])"
                  @mouseleave="dataRowMouseLeave"
                >
                  <td>{{ keyFormatter(entry[0]) }}</td>
                  <td>
                    <span class="fw-bold">{{
                      options.dataset.valueFormatter(entry[1])
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
