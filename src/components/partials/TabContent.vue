<script>
export default {
  props: ["id", "tabId", "active"],
};
</script>
<template>
  <div
    :id="id"
    class="tab-pane"
    :class="{ active: active }"
    role="tabpanel"
    :aria-labelledby="tabId"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>
