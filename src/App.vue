<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue"
import InfoPanel from "./components/InfoPanel.vue"
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
</script>

<template>
  <Navbar/>
  <MenuOffcanvas/>
  <DataSelectionBar/>
  <KeyWindow/>
  <InfoPanel/>

  <div id="main" class="row m-0">
    <DataDetailsPanel/>
    <div id="svg-container" class="col col-9 w-100-md-down h-94vh end-0 p-0"></div>
  </div>
</template>
