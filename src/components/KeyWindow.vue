<script>
import TogglerButton from "./partials/TogglerButton.vue";
import IconCaretDownFill from "./icons/IconCaretDownFill.vue";
import IconCaretUpFill from "./icons/IconCaretUpFill.vue";
import { useCurrent } from "../store";
import { generateKey } from "../utils";
import { Colours } from "../constants";

export default {
  components: {
    TogglerButton,
    IconCaretDownFill,
    IconCaretUpFill,
  },
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
      class="z-index-10 position-fixed end-0 bottom-0 mb-4-lg me-4-lg bg-opacity-75 min-width-10 mw-50-md-down border"
    >
      <v-expansion-panel-text>
        <div class="card-text vstack gap-2">
          <div v-for="keyItem in this.key" :key="keyItem[0]" class="d-flex">
            <div
              class="key-colour-box"
              :style="{ backgroundColor: keyItem[1] }"
            ></div>
            <div>{{ keyItem[0] }}</div>
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <!-- <div
    class="card z-index-10 position-fixed end-0 bottom-0 mb-4-lg me-4-lg bg-opacity-75 min-width-10 mw-50-md-down border"
  >
    <TogglerButton
      classes="row ms-3 me-3 mb-2 mt-2"
      toggle-type="collapse"
      target="key"
      @click.capture="this.toggleCollapsed = !this.toggleCollapsed"
    >
      <h5 class="col col-10 card-title mb-0 ps-0">Key</h5>
      <div class="col p-0 col-2">
        <component
          :is="toggleCollapsed ? 'IconCaretUpFill' : 'IconCaretDownFill'"
        ></component>
      </div>
    </TogglerButton>
    <div id="key" class="break-word border-top card-body show">
      <div class="card-text vstack gap-2">
        <div v-for="keyItem in this.key" :key="keyItem[0]" class="d-flex">
          <div
            class="key-colour-box"
            :style="{ backgroundColor: keyItem[1] }"
          ></div>
          <div>{{ keyItem[0] }}</div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style>
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
</style>
