import type { Formatter, SvgMap } from "./types";
import type { ColourMap } from "./colour_map";
import { generateKey } from "./utils";
import { Colours } from "./constants";

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
  private _data: { [index: string]: { [index: string]: any } } = {};
  private _key: [string, string][] = [];

  get key() {
    if (this._key.length == 0) {
      this._key = generateKey(this.colourMap, this.valueFormatter);
      this._key.unshift(["No data", Colours.GREY]);
    }
    return this._key;
  }

  get regions() {
    return Object.keys(this.data[this.years[0]]);
  }

  get years() {
    return Object.keys(this.data);
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  get isDataDownloaded() {
    return Object.keys(this._data).length !== 0;
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
            this._data = data;
            resolve();
          });
      });
    }
  }

  colourForRegion(year: string, regionCode: string): string | null {
    const value = this.data[year][regionCode];
    return this.colourMap.mapValueToColour(value);
  }

  valueForRegion(
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
