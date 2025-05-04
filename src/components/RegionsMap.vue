<script lang="ts">
import { defaults, DragPan } from "ol/interaction.js";
import { Feature, Kinetic, MapBrowserEvent } from "ol";
import { Fill, Stroke, Style } from "ol/style.js";
import { Boundaries } from "@/boundaries";
import { Colours } from "@/constants";
import GeoJSON from "ol/format/GeoJSON.js";
import Map from "ol/Map.js";
import { RegionalDataset } from "@/dataset";
import { type StyleLike } from "ol/style/Style";
import { useTheme } from "vuetify";
import VectorImageLayer from "ol/layer/VectorImage.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import View from "ol/View.js";

export default {
  props: {
    dataset: {
      type: RegionalDataset,
      required: true,
    },
    boundaries: {
      type: Boundaries,
      required: true,
    },
    highlightedRegionId: {
      type: String,
      required: true,
    },
    selectedRegionId: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  emits: [
    "regionPointerMove",
    "regionSingleClick",
    "update:highlightedRegionId",
  ],
  data() {
    return {
      theme: useTheme(),
      regionsLayer: undefined as VectorImageLayer | undefined,
      view: undefined as View | undefined,
      map: undefined as Map | undefined,
      featureOverlay: undefined as VectorLayer | undefined,
      selectedFeature: undefined as Feature | undefined,
      highlightedFeature: undefined as Feature | undefined,
      centredZoom: 9 as number,
    };
  },
  computed: {
    backgroundColour() {
      return this.theme.global.current.dark ? "#212121" : "#F5F5F5";
    },
    geoJsonFilePath() {
      const maybeFilePath = this.dataset.boundaries.boundariesFiles.get(
        this.year,
      )?.filePath;
      if (!maybeFilePath) {
        throw new Error(
          `No file path found for the GeoJSON file for year ${this.year}`,
        );
      }
      return maybeFilePath;
    },
    /**
     * Get the ID property for the GeoJSON file for a given year. This is the property
     * of each feature in the GeoJSON file that contain the code for the region the
     * feature depicts.
     * @throws Will throw an error if the year is not found in the boundaries files.
     */
    geoJsonIdProperty() {
      const maybeIdProperty = this.dataset.boundaries.boundariesFiles.get(
        this.year,
      )?.idProperty;
      if (!maybeIdProperty) {
        throw new Error(
          `No ID property found for the GeoJSON file for year ${this.year}`,
        );
      }
      return maybeIdProperty;
    },
  },
  watch: {
    "theme.global.name"() {
      this.regionsLayer.setBackground(this.backgroundColour);
    },
    highlightedRegionId(newRegionId) {
      if (newRegionId === "") {
        this.removeHighlightOverlay(this.highlightedFeature);
        this.highlightedFeature = null;
        return;
      }

      const feature = this.getFeatureByRegionId(newRegionId);

      if (!feature || feature === this.highlightedFeature) return;
      this.removeHighlightOverlay(this.highlightedFeature);
      if (feature === this.selectedFeature) return;

      this.applyHighlightOverlay(feature);
      this.highlightedFeature = feature;
    },
    selectedRegionId(newRegionId) {
      if (newRegionId === "") {
        this.removeHighlightOverlay(this.selectedFeature);
        this.selectedFeature = null;
        return;
      }

      const feature = this.getFeatureByRegionId(newRegionId);

      if (!feature || feature === this.selectedFeature) return;
      if (this.selectedFeature) {
        this.removeHighlightOverlay(this.selectedFeature);
      }

      this.highlightedFeature = null;
      this.selectedFeature = feature;
      this.centreOnRegion(feature);
    },
    year() {
      this.regionsLayer.setSource(
        new VectorSource({
          url: this.geoJsonFilePath,
          format: new GeoJSON({}),
        }),
      );
      this.regionsLayer.changed();
    },
  },
  mounted() {
    this.regionsLayer = this.createRegionsLayer();

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

    this.map.on("singleclick", (e: MapBrowserEvent<UIEvent>) => {
      if (e.dragging) return;

      const feature = this.map.forEachFeatureAtPixel(
        e.pixel,
        (f: Feature) => f,
      );
      if (!feature) return;

      this.$emit("regionSingleClick", feature.get(this.geoJsonIdProperty));
    });

    this.map.on("pointermove", (e: MapBrowserEvent<UIEvent>) => {
      if (e.dragging) return;

      const feature = this.map.forEachFeatureAtPixel(
        e.pixel,
        (f: Feature) => f,
      );
      if (!feature) {
        if (this.highlightedFeature) {
          this.$emit("update:highlightedRegionId", "");
        }
        return;
      }

      this.$emit("regionPointerMove", feature.get(this.geoJsonIdProperty));
    });
  },
  methods: {
    applyHighlightOverlay(regionFeature: Feature) {
      this.featureOverlay.getSource().addFeature(regionFeature);
    },
    removeHighlightOverlay(regionFeature: Feature) {
      this.featureOverlay.getSource().removeFeature(regionFeature);
    },
    centreOnRegion(regionFeature: Feature) {
      this.view.fit(regionFeature.getGeometry(), {
        padding: [0, 200, 0, 0],
        duration: 400,
        // If we are already zoomed in more than the desired level, don't zoom out.
        maxZoom: Math.max(this.view.getZoom(), this.centredZoom),
      });
    },
    createRegionsLayer(): VectorImageLayer {
      const styleFunction = (feature: Feature): Style => {
        const regionColour = this.dataset.colourOf(
          this.year,
          feature.get(this.geoJsonIdProperty),
        );
        return new Style({
          fill: new Fill({ color: regionColour ?? Colours.GREY }),
          stroke: new Stroke({ width: 1 }),
        });
      };
      // TODO: Create a custom source/layer type for UK map
      return new VectorImageLayer({
        background: this.backgroundColour,
        imageRatio: 2,
        source: new VectorSource({
          url: this.geoJsonFilePath,
          format: new GeoJSON({}),
        }),
        style: styleFunction.bind(this) as StyleLike,
      });
    },
    getFeatureByRegionId(regionId: string): Feature {
      const features = this.regionsLayer.getSource().getFeatures();
      return features.find(
        (feature: Feature) => feature.get(this.geoJsonIdProperty) === regionId,
      );
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
