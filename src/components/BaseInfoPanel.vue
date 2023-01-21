<script>
import { useOptions } from "../store";

export default {
  props: ["closeButtonVisible"],
  data() {
    return {
      options: useOptions(),
    };
  },
  computed: {
    themeStyle() {
      return this.options.isDarkMode ? { color: "whitesmoke" } : {};
    },
    themeClass() {
      return this.options.isDarkMode ? ["bg-dark"] : ["bg-secondary"];
    },
  },
};
</script>

<template>
  <div
    id="info-panel"
    class="card z-index-10 position-fixed break-word bg-opacity-75 top-0-lg end-0-lg bottom-0-md-down start-0-md-down w-50-md-down mt-5em me-4 w-20em border"
    :class="themeClass"
    :style="themeStyle"
  >
    <div class="card-body ps-2 pt-2 pb-2">
      <div class="row">
        <div id="info-panel-title" class="card-title col-10 pe-0 mb-3 fw-bold">
          <slot name="title"></slot>
        </div>
        <button
          id="info-panel-close-button"
          type="button"
          class="btn-close col-2 m-auto"
          aria-label="Close"
          v-show="closeButtonVisible"
          @click="$emit('closeButtonClicked')"
        ></button>
      </div>
      <p id="info-panel-body" class="card-text">
        <slot name="body"></slot>
      </p>
    </div>
  </div>
</template>
