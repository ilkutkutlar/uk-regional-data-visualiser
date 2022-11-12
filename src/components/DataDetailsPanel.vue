<script>
import SelectFloating from "./partials/SelectFloating.vue";
import IconText from "./icons/IconText.vue";
import IconLink from "./icons/IconLink.vue";
import IconSearch from "./icons/IconSearch.vue";

export default {
  props: ["dataset", "allDatasets", "timePeriod"],
  components: {
    SelectFloating,
    IconText,
    IconLink,
    IconSearch,
  },
  data() {
    return {
      dataSelectItems: this.allDatasets.map((dataset) => {
        return { value: dataset.metadata.id, text: dataset.metadata.name };
      }),
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
          />
          <label class="form-check-label" for="per-capita-check">
            Show data per capita
          </label>
        </div>

        <ul class="nav nav-pills" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              id="metadata-tab"
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#metadata"
              type="button"
              role="tab"
              aria-controls="metadata"
              aria-selected="true"
            >
              Metadata
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              id="dataset-data-tab"
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#dataset-data"
              type="button"
              role="tab"
              aria-controls="dataset-data"
              aria-selected="false"
            >
              Data
            </button>
          </li>
        </ul>

        <div class="tab-content">
          <div
            id="metadata"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="metadata-tab"
            tabindex="0"
          >
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
          </div>
          <div
            id="dataset-data"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="dataset-data-tab"
            tabindex="0"
          >
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
                {{
                  this.dataset.data[this.timePeriod]
                }}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
