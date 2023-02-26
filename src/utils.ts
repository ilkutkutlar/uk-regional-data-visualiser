import type { ColourMap } from "./colour_map";

export type Formatter = (value: any) => string;
export type SvgMap = {
  svgPaths: Map<String, String>;
  prettyNames: Map<String, String>;
};

export function generateKey(
  colourMap: ColourMap,
  valueFormatter: Formatter
): Array<[string, string]> {
  const rangeHasNegativeNums = colourMap.colourMap.some((entry) => {
    const [lower, upper] = entry.range;
    return Number(lower) < 0 || Number(upper) < 0;
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
