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
      <a class="navbar-brand link-white" href="#">Maps of Britain</a>
      <div class="form-check form-switch">
        <input
          id="darkModeSwitch"
          class="form-check-input"
          type="checkbox"
          role="switch"
          v-model="this.options.isDarkMode"
        />
        <label
          class="form-check-label"
          :class="{ 'text-white': this.options.isDarkMode }"
          for="darkModeSwitch"
        >
          Dark mode
        </label>
      </div>
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
