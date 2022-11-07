<script>
export default {
  props: ["titleText", "bodyText", "visible"],
};
</script>

<template>
  <div
    id="info-panel"
    class="card z-index-10 position-fixed break-word bg-secondary bg-opacity-75 top-0-lg end-0-lg bottom-0-md-down start-0-md-down w-50-md-down mt-5em me-4 w-20em"
    v-show="this.visible"
  >
    <div class="card-body ps-2 pt-2 pb-2">
      <div class="row">
        <div id="info-panel-title" class="card-title col-10 pe-0 mb-1 fw-bold">
          {{ this.titleText }}
        </div>
        <button
          id="info-panel-close-button"
          type="button"
          class="btn-close col-2 m-auto d-none"
          aria-label="Close"
        ></button>
      </div>
      <p id="info-panel-body" class="card-text">{{ this.bodyText }}</p>
    </div>
  </div>
</template>
