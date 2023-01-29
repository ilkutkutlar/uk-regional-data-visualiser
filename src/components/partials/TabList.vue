<script>
import { useCurrent } from "../../store";

export default {
  props: ["tabs"],
  data() {
    return {
      current: useCurrent(),
    };
  },
};
</script>
<template>
  <ul class="nav nav-pills" role="tablist">
    <li v-for="tab in tabs" :key="tab.id" class="nav-item" role="presentation">
      <button
        :id="tab.id"
        class="nav-link"
        :class="{ active: tab.active }"
        data-bs-toggle="tab"
        :data-bs-target="`#${tab.contentId}`"
        type="button"
        role="tab"
        :aria-controls="tab.contentId"
        :aria-selected="tab.active ? 'true' : 'false'"
      >
        {{ tab.title }}
      </button>
    </li>
  </ul>
</template>
