<script>
import * as d3 from "d3";
import _ from "lodash";
import Panzoom from "@panzoom/panzoom";

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
      panzoom: null,
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
    svgContainerBoundingClientRect() {
      return this.svgContainer.node().getBoundingClientRect()
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
    const elem = document.getElementById("svg-container");
    if (elem) {
      this.panzoom = Panzoom(elem, {
        minScale: 0.5,
        maxScale: 4,
        startScale: 1,
        startX: 0,
        startY: 0,
      });

      if (elem.parentElement) {
        elem.parentElement.addEventListener(
          "wheel",
          this.panzoom.zoomWithWheel
        );
      }
    }
  },
  methods: {
    currentScale() {
      return this.panzoom.getScale();
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
      // const [centreX, centreY] = [
      //   this.viewBoxCentre.x / this.currentScale() -
      //     (elemBb.x + elemBb.width / 2),
      //   this.viewBoxCentre.y / this.currentScale() -
      //     (elemBb.y + elemBb.height / 2),
      // ];
      console.log("elemBb", elemBb);
      const x =
        (elemBb.x / this.viewBoxSize.width) *
        (this.svgContainerBoundingClientRect.width);
      const y =
        (elemBb.y / this.viewBoxSize.height) *
        (this.svgContainerBoundingClientRect.height);
      this.translateTo(-x, -y, 1000);
    },
    translateTo(x, y, duration) {
      this.panzoom.pan(x, y);
      console.log("this", this);
      console.log("xy: ", x, y);
      console.log("scale: ", this.currentScale());
      console.log("viewboxsize: ", this.viewBoxSize);
      // console.log("Current scale:", this.currentScale());
      // const zoomTransform = d3.zoomIdentity
      //   .scale(this.currentScale())
      //   .translate(x, y);

      // if (duration === 0) {
      //   this.svgContainer.call(this.zoom.transform, zoomTransform);
      // } else {
      //   this.svgContainer
      //     .transition()
      //     .duration(duration)
      //     .call(this.zoom.transform, zoomTransform);
      // }
    },
    loadSvgMap() {
      // d3.xml(this.svgFilePath).then((svgData) => {
      //   this.svgContainer.node().innerHTML = "";
      //   svgData.documentElement.setAttribute("width", "100%");
      //   svgData.documentElement.setAttribute("height", "100%");
      //   svgData.documentElement.setAttribute("style", "position: absolute");
      //   this.svgContainer.node().append(svgData.documentElement);

      //   this.setZoom();
      //   this.svgContainer
      //     .selectAll("path")
      //     .on("mouseover", (d) => this.$emit("elemMouseOver", d))
      //     .on("mouseout", (d) => this.$emit("elemMouseOut", d))
      //     .on("click", (d) => this.$emit("elemClick", d));
      //   this.$emit("svgDataLoaded");
      // });
      fetch(this.svgFilePath)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          this.svgContainer.node().innerHTML = data;
          this.svgContainer.select("svg").node().setAttribute("width", "100%");
          this.svgContainer.select("svg").node().setAttribute("height", "100%");
          // this.svgContainer.select("svg").node().setAttribute("style", "position: absolute");
          this.svgContainer
            .selectAll("path")
            .on("mouseover", (d) => this.$emit("elemMouseOver", d))
            .on("mouseout", (d) => this.$emit("elemMouseOut", d))
            .on("click", (d) => this.$emit("elemClick", d));
          this.$emit("svgDataLoaded");
        });
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
