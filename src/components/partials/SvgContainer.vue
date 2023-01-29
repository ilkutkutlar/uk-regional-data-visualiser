<script>
import * as d3 from "d3";
import { getCentreOfSvgElem } from "../../utils";
import { useCurrent } from "../../store";

export default {
  props: ["svgFilePath"],
  expose: [
    "getSvgElementById",
    "setElemAttrs",
    "centreSvgElement",
    "currentScale",
    "viewBoxSize",
  ],
  data() {
    return {
      svgContainer: null,
      zoom: null,
      current: useCurrent(),
    };
  },
  computed: {
    viewBoxSize() {
      const svgElem = this.svgContainer.select("svg");
      return {
        width: parseFloat(svgElem.attr("width")),
        height: parseFloat(svgElem.attr("height")),
      };
    },
  },
  watch: {
    svgFilePath() {
      this.refreshData();
    },
  },
  mounted() {
    this.current.$subscribe((mutation) => {
      if (mutation.events.key !== "year") return;
      this.refreshData();
    });
    this.svgContainer = d3.select("#svg-container");
    this.refreshData();
  },
  methods: {
    currentScale() {
      return d3.zoomTransform(this.svgContainer.node()).k;
    },
    getSvgElementById(elemId) {
      return this.svgContainer.select(`#${elemId}`);
    },
    setElemAttrs(elemIdAttrsObject) {
      for (const [elemId, attrs] of Object.entries(elemIdAttrsObject)) {
        const elem = this.svgContainer.select(`#${elemId}`);
        for (const [attrName, attrValue] of Object.entries(attrs)) {
          elem.attr(attrName, attrValue);
        }
      }
    },
    centreSvgElement(elemId) {
      const elem = this.getSvgElementById(elemId);
      const [centreX, centreY] = getCentreOfSvgElem(elem);
      const viewBoxSize = this.viewBoxSize;

      this.translateTo(
        centreX,
        centreY,
        [viewBoxSize.width / 2, viewBoxSize.height / 2],
        1000
      );
    },
    translateTo(x, y, relativeTo, duration) {
      console.log("Current scale:", this.currentScale());
      const zoomTransform = d3.zoomIdentity
        .translate(relativeTo[0], relativeTo[1])
        .scale(this.currentScale())
        .translate(-x, -y);
      this.svgContainer
        .transition()
        .duration(duration)
        .call(this.zoom.transform, zoomTransform);
    },
    refreshData() {
      d3.xml(this.svgFilePath).then((svgData) => {
        this.svgContainer.node().innerHTML = "";
        svgData.documentElement.classList.add("full-page");
        this.svgContainer.node().append(svgData.documentElement);

        this.setZoom();
        this.setBaseStyle();
        this.svgContainer
          .selectAll("path")
          .on("mouseover", (d) => this.$emit("elemMouseOver", d))
          .on("mouseout", (d) => this.$emit("elemMouseOut", d))
          .on("click", (d) => this.$emit("elemClick", d));
        this.$emit("svgDataLoaded");
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
  },
};
</script>

<template>
  <div
    id="svg-container"
    class="col col-9 w-100-md-down h-94vh end-0 p-0"
  ></div>
</template>

<style>
@media (max-width: 991.98px) {
  .w-100-md-down {
    width: 100% !important;
  }
}

.full-page {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
