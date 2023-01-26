<script>
import * as d3 from "d3";
import { getCentreOfSvgElem } from "../../utils";
import { useOptions } from "../../store";

export default {
  props: ["svgFilePath"],
  expose: [
    "getSvgElementById",
    "setAttrs",
    "centreSvgElement",
    "currentScale",
    "viewBoxSize",
  ],
  data() {
    return {
      svgContainer: null,
      zoom: null,
      options: useOptions(),
    };
  },
  watch: {
    svgFilePath() {
      this.refreshData();
    },
  },
  mounted() {
    this.options.$subscribe((mutation) => {
      if (mutation.events.key !== "year") return;
      this.refreshData();
    });
    this.svgContainer = d3.select("#svg-container");
    this.refreshData();
  },
  methods: {
    getSvgElementById(elemId) {
      return this.svgContainer.select(`#${elemId}`);
    },
    setAttrs(elemIdAttrsObject) {
      Object.keys(elemIdAttrsObject).forEach((elemId) => {
        const elem = this.svgContainer.select(`#${elemId}`);
        const attrs = elemIdAttrsObject[elemId];
        Object.keys(attrs).forEach((attr) => {
          elem.attr(attr, attrs[attr]);
        });
      });
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
  computed: {
    currentScale() {
      return d3.zoomTransform(this.svgContainer.node()).k;
    },
    viewBoxSize() {
      const svgElem = this.svgContainer.select("svg");
      return {
        width: parseFloat(svgElem.attr("width")),
        height: parseFloat(svgElem.attr("height")),
      };
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
