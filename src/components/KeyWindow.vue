<script>
import TogglerButton from "./partials/TogglerButton.vue";
import IconCaretDownFill from "./icons/IconCaretDownFill.vue";
import IconCaretUpFill from "./icons/IconCaretUpFill.vue";
import { useOptions } from "../store";
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
      options: useOptions(),
    };
  },
  computed: {
    key() {
      const _key = generateKey(
        this.options.dataset.colourMap,
        this.options.dataset.valueFormatter
      );
      _key.unshift(["No data", Colours.GREY]);
      return _key;
    },
  },
};
</script>

<template>
  <div
    class="card z-index-10 position-fixed end-0 bottom-0 mb-4-lg me-4-lg bg-secondary bg-opacity-75 min-width-10 mw-50-md-down bg-dark"
    :style="{ color: 'whitesmoke' }"
  >
    <TogglerButton
      classes="row ms-3 me-3 mb-2 mt-2"
      toggle-type="collapse"
      target="key"
      @click.capture="this.toggleCollapsed = !this.toggleCollapsed"
    >
      <h5 class="col col-10 card-title mb-0 ps-0">Key</h5>
      <div class="col p-0 col-2">
        <div v-if="!toggleCollapsed">
          <IconCaretDownFill />
        </div>
        <div v-if="toggleCollapsed">
          <IconCaretUpFill />
        </div>
      </div>
    </TogglerButton>
    <div id="key" class="break-word border-top pt-2 show card-body p-2">
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
  </div>
</template>
