import * as d3 from "d3";

import type { D3Selection, Formatter } from "./types";
import type { ColourMap } from "./colour_map";

export function sortObjectByValue(obj: object, sortAsc: boolean = true) {
  const entries = Object.entries(obj);
  const sortFunction = sortAsc
    ? (a: [any, number], b: [any, number]) => a[1] - b[1]
    : (a: [any, number], b: [any, number]) => b[1] - a[1];
  entries.sort(sortFunction);
  return Object.fromEntries(entries);
}

export function getCentreOfSvgElem(svg: D3Selection): [number, number] {
  const bBox = svg.node().getBBox();
  return [bBox.x + bBox.width / 2, bBox.y + bBox.height / 2];
}

export function generateKey(
  colourMap: ColourMap,
  valueFormatter: Formatter
): [string, string][] {
  const rangeHasNegativeNums = Object.entries(colourMap.colourMap).some(
    (entry) => {
      const range = entry[1].range;
      return Number(range[0]) < 0 || Number(range[1]) < 0;
    }
  );
  const separator = rangeHasNegativeNums ? "to" : "-";

  return colourMap.colourMap.map((mapping) => {
    const [lower, upper] = mapping.range;
    const rangeDisplayText = isNaN(upper)
      ? `${valueFormatter(lower)}+`
      : `${valueFormatter(lower)} ${separator} ${valueFormatter(upper)}`;
    return [rangeDisplayText, mapping.colour];
  });
}

export function setOpacity(
  colourString: string,
  opacity: number
): string | null {
  const colour = d3.color(colourString);
  if (colour) {
    colour.opacity = opacity;
    return colour.toString();
  } else {
    return null;
  }
}

export class RectSize {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}
