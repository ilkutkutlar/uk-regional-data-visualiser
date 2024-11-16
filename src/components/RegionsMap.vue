<script>
import { useCurrent } from "../store";
import Map from "ol/Map.js";
import View from "ol/View.js";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorImageLayer from "ol/layer/VectorImage.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Style, Stroke } from "ol/style.js";
import VectorLayer from "ol/layer/Vector.js";
import { defaults, DragPan } from "ol/interaction.js";
import { Kinetic } from "ol";

export default {
  data() {
    return {
      current: useCurrent(),
      map: null,
      source: null,
      vectorLayer: null,
      selected: null,
      highlighted: null,
    };
  },
  watch: {
    geoJSONMap() {
      console.log(this.geoJSONMap);
    },
  },
  mounted() {
    this.vectorLayer = this.generateImageLayer();
    const view = new View({
      center: [0, 0],
      minZoom: 7,
      zoom: 7,
      maxZoom: 11,
    });

    // TODO: add key as a control!
    this.map = new Map({
      layers: [this.vectorLayer],
      target: "map",
      view: view,
      interactions: defaults({ dragPan: false }).extend([
        new DragPan({ kinetic: new Kinetic({ delay: 100 }) }),
      ]),
    });

    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.map,
      style: {
        "stroke-color": "rgba(255, 255, 255, 1)",
        "stroke-width": 4,
        "fill-color": "rgba(255, 255, 255, 0.4)",
      },
    });

    this.map.on("singleclick", (e) => {
      if (e.dragging) return;
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (f) => f);
      if (feature === this.selected) return;
      if (this.selected) {
        featureOverlay.getSource().removeFeature(this.selected);
      }
      if (feature) {
        this.highlighted = null;
        this.selected = feature;
        this.current.$patch({ selected: feature.get("LAD21CD") });
        view.fit(feature.getGeometry(), {
          padding: [0, 200, 0, 0],
          duration: 400,
          maxZoom: 9,
        });
      }
    });

    this.map.on("pointermove", (e) => {
      if (e.dragging) return;

      const feature = this.map.forEachFeatureAtPixel(e.pixel, (f) => f);

      if (feature === this.highlighted) return;
      if (feature === this.selected) {
        featureOverlay.getSource().removeFeature(this.highlighted);
        return;
      }
      if (this.highlighted && this.highlighted !== this.selected) {
        featureOverlay.getSource().removeFeature(this.highlighted);
      }
      if (feature) {
        featureOverlay.getSource().addFeature(feature);
        this.highlighted = feature;
        this.current.$patch({ highlighted: feature.get("LAD21CD") });
      }
    });

    this.current.$subscribe((mutation) => {
      if (mutation.payload.year !== undefined) {
        this.vectorLayer.setSource(
          new VectorSource({
            url: this.geoJSONMap,
            format: new GeoJSON({}),
          })
        );
        this.vectorLayer.changed();
      }
    });
  },
  computed: {
    geoJSONMap() {
      return (
        this.current.dataset.geoJSONMap.geoJsonPaths.get(this.current.year) ??
        this.current.dataset.geoJSONMap.geoJsonPaths.get("default")
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
          fill: new Fill({ color: regionColour ?? "#bfbfbf" }),
          stroke: new Stroke({ width: 1 }),
        });
      }
      // TODO: Create a custom source/layer type for UK map
      return new VectorImageLayer({
        background: "#1a2b39",
        imageRatio: 2,
        source: new VectorSource({
          url: this.geoJSONMap,
          format: new GeoJSON({}),
        }),
        style: styleFunction.bind(this),
      });
    },
  },
};
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style>
.map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
