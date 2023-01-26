<script>
import IconSlider from "./icons/IconSlider.vue";
import { useOptions } from "../store";

export default {
  components: {
    IconSlider,
  },
  data() {
    return {
      options: useOptions(),
    };
  },
};
</script>

<template>
  <div class="w-100 position-fixed z-index-10 d-lg-none mt-3">
    <div class="border m-auto p-2 rounded-3 bg-body" style="width: fit-content">
      <div class="w-100 d-flex">
        <div
          class="overflow-hidden ms-2 me-3"
          style="white-space: nowrap; text-overflow: ellipsis"
        >
          <div>
            {{ options.dataset.metadata.name }}
          </div>
          <div class="text-muted">
            {{ options.year }}
          </div>
        </div>
        <div
          class="btn bg-body-secondary text-body align-self-center me-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#data-details-offcanvas"
          aria-controls="data-details-offcanvas"
          aria-expanded="false"
          aria-label="Toggle data details"
        >
          <IconSlider />
        </div>
      </div>
    </div>
  </div>
</template>
