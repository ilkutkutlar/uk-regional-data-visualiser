<script>
import * as d3 from "d3";
import { Colours } from "../constants";
import { setOpacity, getCentreOfSvgElem } from "../utils";

export default {
  props: [
    "dataset",
    "timePeriod",
    "highlightedRegion",
    "mouseOverHandler",
    "mouseOutHandler",
    "clickHandler",
  ],
  data() {
    return {
      svgData: "",
    };
  },
  watch: {
    highlightedRegion(newRegionId, oldRegionId) {
      if (newRegionId) this.highlightRegion(newRegionId);
      if (oldRegionId) this.unhighlightRegion(oldRegionId);
    },
    timePeriod() {
      this.refreshData();
    },
  },
  methods: {
    highlightRegion(regionId) {
      const targetElement = this.getSvgElementById(regionId);

      if (targetElement.attr("highlighted") !== "true") {
        const highlightedFill = setOpacity(targetElement.attr("fill"), 0.8);
        targetElement.attr("fill", highlightedFill).attr("stroke-width", "2");
        targetElement.attr("highlighted", "true");
      }
    },
    unhighlightRegion(regionId) {
      const targetElement = this.getSvgElementById(regionId);

      if (targetElement.attr("highlighted") === "true") {
        const unhighlightedFill = setOpacity(targetElement.attr("fill"), 1);
        targetElement.attr("fill", unhighlightedFill).attr("stroke-width", "1");
        targetElement.attr("highlighted", "false");
      }
    },
    getSvgElementById(regionId) {
      const svgContainer = d3.select("#svg-container");
      return svgContainer.select(`#${regionId}`);
    },
    setZoom(svgContainer, svgData) {
      const zoom = d3.zoom().scaleExtent([1, 8]);
      svgContainer.node().append(svgData.documentElement);
      const zoomed = ({ transform }) => {
        /* Passes as parameter the zooming transformation
           (e.g. translate, scale, etc.) so we can apply
           it to the SVG map. */
        svgContainer.select("svg").select("g").attr("transform", transform);
      };
      svgContainer.call(zoom.on("zoom", zoomed));
    },
    setBaseStyle(svgContainer) {
      const FILL_COLOUR = "#412149";
      const STROKE_COLOUR = "#dcdcdc";
      const STROKE_WIDTH = "1";

      svgContainer
        .selectAll("path")
        .style("cursor", "pointer")
        .attr("stroke", STROKE_COLOUR)
        .attr("stroke-width", STROKE_WIDTH)
        .attr("fill", FILL_COLOUR);
    },
    setColours(svgContainer) {
      this.dataset.svgMap.areas.forEach((region) => {
        const regionColour =
          this.dataset.colourForArea(this.timePeriod, region) ?? Colours.GREY;
        svgContainer.select(`#${region}`).attr("fill", regionColour);
      });
    },
    centreRegion(regionId, duration = 2000) {
      const regionElem = this.getSvgElementById(regionId);
      const [regionCentreX, regionCentreY] = getCentreOfSvgElem(regionElem);
      const viewBoxSize = this.viewBoxSize;

      this.translateTo(
        regionCentreX,
        regionCentreY,
        [viewBoxSize.width / 2, viewBoxSize.height / 2],
        duration
      );
    },
    translateTo(x, y, relativeTo = [0, 0], duration = 1000) {
      const zoomTransform = d3.zoomIdentity
        .translate(relativeTo[0], relativeTo[1])
        .scale(this.currentScale)
        .translate(-x, -y);
      this.svgContainer
        .transition()
        .duration(duration)
        .call(this.zoom.transform, zoomTransform);
    },
    refreshData() {
      d3.xml(this.dataset.svgMap.svgPath).then((svgData) => {
        svgData.documentElement.classList.add("full-page");
        const svgContainer = d3.select("#svg-container");

        this.setZoom(svgContainer, svgData);
        this.setBaseStyle(svgContainer);
        this.setColours(svgContainer);
        svgContainer
          .selectAll("path")
          .on("mouseover", (d) => this.$emit("regionMouseOver", d))
          .on("mouseout", (d) => this.$emit("regionMouseOut", d))
          .on("click", (d) => this.$emit("regionClick", d));
      });
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>

<template>
  <div
    id="svg-container"
    class="col col-9 w-100-md-down h-94vh end-0 p-0"
  ></div>
</template>
