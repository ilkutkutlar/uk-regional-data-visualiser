<script>
export default {
  props: ["closeButtonVisible"],
};
</script>

<template>
  <v-card
    class="card z-index-10 position-fixed break-word bg-opacity-75 top-0 end-0 me-4 w-20em mt-5em-lg start-0-md-down w-100-md-down top-64px-md-down"
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
.break-word {
  word-break: break-word;
}

.z-index-10 {
  z-index: 10 !important;
}

.w-20em {
  width: 20em !important;
}

.top-0 {
  top: 0 !important;
}

.end-0 {
  right: 0 !important;
}

@media (min-width: 992px) {
  .mt-5em-lg {
    margin-top: 6em !important;
  }
}

@media (max-width: 991.98px) {
  .bottom-0-md-down {
    bottom: 0 !important;
  }
  .start-0-md-down {
    left: 0 !important;
  }
  .w-100-md-down {
    width: 100% !important;
  }
  .top-64px-md-down {
    top: 64px !important;
  }
}
</style>
