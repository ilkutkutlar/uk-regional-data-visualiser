<script>
import * as d3 from "d3";
import { Colours } from "../constants";
import { setOpacity, getCentreOfSvgElem } from "../utils";

export default {
  props: [
    "dataset",
    "timePeriod",
    "highlightedRegions",
    "mouseOverHandler",
    "mouseOutHandler",
    "clickHandler",
  ],
  data() {
    return {
      svgContainer: null,
      zoom: null,
    };
  },
  watch: {
    highlightedRegions(newRegionIds, oldRegionIds) {
      oldRegionIds.forEach((regionId) => this.unhighlightRegion(regionId));
      newRegionIds.forEach((regionId) => this.highlightRegion(regionId));
    },
    timePeriod() {
      this.refreshData();
    },
  },
  mounted() {
    this.svgContainer = d3.select("#svg-container");
    this.refreshData();
  },
  computed: {
    viewBoxSize: {
      get() {
        const svgElem = this.svgContainer.select("svg");
        return {
          width: parseFloat(svgElem.attr("width")),
          height: parseFloat(svgElem.attr("height")),
        };
      },
    },
    currentScale: {
      get() {
        return d3.zoomTransform(this.svgContainer.node()).k;
      },
    },
  },
  methods: {
    refreshData() {
      d3.xml(this.dataset.svgMap.svgPath).then((svgData) => {
        svgData.documentElement.classList.add("full-page");
        this.svgContainer.node().append(svgData.documentElement);

        this.setZoom();
        this.setBaseStyle();
        this.setColours();
        this.svgContainer
          .selectAll("path")
          .on("mouseover", (d) => this.$emit("regionMouseOver", d))
          .on("mouseout", (d) => this.$emit("regionMouseOut", d))
          .on("click", (d) => this.$emit("regionClick", d));
      });
    },
    setZoom() {
      this.zoom = d3.zoom().scaleExtent([1, 8]);
      const zoomed = ({ transform }) => {
        /* Passes as parameter the zooming transformation
           (e.g. translate, scale, etc.) so we can apply
           it to the SVG map. */
        this.svgContainer.select("svg g").attr("transform", transform);
      };
      this.svgContainer.call(this.zoom.on("zoom", zoomed));
    },
    setBaseStyle() {
      this.svgContainer
        .selectAll("path")
        .style("cursor", "pointer")
        .attr("stroke", "#dcdcdc")
        .attr("stroke-width", "1")
        .attr("fill", "#412149");
    },
    setColours() {
      this.dataset.svgMap.areas.forEach((region) => {
        const regionColour =
          this.dataset.colourForArea(this.timePeriod, region) ?? Colours.GREY;
        this.svgContainer.select(`#${region}`).attr("fill", regionColour);
      });
    },
    highlightRegion(regionId) {
      const targetElement = this.getSvgElementById(regionId);

      if (targetElement.attr("highlighted") !== "true") {
        const highlightedFill = setOpacity(targetElement.attr("fill"), 0.8);
        targetElement
          .attr("fill", highlightedFill)
          .attr("stroke-width", "2")
          .attr("highlighted", "true");
      }
    },
    unhighlightRegion(regionId) {
      const targetElement = this.getSvgElementById(regionId);

      if (targetElement.attr("highlighted") === "true") {
        const unhighlightedFill = setOpacity(targetElement.attr("fill"), 1);
        targetElement
          .attr("fill", unhighlightedFill)
          .attr("stroke-width", "1")
          .attr("highlighted", "false");
      }
    },
    centreRegion(regionId) {
      const regionElem = this.getSvgElementById(regionId);
      const [regionCentreX, regionCentreY] = getCentreOfSvgElem(regionElem);
      const viewBoxSize = this.viewBoxSize;

      this.translateTo(
        regionCentreX,
        regionCentreY,
        [viewBoxSize.width / 2, viewBoxSize.height / 2],
        1000
      );
    },
    translateTo(x, y, relativeTo, duration) {
      const zoomTransform = d3.zoomIdentity
        .translate(relativeTo[0], relativeTo[1])
        .scale(this.currentScale)
        .translate(-x, -y);
      this.svgContainer
        .transition()
        .duration(duration)
        .call(this.zoom.transform, zoomTransform);
    },
    getSvgElementById(regionId) {
      return this.svgContainer.select(`#${regionId}`);
    },
  },
};
</script>

<template>
  <div
    id="svg-container"
    class="col col-9 w-100-md-down h-94vh end-0 p-0"
  ></div>
</template>
