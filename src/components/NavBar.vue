<script>
import { useOptions } from "../store";

export default {
  data() {
    return {
      options: useOptions(),
    };
  },
  computed: {
    theme() {
      return this.options.isDarkMode
        ? ["navbar-dark", "bg-dark"]
        : ["navbar-light", "bg-light", "border-bottom"];
    },
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg h-6vh p-0" :class="theme">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Maps of Britain</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menu-offcanvas"
        aria-controls="menu-offcanvas"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>
