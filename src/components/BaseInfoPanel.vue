<script>
import { useOptions } from "../store";

export default {
  props: ["closeButtonVisible"],
  data() {
    return {
      options: useOptions(),
    };
  },
};
</script>

<template>
  <div
    id="info-panel"
    class="card z-index-10 position-fixed break-word bg-opacity-75 top-0-lg end-0-lg bottom-0-md-down start-0-md-down w-50-md-down mt-5em me-4 w-20em border"
  >
    <div class="card-body">
      <div id="info-panel-title" class="card-title pb-2">
        <div class="row">
          <span class="col-10 fw-bold">
            <slot name="title"></slot>
          </span>

          <button
            id="info-panel-close-button"
            type="button"
            class="btn-close col-2 m-auto"
            aria-label="Close"
            v-show="closeButtonVisible"
            @click="$emit('closeButtonClicked')"
          ></button>
        </div>
      </div>

      <p id="info-panel-body" class="card-text">
        <slot name="body"></slot>
      </p>
    </div>
  </div>
</template>
