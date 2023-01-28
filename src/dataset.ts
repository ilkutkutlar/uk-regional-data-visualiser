import type { Formatter, SvgMap } from "./utils";
import type { ColourMap } from "./colour_map";

type DatasetMetadata = {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceLink: string;
};

export class Dataset {
  metadata: DatasetMetadata;
  svgMap: SvgMap;
  colourMap: ColourMap;
  dataPath: string;
  valueFormatter: Formatter;
  data: { [index: string]: { [index: string]: any } } = {};

  get regions() {
    return Object.keys(this.data[this.years[0]]);
  }

  get years() {
    return Object.keys(this.data);
  }

  get isDataDownloaded() {
    return Object.keys(this.data).length !== 0;
  }

  constructor(
    metadata: DatasetMetadata,
    svgMap: SvgMap,
    colourMap: ColourMap,
    valueFormatter: Formatter,
    dataPath: string
  ) {
    this.metadata = metadata;
    this.svgMap = svgMap;
    this.colourMap = colourMap;
    this.valueFormatter = valueFormatter;
    this.dataPath = dataPath;
  }

  downloadData() {
    if (this.isDataDownloaded) {
      return new Promise<void>((resolve) => resolve());
    } else {
      return new Promise<void>((resolve) => {
        fetch(this.dataPath, { method: "get" })
          .then((resp) => resp.json())
          .then((data) => {
            this.data = data;
            resolve();
          });
      });
    }
  }

  colourOf(year: string, regionCode: string): string | null {
    const value = this.data[year][regionCode];
    return this.colourMap.mapValueToColour(value);
  }

  valueOf(
    year: string,
    regionCode: string,
    formatValue: boolean = false
  ): number | string {
    let value = NaN;
    if (year in this.data && regionCode in this.data[year]) {
      value = this.data[year][regionCode];
    }
    return formatValue ? this.valueFormatter(value) : value;
  }
}
