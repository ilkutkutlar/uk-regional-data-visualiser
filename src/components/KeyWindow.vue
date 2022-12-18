<script>
import TogglerButton from "./partials/TogglerButton.vue";
import IconCaretDownFill from "./icons/IconCaretDownFill.vue";
import IconCaretUpFill from "./icons/IconCaretUpFill.vue";

export default {
  props: ["dataset"],
  components: {
    TogglerButton,
    IconCaretDownFill,
    IconCaretUpFill,
  },
  data() {
    return {
      toggleCollapsed: false,
    };
  },
  methods: {
    toggleClicked() {
      this.toggleCollapsed = document
        .getElementById("key-collapse-toggle")
        .classList.contains("collapsed");
    },
  },
};
</script>

<template>
  <div
    class="card z-index-10 position-fixed end-0 bottom-0 mb-4-lg me-4-lg bg-secondary bg-opacity-75 min-width-10 mw-50-md-down"
  >
    <TogglerButton
      id="key-collapse-toggle"
      classes="row ms-3 me-3 mb-2 mt-2"
      toggle-type="collapse"
      target="key"
      @click="toggleClicked"
    >
      <h5 id="key-title" class="col col-10 card-title mb-0 ps-0">Key</h5>
      <div class="col p-0 col-2">
        <div id="key-down-icon" v-if="!this.toggleCollapsed">
          <IconCaretDownFill />
        </div>
        <div id="key-up-icon" v-if="this.toggleCollapsed">
          <IconCaretUpFill />
        </div>
      </div>
    </TogglerButton>
    <div id="key" class="break-word border-top pt-2 show card-body p-2">
      <div id="key-body" class="card-text vstack gap-2">
        <div
          v-for="keyItem in this.dataset.key"
          :key="keyItem[0]"
          class="d-flex"
        >
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
