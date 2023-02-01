<script>
import { useTheme } from "vuetify";

export default {
  data() {
    return {
      theme: useTheme(),
    };
  },
  methods: {
    toggleTheme() {
      this.theme.global.name = this.theme.global.current.dark
        ? "light"
        : "dark";
    },
  },
};
</script>
<template>
  <v-toolbar class="h-6vh">
    <v-toolbar-title>Maps of Britain</v-toolbar-title>

    <v-btn @click="toggleTheme">toggle theme</v-btn>

    <!-- <v-switch inset v-model="darkMode"></v-switch> -->
    <!-- <div class="form-check form-switch">
      <label class="form-check-label" for="colourModeSwitch">
        <component :is="darkMode ? 'MoonFill' : 'SunFill'"></component>
      </label>
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="colourModeSwitch"
        v-model="darkMode"
      />
    </div> -->
  </v-toolbar>

  <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menu-offcanvas"
        aria-controls="menu-offcanvas"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->
</template>

<style>
.h-6vh {
  height: 6vh !important;
}

.h-94vh {
  height: 94vh !important;
}
</style>
