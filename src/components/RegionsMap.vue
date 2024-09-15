<script>
import { Colours } from "../constants";
import { asArray } from "ol/color";
import { useCurrent } from "../store";
import SvgContainer from "./SvgContainer.vue";
import Map from "ol/Map.js";
import View from "ol/View.js";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorImageLayer from "ol/layer/VectorImage.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Stroke, Style } from "ol/style.js";
import VectorLayer from "ol/layer/Vector.js";

export default {
  data() {
    return {
      current: useCurrent(),
      svgContainer: null,
      map: null,
      source: null,
      vectorLayer: null,
    };
  },
  mounted() {
    // TODO: Create a custom source/layer type for UK map
    this.source = new VectorSource({
      url: "data/lad_2021.geojson",
      format: new GeoJSON({}),
    });

    this.vectorLayer = this.generateImageLayer();
    const view = new View({
      center: [0, 0],
      zoom: 7,
      // maxZoom: 8,
    });

    this.map = new Map({
      layers: [this.vectorLayer],
      target: "map",
      view: view,
    });

    let selected = null;
    let highlighted = null;

    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.map,
      style: {
        "stroke-color": "rgba(255, 255, 255, 0.7)",
        "stroke-width": 3,
        "fill-color": "rgba(255, 255, 255, 0.4)",
      },
    });

    this.map.on("singleclick", (e) => {
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (f) => f);
      if (feature === selected) return;
      if (selected) {
        featureOverlay.getSource().removeFeature(selected);
      }
      if (feature) {
        highlighted = null;
        selected = feature;
        this.current.$patch({ selected: feature.get("LAD21CD") });
      }
    });

    this.map.on("pointermove", (e) => {
      if (e.dragging) return;

      const feature = this.map.forEachFeatureAtPixel(e.pixel, (f) => f);

      if (feature === highlighted) return;
      if (feature === selected) {
        featureOverlay.getSource().removeFeature(highlighted);
        return;
      }
      if (highlighted && highlighted !== selected) {
        featureOverlay.getSource().removeFeature(highlighted);
      }
      if (feature) {
        featureOverlay.getSource().addFeature(feature);
        highlighted = feature;
        this.current.$patch({ highlighted: feature.get("LAD21CD") });
      }
    });
    // view.fit(source.getFeatures()[0].getGeometry());

    // this.svgContainer = this.$refs.svgContainer;

    this.current.$subscribe((mutation) => {
      if (mutation.payload.year !== undefined) {
        this.vectorLayer.changed();
      }
    });
  },
  computed: {
    svgPath() {
      return (
        this.current.dataset.svgMap.svgPaths.get(this.current.year) ??
        this.current.dataset.svgMap.svgPaths.get("default")
      );
    },
  },
  methods: {
    generateImageLayer() {
      function styleFunction(feature) {
        const regionColour = this.current.dataset.colourOf(
          this.current.year,
          feature.get("LAD21CD")
        );
        return new Style({
          fill: new Fill({ color: regionColour }),
          stroke: new Stroke({ width: 2, color: "rgba(255, 255, 255, 0.3)" }),
        });
      }
      return new VectorImageLayer({
        background: "#1a2b39",
        imageRatio: 2,
        source: this.source,
        style: styleFunction.bind(this),
      });
    },
  },
};
</script>

<template>
  <div id="map" class="map"></div>

  <!-- <SvgContainer
    ref="svgContainer"
    :svgFilePath="svgPath"
    @svgDataLoaded="svgDataLoaded"
    @elemMouseOver="regionMouseOver"
    @elemMouseOut="regionMouseOut"
    @elemClick="regionClick"
  /> -->
</template>

<style>
.map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
