<script lang="ts">
import { Colours, type Formatter } from "@/constants";
import { ColourMap } from "@/colour_map";
import { useCurrent } from "@/store";

export default {
  data() {
    return {
      toggleCollapsed: false as boolean,
      current: useCurrent(),
    };
  },
  computed: {
    key() {
      const _key = this.generateKey(
        this.current.dataset.colourMap,
        this.current.dataset.valueFormatter,
      );
      _key.unshift(["No data", Colours.GREY]);
      return _key;
    },
  },
  methods: {
    generateKey(colourMap: ColourMap, valueFormatter: Formatter) {
      const rangeHasNegativeNums = colourMap.colourMap.some((entry) => {
        const [lower, upper] = entry.range;
        return Number(lower) < 0 || Number(upper) < 0;
      });
      const separator = rangeHasNegativeNums ? "to" : "-";

      return colourMap.colourMap.map((mapping) => {
        const [lower, upper] = mapping.range;
        const rangeDisplayText = isNaN(upper)
          ? `${valueFormatter(lower)}+`
          : `${valueFormatter(lower)} ${separator} ${valueFormatter(upper)}`;
        return [rangeDisplayText, mapping.colour];
      });
    },
  },
};
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel id="key-window-root" title="Key">
      <v-expansion-panel-text class="pt-3">
        <div v-for="[range, colour] in key" :key="range" class="d-flex mb-2">
          <div
            class="key-colour-box"
            :style="{ backgroundColor: colour }"
          ></div>
          <div>{{ range }}</div>
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
