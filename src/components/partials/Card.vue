<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useOptions } from "../../store";

export default {
  props: ["outerDivClasses"],
  data() {
    return {
      options: useOptions(),
    };
  },
  computed: {
    theme() {
      return this.options.isDarkMode
        ? {
            "background-color": "var(--bs-gray-800)",
            color: "whitesmoke",
          }
        : {};
    },
  },
};
</script>

<template>
  <div class="card" :class="outerDivClasses" :style="theme">
    <div class="card-body">
      <h5 class="card-title border-bottom pb-1"><slot name="title"></slot></h5>
      <div class="card-text">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
