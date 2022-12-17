<script>
import SelectFloating from "./partials/SelectFloating.vue";
import IconText from "./icons/IconText.vue";
import IconLink from "./icons/IconLink.vue";
import IconSearch from "./icons/IconSearch.vue";
import TabList from "./partials/TabList.vue";
import TabContent from "./partials/TabContent.vue";

export default {
  props: ["dataset", "timePeriod"],
  inject: ["allDatasets"],
  components: {
    SelectFloating,
    TabList,
    TabContent,
    IconText,
    IconLink,
    IconSearch,
  },
  data() {
    return {
      dataSelectItems: this.allDatasets.map((dataset) => {
        return { value: dataset.metadata.id, text: dataset.metadata.name };
      }),
      keyFormatter: (area) => this.dataset.svgMap.prettyNames[area],
      perCapita: false,
    };
  },
  computed: {
    timePeriodSelectItems() {
      /* This is a computed property because timePeriods
         uses the "data" property, which is downloaded
         asynchronously, and might not have been downloaded
         when this template has been initialised. Make it
         a computed property so it is updated when data
         has been downloaded */
      return this.dataset.timePeriods.map((period) => {
        return { value: period, text: period };
      });
    },
    modelTimePeriod: {
      get() {
        return this.timePeriod;
      },
      set(value) {
        this.$emit("update:timePeriod", value);
      },
    },
    modelDataset: {
      get() {
        return this.dataset.metadata.id;
      },
      set(value) {
        this.$emit(
          "update:dataset",
          this.allDatasets.find((dataset) => dataset.metadata.id == value)
        );
      },
    },
    modelPerCapita: {
      get() {
        return this.perCapita;
      },
      set(value) {
        this.perCapita = value;
        this.$emit("update:perCapita", value);
      },
    },
  },
};
</script>

<template>
  <div
    id="data-details-offcanvas"
    aria-labelledby="data-details-offcanvas-label"
    class="offcanvas offcanvas-start offcanvas-side-panel-lg position-relative-lg col col-3"
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
          :items="this.dataSelectItems"
          v-model="this.modelDataset"
        />
        <SelectFloating
          id="panel-data-time-period"
          name="panel-data-time-period"
          label="Time period"
          aria-label="Dataset time period select"
          outer-div-classes="mb-3"
          :items="this.timePeriodSelectItems"
          v-model="this.modelTimePeriod"
        />
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="per-capita-check"
            v-model="this.modelPerCapita"
          />
          <label class="form-check-label" for="per-capita-check">
            Show data per capita
          </label>
        </div>

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
            <div class="card mt-3">
              <div class="card-body">
                <h5 class="card-title border-bottom pb-1">
                  <IconText />Description
                </h5>
                <div id="data-description" class="card-text">
                  {{ this.dataset.metadata.description }}
                </div>
              </div>
            </div>
            <div class="card mt-3">
              <div class="card-body">
                <h5 class="card-title border-bottom pb-1">
                  <IconLink />Source
                </h5>
                <a
                  :href="this.dataset.metadata.sourceLink"
                  id="data-source"
                  class="d-block card-text"
                  target="blank"
                >
                  {{ this.dataset.metadata.source }}
                </a>
              </div>
            </div>
          </TabContent>
          <TabContent id="dataset-data" tabId="dataset-data-tab">
            <div class="input-group w-100 mb-3 mt-3">
              <span class="input-group-text">
                <IconSearch />
              </span>
              <input
                id="search-data-text"
                type="text"
                class="form-control border-style-solid"
                placeholder="Search data..."
                aria-label="Data search text"
              />
            </div>
            <table class="w-100 m-auto mb-3 border bg-white">
              <tbody id="data-table">
                <tr
                  v-for="entry in Object.entries(
                    this.dataset.data[this.timePeriod]
                  )"
                  :id="`data-${entry[0]}`"
                  class="cursor-pointer"
                  :key="entry[0]"
                  @mouseenter="() => this.$emit('dataRowMouseEnter', entry[0])"
                  @mouseleave="() => this.$emit('dataRowMouseLeave')"
                >
                  <td>{{ this.keyFormatter(entry[0]) }}</td>
                  <td>
                    <span class="fw-bold">{{
                      this.dataset.valueFormatter(entry[1])
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
