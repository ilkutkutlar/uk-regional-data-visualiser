<script>
import { Colours } from "../constants";
import { useCurrent } from "../store";
import SvgContainer from "./SvgContainer.vue";
import _ from "lodash";

export default {
  data() {
    return {
      current: useCurrent(),
      svgContainer: null,
    };
  },
  components: { SvgContainer },
  mounted() {
    this.svgContainer = this.$refs.svgContainer;

    this.current.$subscribe((mutation) => {
      const events = _.isArray(mutation.events)
        ? mutation.events
        : [mutation.events];
      events.forEach((event) => {
        switch (event.key) {
          case "highlightedRegions":
            this.unhighlightRegions(event.oldValue);
            this.highlightRegions(event.newValue);
            break;
          case "year":
            this.setRegionColours();
            break;
          case "selectedRegion":
            this.svgContainer.centreSvgElement(event.newValue);
            break;
        }
      });
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
    setRegionColours() {
      const elemAttrs = {};
      for (const region of this.current.dataset.svgMap.prettyNames.keys()) {
        const regionColour = this.current.dataset.colourOf(
          this.current.year,
          region
        );
        elemAttrs[region] = { fill: regionColour ?? Colours.GREY };
      }
      this.svgContainer.setElemAttrs(elemAttrs);
    },
    svgDataLoaded() {
      this.setRegionColours();
      this.svgContainer.centreMap();
    },
    regionMouseOver(d) {
      this.current.addHighlightedRegion(d.target.id);
    },
    regionMouseOut(d) {
      if (d.target.id === this.current.selectedRegion) return;
      this.current.removeHighlightedRegion(d.target.id);
    },
    regionClick(d) {
      this.current.$patch({
        selectedRegion: d.target.id,
        highlightedRegions: [d.target.id],
      });
    },
    highlightRegions(regions) {
      regions.forEach((region) => {
        const targetElement = this.svgContainer.getSvgElementById(region);
        if (targetElement.node() === null) return;
        if (targetElement.attr("highlighted") === "true") return;

        this.svgContainer.setElemAttrs({
          [region]: {
            opacity: 0.8,
            "stroke-width": 2,
            highlighted: "true",
          },
        });
      });
    },
    unhighlightRegions(regions) {
      regions.forEach((region) => {
        const targetElement = this.svgContainer.getSvgElementById(region);
        if (targetElement.node() === null) return;
        if (targetElement.attr("highlighted") !== "true") return;

        this.svgContainer.setElemAttrs({
          [region]: {
            opacity: 1,
            "stroke-width": 1,
            highlighted: "false",
          },
        });
      });
    },
  },
};
</script>

<template>
  <SvgContainer
    ref="svgContainer"
    :svgFilePath="svgPath"
    @svgDataLoaded="svgDataLoaded"
    @elemMouseOver="regionMouseOver"
    @elemMouseOut="regionMouseOut"
    @elemClick="regionClick"
  />
</template>
