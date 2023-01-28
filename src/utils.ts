import * as d3 from "d3";

import type { ColourMap } from "./colour_map";

export type Formatter = (value: any) => string;
export type SvgMap = {
  svgPaths: Map<String, String>;
  prettyNames: Map<String, String>;
};

export function filterDataByKey(
  data: { [index: string]: string },
  keyFormatter: Formatter,
  filterBy: string
) {
  const filter = (row: [string, any]) => {
    const formatted = keyFormatter(row[0]);
    if (formatted !== undefined) {
      return formatted.toLowerCase().includes(filterBy.toLowerCase());
    }
  };
  const sortedEntries = Object.entries(data).filter(filter);
  return Object.fromEntries(sortedEntries);
}

export function sortObjectByValue(obj: object, sortAsc: boolean = true) {
  const entries = Object.entries(obj);
  const sortFunction = sortAsc
    ? (a: [any, number], b: [any, number]) => a[1] - b[1]
    : (a: [any, number], b: [any, number]) => b[1] - a[1];
  entries.sort(sortFunction);
  return Object.fromEntries(entries);
}

export function getCentreOfSvgElem(
  svg: d3.Selection<any, any, any, any>
): [number, number] {
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
  }
  return null;
}

export function removeByValue<Type>(
  arr: Array<Type>,
  value: Type
): Array<Type> {
  return arr.filter((item) => item !== value);
}
