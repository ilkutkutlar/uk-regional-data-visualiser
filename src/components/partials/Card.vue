<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  props: ["outerDivClasses"],
};
</script>

<template>
  <div
    class="card"
    :class="outerDivClasses"
    :style="{
      'background-color': 'var(--bs-gray-800)',
      color: 'whitesmoke',
    }"
  >
    <div class="card-body">
      <h5 class="card-title border-bottom pb-1"><slot name="title"></slot></h5>
      <div class="card-text">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
