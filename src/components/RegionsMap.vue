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
      regionsLayer: null,
      selectedFeature: null,
      highlightedFeature: null,
    };
  },
  mounted() {
    this.regionsLayer = this.createRegionsLayer(this.geoJSONIDProperty);
    const view = new View({
      center: [0, 0],
      minZoom: 7,
      zoom: 7,
      maxZoom: 11,
    });

    // TODO: add key as a control!
    const map = new Map({
      layers: [this.regionsLayer],
      target: "map",
      view: view,
      interactions: defaults({ dragPan: false }).extend([
        new DragPan({ kinetic: new Kinetic({ delay: 100 }) }),
      ]),
    });

    const featureOverlay = new VectorLayer({
      map: map,
      source: new VectorSource(),
      style: {
        "stroke-color": "rgba(255, 255, 255, 1)",
        "stroke-width": 4,
        "fill-color": "rgba(255, 255, 255, 0.4)",
      },
    });

    const highlightRegion = (regionFeature) => {
      featureOverlay.getSource().addFeature(regionFeature);
    };

    const unhighlightRegion = (regionFeature) => {
      featureOverlay.getSource().removeFeature(regionFeature);
    };

    const centreOnRegion = (regionFeature) => {
      view.fit(regionFeature.getGeometry(), {
        padding: [0, 200, 0, 0],
        duration: 400,
        maxZoom: 9,
      });
    };

    map.on("singleclick", (e) => {
      if (e.dragging) return;

      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);

      if (!feature) return;
      if (feature === this.selectedFeature) return;
      if (this.selectedFeature) unhighlightRegion(this.selectedFeature);

      this.highlightedFeature = null;
      this.selectedFeature = feature;
      this.current.$patch({
        selected: feature.get(this.geoJSONIDProperty),
      });
      centreOnRegion(feature);
    });

    map.on("pointermove", (e) => {
      // TODO: when pointer is outside the map, hide the info panel
      if (e.dragging) return;

      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);

      this.current.$patch({
        highlighted: feature,
      });
    });

    this.current.$subscribe((mutation) => {
      if (mutation.payload.year !== undefined) {
        this.regionsLayer.setSource(
          new VectorSource({
            url: this.geoJSONMap,
            format: new GeoJSON({}),
          })
        );
        this.regionsLayer.changed();
      }

      if (mutation.payload.highlighted) {
        const feature =
          typeof mutation.payload.highlighted == "string"
            ? this.getFeatureByRegionId(mutation.payload.highlighted)
            : mutation.payload.highlighted;

        if (!feature) return;
        if (feature === this.highlightedFeature) return;
        unhighlightRegion(this.highlightedFeature);
        if (feature === this.selectedFeature) return;

        highlightRegion(feature);
        this.highlightedFeature = feature;
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
    geoJSONIDProperty() {
      return this.current.dataset.geoJSONMap.idProperties.get(
        this.current.year
      );
    },
  },
  methods: {
    createRegionsLayer() {
      function styleFunction(feature) {
        const regionColour = this.current.dataset.colourOf(
          this.current.year,
          feature.get(this.geoJSONIDProperty)
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
    getFeatureByRegionId(regionId) {
      const features = this.regionsLayer.getSource().getFeatures();
      for (const feature of features) {
        if (feature.get(this.geoJSONIDProperty) === regionId) {
          return feature;
        }
      }
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
