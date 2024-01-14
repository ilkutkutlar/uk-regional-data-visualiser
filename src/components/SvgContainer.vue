<script>
import * as d3 from "d3";
import _ from "lodash";
import panzoom from "panzoom";

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
      const elem = this.getSvgElementById(elemId).node();
      this.panzoom.centerOn(elem);
      // this.panzoom.zoomTo(-elem.getBBox().x, -elem.getBBox().y, 2);
    },
    translateTo(x, y) {
      this.panzoom.smoothMoveTo(x, y);
    },
    loadSvgMap() {
      fetch(this.svgFilePath)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          this.svgContainer.node().innerHTML = data;
          const svgElem = this.svgContainer.select("svg").node();
          svgElem.setAttribute("width", "100%");
          svgElem.setAttribute("height", "100%");
          svgElem.setAttribute("style", "position: absolute");
          this.svgContainer
            .selectAll("path")
            .on("mouseover", (d) => this.$emit("elemMouseOver", d))
            .on("mouseout", (d) => this.$emit("elemMouseOut", d))
            .on("click", (d) => this.$emit("elemClick", d));
          this.panzoom = panzoom(this.svgContainer.select("svg g").node(), {
            smoothScroll: false,
            minZoom: 0.5,
            maxZoom: 6,
          });
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
