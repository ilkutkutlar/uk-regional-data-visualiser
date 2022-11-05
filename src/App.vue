<script>
import Navbar from "./components/Navbar.vue";
import MenuOffcanvas from "./components/MenuOffcanvas.vue";
import DataSelectionBar from "./components/DataSelectionBar.vue";
import KeyWindow from "./components/KeyWindow.vue"
import InfoPanel from "./components/InfoPanel.vue"
import DataDetailsPanel from "./components/DataDetailsPanel.vue";
import { population } from './datasets/population.ts'

export default {
  components: {
    Navbar,
    MenuOffcanvas,
    DataSelectionBar,
    KeyWindow,
    InfoPanel,
    DataDetailsPanel
  },
  data() {
    return {
      dataset: population,
      allDatasets: [population]
    }
  },
  mounted() {
    this.dataset.downloadData().then(_ => {
      console.log(this.population.timePeriods)
    })
  }
}
</script>

<template>
  <Navbar/>
  <MenuOffcanvas/>
  <DataSelectionBar/>
  <KeyWindow/>
  <InfoPanel/>

  <div id="main" class="row m-0">
    <DataDetailsPanel :dataset="this.dataset" :allDatasets="this.allDatasets"/>
    <div id="svg-container" class="col col-9 w-100-md-down h-94vh end-0 p-0"></div>
  </div>
</template>
