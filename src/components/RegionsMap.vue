<script>
import * as d3 from "d3";
import { Colours } from "../constants";
import { setOpacity, getCentreOfSvgElem } from "../utils";
import { selected } from "../store";

export default {
  data() {
    return {
      svgContainer: null,
      zoom: null,
      selected: selected(),
    };
  },
  watch: {
    timePeriod: "refreshData",
  },
  mounted() {
    this.selected.$subscribe(
      (mutation) => {
        switch (mutation.events.key) {
          case "timePeriod":
            this.refreshData();
            break;
          case "highlightedRegions":
            this.unhighlightRegions(mutation.events.oldValue);
            this.highlightRegions(mutation.events.newValue);
            break;
        }
      },
      { flush: "sync" }
    );
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
      d3.xml(this.selected.dataset.svgMap.svgPath).then((svgData) => {
        this.svgContainer.node().innerHTML = "";
        svgData.documentElement.classList.add("full-page");
        this.svgContainer.node().append(svgData.documentElement);

        this.setZoom();
        this.setBaseStyle();
        this.setColours();
        this.svgContainer
          .selectAll("path")
          .on("mouseover", (d) => this.regionMouseOver(d))
          .on("mouseout", (d) => this.regionMouseOut(d))
          .on("click", (d) => this.regionClick(d));
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
      this.selected.dataset.svgMap.areas.forEach((region) => {
        const regionColour =
          this.selected.dataset.colourForArea(
            this.selected.timePeriod,
            region
          ) ?? Colours.GREY;
        this.svgContainer.select(`#${region}`).attr("fill", regionColour);
      });
    },
    highlightRegions(regionIds) {
      regionIds.forEach((regionId) => {
        const targetElement = this.getSvgElementById(regionId);
        if (targetElement.node() === null) return;
        if (targetElement.attr("highlighted") === "true") return;

        const highlightedFill = setOpacity(targetElement.attr("fill"), 0.8);
        targetElement
          .attr("fill", highlightedFill)
          .attr("stroke-width", "2")
          .attr("highlighted", "true");
      });
    },
    unhighlightRegions(regionIds) {
      regionIds.forEach((regionId) => {
        const targetElement = this.getSvgElementById(regionId);
        if (targetElement.node() === null) return;
        if (targetElement.attr("highlighted") !== "true") return;

        const unhighlightedFill = setOpacity(targetElement.attr("fill"), 1);
        targetElement
          .attr("fill", unhighlightedFill)
          .attr("stroke-width", "1")
          .attr("highlighted", "false");
      });
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
    regionMouseOver(d) {
      this.selected.addHighlightedRegion(d.target.id);
      if (this.selected.selectedRegion) return;
      this.selected.focusedRegion = d.target.id;
    },
    regionMouseOut(d) {
      if (d.target.id !== this.selected.selectedRegion) {
        this.selected.removeHighlightedRegion(d.target.id);
      }
      if (this.selected.selectedRegion) return;
      this.selected.focusedRegion = "";
    },
    regionClick(d) {
      if (this.selected.selectedRegion) {
        this.selected.removeHighlightedRegion(this.selected.selectedRegion);
      }
      this.selected.$patch({
        selectedRegion: d.target.id,
        highlightedRegions: [d.target.id],
        focusedRegion: d.target.id,
      });
      this.centreRegion(d.target.id);
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
