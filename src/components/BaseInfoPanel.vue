<script>
export default {
  props: ["closeButtonVisible"],
};
</script>

<template>
  <div
    class="card z-index-10 position-fixed break-word bg-opacity-75 top-0-lg end-0-lg bottom-0-md-down start-0-md-down w-50-md-down mt-5em me-4 w-20em border"
  >
    <div class="card-body">
      <div class="card-title pb-2">
        <div class="row">
          <span class="col-10 fw-bold">
            <slot name="title"></slot>
          </span>

          <button
            type="button"
            class="btn-close col-2 m-auto"
            aria-label="Close"
            v-show="closeButtonVisible"
            @click="$emit('closeButtonClicked')"
          ></button>
        </div>
      </div>

      <p class="card-text">
        <slot name="body"></slot>
      </p>
    </div>
  </div>
</template>

<style>
.w-20em {
  width: 20em !important;
}

.mt-5em {
  margin-top: 5em !important;
}

@media (min-width: 992px) {
  .top-0-lg {
    top: 0 !important;
  }

  .end-0-lg {
    right: 0 !important;
  }
}

@media (max-width: 991.98px) {
  .bottom-0-md-down {
    bottom: 0 !important;
  }

  .start-0-md-down {
    left: 0 !important;
  }
}
</style>
