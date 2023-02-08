<script>
import { useCurrent } from "../store";
import { generateKey } from "../utils";
import { Colours } from "../constants";

export default {
  data() {
    return {
      toggleCollapsed: false,
      current: useCurrent(),
    };
  },
  computed: {
    key() {
      const _key = generateKey(
        this.current.dataset.colourMap,
        this.current.dataset.valueFormatter
      );
      _key.unshift(["No data", Colours.GREY]);
      return _key;
    },
  },
};
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel
      title="Key"
      class="z-index-10 position-fixed end-0 bottom-0 mb-4-lg me-4-lg min-width-10 mw-50-md-down"
    >
      <v-expansion-panel-text>
        <div v-for="keyItem in this.key" :key="keyItem[0]" class="d-flex mb-2">
          <div
            class="key-colour-box"
            :style="{ backgroundColor: keyItem[1] }"
          ></div>
          <div>{{ keyItem[0] }}</div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>
.end-0 {
  right: 0 !important;
}

.bottom-0 {
  bottom: 0 !important;
}

.key-colour-box {
  width: 1.3em;
  height: 1.3em;
  margin-right: 0.7em;
}

@media (min-width: 992px) {
  .mb-4-lg {
    margin-bottom: 1.5rem !important;
  }

  .me-4-lg {
    margin-right: 1.5rem !important;
  }
}

@media (max-width: 991.98px) {
  .mw-50-md-down {
    max-width: 50% !important;
  }
}

.min-width-10 {
  min-width: 10em !important;
}

.z-index-10 {
  z-index: 10 !important;
}
</style>
