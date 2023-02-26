<script>
import * as d3 from "d3";
import _ from "lodash";

export default {
  props: ["svgFilePath"],
  expose: [
    "getSvgElementById",
    "setElemAttrs",
    "centreSvgElement",
    "centreMap",
  ],
  data() {
    return {
      svgContainer: null,
      zoom: null,
    };
  },
  computed: {
    viewBoxSize() {
      const svgElem = this.svgContainer.select("svg");
      const viewBoxBounds = svgElem.attr("viewBox").split(" ");
      return {
        width: parseFloat(viewBoxBounds[2]),
        height: parseFloat(viewBoxBounds[3]),
      };
    },
    viewBoxCentre() {
      return {
        x: this.viewBoxSize.width / 2,
        y: this.viewBoxSize.height / 2,
      };
    },
  },
  watch: {
    svgFilePath() {
      this.loadSvgMap();
    },
  },
  mounted() {
    this.svgContainer = d3.select("#svg-container");
    this.loadSvgMap();
  },
  methods: {
    currentScale() {
      return d3.zoomTransform(this.svgContainer.node()).k;
    },
    getSvgElementById(elemId) {
      return this.svgContainer.select(`#${elemId}`);
    },
    setElemAttrs(elemIdAttrsObject) {
      _.toPairs(elemIdAttrsObject).forEach(([elemId, attrs]) => {
        const elem = this.svgContainer.select(`#${elemId}`);
        _.toPairs(attrs).forEach(([attrName, attrValue]) => {
          elem.attr(attrName, attrValue);
        });
      });
    },
    centreMap() {
      this.translateTo(0, 0, 0);
    },
    centreSvgElement(elemId) {
      const elem = this.getSvgElementById(elemId);
      const elemBb = elem.node().getBBox();
      const [centreX, centreY] = [
        this.viewBoxCentre.x - elemBb.x - elemBb.width / 2,
        this.viewBoxCentre.y - elemBb.y - elemBb.height / 2,
      ];
      this.translateTo(centreX, centreY, 1000);
    },
    translateTo(x, y, duration) {
      console.log("Current scale:", this.currentScale());
      const zoomTransform = d3.zoomIdentity
        .scale(this.currentScale())
        .translate(x, y);

      if (duration === 0) {
        this.svgContainer.call(this.zoom.transform, zoomTransform);
      } else {
        this.svgContainer
          .transition()
          .duration(duration)
          .call(this.zoom.transform, zoomTransform);
      }
    },
    loadSvgMap() {
      d3.xml(this.svgFilePath).then((svgData) => {
        this.svgContainer.node().innerHTML = "";
        svgData.documentElement.setAttribute("width", "100%");
        svgData.documentElement.setAttribute("height", "100%");
        svgData.documentElement.setAttribute("style", "position: absolute");
        this.svgContainer.node().append(svgData.documentElement);

        this.setZoom();
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
  },
};
</script>

<template>
  <div id="svg-container"></div>
</template>

<style>
/* TODO: do mouse-over using :hover */

path {
  cursor: pointer;
  stroke: #dcdcdc;
  stroke-width: 1;
}
</style>
