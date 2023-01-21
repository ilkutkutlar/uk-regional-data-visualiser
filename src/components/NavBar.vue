<script>
import { useOptions } from "../store";

export default {
  data() {
    return {
      options: useOptions(),
    };
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg h-6vh p-0">
    <div class="container-fluid">
      <a class="navbar-brand link-white" href="#">Maps of Britain</a>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Colour mode
        </button>
        <ul class="dropdown-menu">
          <li data-bs-theme-value="dark">
            <a class="dropdown-item" href="#">Dark</a>
          </li>
          <li data-bs-theme-value="light">
            <a class="dropdown-item" href="#">Light</a>
          </li>
          <li data-bs-theme-value="auto">
            <a class="dropdown-item" href="#">Auto</a>
          </li>
        </ul>
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
