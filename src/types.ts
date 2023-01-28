import type * as d3 from "d3";

export type StringObject = { [index: string]: string };
export type MouseEventHandler = (event: any) => void;
export type Formatter = (value: any) => string;
export type D3Selection = d3.Selection<any, any, any, any>;
export type SvgMap = {
  svgPaths: { [index: string]: string };
  prettyNames: StringObject;
};
