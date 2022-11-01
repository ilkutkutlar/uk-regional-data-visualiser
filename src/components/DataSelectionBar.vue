<script setup lang="ts">
  import IconSlider from './icons/IconSlider.vue'
</script>

<template>
  <div id='bar-dataset-root' class="w-100 position-fixed z-index-10 d-lg-none mt-3">
    <div class="border m-auto bg-light p-2 rounded-3" style="width: fit-content">
      <div class="w-100 d-flex">
        <div class="overflow-hidden ms-2 me-3" style="white-space: nowrap; text-overflow: ellipsis">
          <div id="bar-dataset-name-label">{{ datasetName }}</div>
          <div id="bar-dataset-year-label" class="text-muted">{{ datasetYear }}</div>
        </div>
        <div
          id="bar-dataset-details-button"
          class="btn btn-secondary align-self-center me-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#data-details-offcanvas"
          aria-controls="data-details-offcanvas"
          aria-expanded="false"
          aria-label="Toggle data details"
        >
          <IconSlider/>
        </div>
      </div>
    </div>
  </div>
</template>
