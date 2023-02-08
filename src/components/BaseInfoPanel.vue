<script>
export default {
  props: ["closeButtonVisible"],
};
</script>

<template>
  <v-card
    class="card z-index-10 position-fixed break-word bg-opacity-75 top-0-lg end-0-lg bottom-0-md-down start-0-md-down w-50-md-down mt-5em me-4 w-20em"
  >
    <template #title>
      <v-row no-gutters>
        <v-col cols="10">
          <slot name="title"></slot>
        </v-col>
        <v-col cols="2">
          <v-btn
            v-show="closeButtonVisible"
            @click="$emit('closeButtonClicked')"
            aria-label="Close"
            icon="mdi-close"
            variant="plain"
            size="medium"
          ></v-btn>
        </v-col>
      </v-row>
    </template>
    <template #text>
      <slot name="body"></slot>
    </template>
  </v-card>
</template>

<style>
.w-20em {
  width: 20em !important;
}

.mt-5em {
  margin-top: 6em !important;
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
