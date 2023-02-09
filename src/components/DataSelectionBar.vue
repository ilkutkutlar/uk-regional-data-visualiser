<script>
import { useCurrent } from "../store";

export default {
  data() {
    return {
      current: useCurrent(),
    };
  },
};
</script>

<template>
  <div class="position-fixed z-index-10 d-lg-none mt-3" style="bottom: 0">
    <div class="border m-auto p-2" style="width: fit-content">
      <div class="d-flex">
        <div
          class="overflow-hidden ms-2 me-3"
          style="white-space: nowrap; text-overflow: ellipsis"
        >
          <div>
            {{ current.dataset.metadata.name }}
          </div>
          <div class="text-muted">
            {{ current.year }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.z-index-10 {
  z-index: 10 !important;
}
</style>
