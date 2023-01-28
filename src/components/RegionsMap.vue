<script>
import { Colours } from "../constants";
import { setOpacity } from "../utils";
import { useOptions } from "../store";
import SvgContainer from "./partials/SvgContainer.vue";

export default {
  data() {
    return {
      options: useOptions(),
      svgContainer: null,
    };
  },
  components: { SvgContainer },
  mounted() {
    this.svgContainer = this.$refs.svgContainer;

    this.options.$subscribe((mutation) => {
      const events = Array.isArray(mutation.events)
        ? mutation.events
        : [mutation.events];
      events.forEach((event) => {
        switch (event.key) {
          case "highlightedRegions":
            this.unhighlightRegions(event.oldValue);
            this.highlightRegions(event.newValue);
            break;
        }
      });
    });
  },
  computed: {
    svgPath() {
      return (
        this.options.dataset.svgMap.svgPaths.get(this.options.year) ??
        this.options.dataset.svgMap.svgPaths.get("default")
      );
    },
  },
  methods: {
    svgDataLoaded() {
      const elemAttrs = {};
      for (const region of this.options.dataset.svgMap.prettyNames.keys()) {
        const regionColour = this.options.dataset.colourOf(
          this.options.year,
          region
        );
        elemAttrs[region] = { fill: regionColour ?? Colours.GREY };
      }
      this.svgContainer.setElemAttrs(elemAttrs);
    },
    regionMouseOver(d) {
      this.options.addHighlightedRegion(d.target.id);
    },
    regionMouseOut(d) {
      if (d.target.id === this.options.selectedRegion) return;
      this.options.removeHighlightedRegion(d.target.id);
    },
    regionClick(d) {
      this.options.$patch({
        selectedRegion: d.target.id,
        highlightedRegions: [d.target.id],
      });
      this.svgContainer.centreSvgElement(d.target.id);
    },
    highlightRegions(regions) {
      regions.forEach((region) => {
        const targetElement = this.svgContainer.getSvgElementById(region);
        if (targetElement.node() === null) return;
        if (targetElement.attr("highlighted") === "true") return;

        this.svgContainer.setElemAttrs({
          [region]: {
            fill: setOpacity(targetElement.attr("fill"), 0.8),
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
            fill: setOpacity(targetElement.attr("fill"), 1),
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
