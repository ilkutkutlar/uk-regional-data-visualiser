import * as d3 from "d3";
import _ from "lodash";

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
  const filter = (item: any) => {
    const formatted = keyFormatter(item[0]) ?? "";
    return formatted.toLowerCase().includes(filterBy.toLowerCase());
  };
  return _.chain(data).toPairs().filter(filter).fromPairs().value();
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
): Array<[string, string]> {
  const rangeHasNegativeNums = colourMap.colourMap.some((entry) => {
    return Number(entry.range[0]) < 0 || Number(entry.range[1]) < 0;
  });
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
