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
    <v-expansion-panel id="key-window-root" title="Key">
      <v-expansion-panel-text class="pt-3">
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
#key-window-root {
  z-index: 10;
  position: fixed;
  min-width: 10em !important;
  right: 0 !important;
  bottom: var(--v-layout-bottom) !important;
}

@media (min-width: 992px) {
  #key-window-root {
    margin-bottom: 1.5em !important;
    margin-right: 1.5em !important;
  }
}

@media (max-width: 991.98px) {
  #key-window-root {
    max-width: 70% !important;
    margin-bottom: 1em !important;
    margin-right: 0.5em !important;
  }
}

.key-colour-box {
  width: 1.3em;
  height: 1.3em;
  margin-right: 0.7em;
}
</style>
