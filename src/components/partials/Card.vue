<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useCurrent } from "../../store";

export default {
  props: ["outerDivClasses"],
  data() {
    return {
      current: useCurrent(),
    };
  },
};
</script>

<template>
  <div class="card border" :class="outerDivClasses">
    <div class="card-body">
      <h5 class="card-title border-bottom pb-1"><slot name="title"></slot></h5>
      <div class="card-text">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
