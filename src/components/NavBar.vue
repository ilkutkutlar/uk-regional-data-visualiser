<script>
import { useOptions } from "../store";
import { setTheme, saveTheme, getPreferredTheme } from "../colour_mode";
import MoonFill from "./icons/MoonFill.vue";
import SunFill from "./icons/SunFill.vue";

export default {
  components: { MoonFill, SunFill },
  data() {
    return {
      options: useOptions(),
      darkMode: getPreferredTheme() == "dark",
    };
  },
  watch: {
    darkMode() {
      setTheme(this.darkMode ? "dark" : "light");
      saveTheme(this.darkMode ? "dark" : "light");
    },
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg h-6vh p-0 shadow-sm border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand link-white" href="#">Maps of Britain</a>

      <div class="form-check form-switch">
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <component :is="darkMode ? 'MoonFill' : 'SunFill'"></component>
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          v-model="darkMode"
        />
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
