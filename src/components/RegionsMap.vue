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
      regionsLayer: null,
      view: null,
      map: null,
      featureOverlay: null,
      selectedFeature: null,
      highlightedFeature: null,
    };
  },
  mounted() {
    this.regionsLayer = this.createRegionsLayer(this.geoJSONIDProperty);

    this.view = new View({
      center: [0, 0],
      minZoom: 7,
      zoom: 7,
      maxZoom: 11,
    });

    // TODO: add key as a control
    this.map = new Map({
      layers: [this.regionsLayer],
      target: "map",
      view: this.view,
      interactions: defaults({ dragPan: false }).extend([
        new DragPan({ kinetic: new Kinetic({ delay: 100 }) }),
      ]),
    });

    this.featureOverlay = new VectorLayer({
      map: this.map,
      source: new VectorSource(),
      style: {
        "stroke-color": "rgba(255, 255, 255, 1)",
        "stroke-width": 4,
        "fill-color": "rgba(255, 255, 255, 0.4)",
      },
    });

    this.map.on("singleclick", (e) => {
      if (e.dragging) return;

      const feature = this.map.forEachFeatureAtPixel(e.pixel, (f) => f);
      if (!feature) return;

      this.current.$patch({
        selectedRegionID: feature.get(this.geoJSONIDProperty),
      });
    });

    this.map.on("pointermove", (e) => {
      // TODO: when pointer is outside the map, hide the info panel
      if (e.dragging) return;

      const feature = this.map.forEachFeatureAtPixel(e.pixel, (f) => f);
      if (!feature) return;

      this.current.$patch({
        highlightedRegionID: feature.get(this.geoJSONIDProperty),
      });
    });

    this.current.$onAction(({ name, after }) => {
      switch (name) {
        case "setYear":
          after(() => {
            this.regionsLayer.setSource(
              new VectorSource({
                url: this.geoJSONFilePath,
                format: new GeoJSON({}),
              })
            );
            this.regionsLayer.changed();
          });
          break;
        case "clearHighlighted":
          this.removeHighlightOverlay(this.highlightedFeature);
          this.highlightedFeature = null;
          break;
        case "clearSelected":
          this.removeHighlightOverlay(this.selectedFeature);
          this.selectedFeature = null;
          break;
      }
    });
    this.current.$subscribe((mutation) => {
      if (mutation.type !== "patch object") return;

      // TODO: consider using actions instead
      if (mutation.payload.highlightedRegionID) {
        const feature = this.getFeatureByRegionId(
          mutation.payload.highlightedRegionID
        );

        if (!feature) return;
        if (feature === this.highlightedFeature) return;
        this.removeHighlightOverlay(this.highlightedFeature);
        if (feature === this.selectedFeature) return;

        this.applyHighlightOverlay(feature);
        this.highlightedFeature = feature;
      }

      if (mutation.payload.selectedRegionID) {
        const feature = this.getFeatureByRegionId(
          mutation.payload.selectedRegionID
        );

        if (!feature) return;
        if (feature === this.selectedFeature) return;
        if (this.selectedFeature) {
          this.removeHighlightOverlay(this.selectedFeature);
        }

        this.highlightedFeature = null;
        this.selectedFeature = feature;
        this.centreOnRegion(feature);
      }
    });
  },
  computed: {
    geoJSONFilePath() {
      const geoJSONPaths = this.current.dataset.geoJSONMap.geoJSONPaths;
      return geoJSONPaths.get(this.current.year) ?? geoJSONPaths.get("default");
    },
    geoJSONIDProperty() {
      return this.current.dataset.geoJSONMap.idProperties.get(
        this.current.year
      );
    },
  },
  methods: {
    applyHighlightOverlay(regionFeature) {
      this.featureOverlay.getSource().addFeature(regionFeature);
    },
    removeHighlightOverlay(regionFeature) {
      this.featureOverlay.getSource().removeFeature(regionFeature);
    },
    centreOnRegion(regionFeature) {
      this.view.fit(regionFeature.getGeometry(), {
        padding: [0, 200, 0, 0],
        duration: 400,
        maxZoom: 9,
      });
    },
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
          url: this.geoJSONFilePath,
          format: new GeoJSON({}),
        }),
        style: styleFunction.bind(this),
      });
    },
    getFeatureByRegionId(regionId) {
      const features = this.regionsLayer.getSource().getFeatures();
      // TODO: use .find() here
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
