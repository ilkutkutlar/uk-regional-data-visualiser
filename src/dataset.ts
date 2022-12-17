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
  valueFormatter: Formatter;
  dataPath: string;
  private _data: { [index: string]: { [index: string]: any } } = {};
  private _key: [string, string][] = [];

  get key() {
    if (this._key.length == 0) {
      this._key = generateKey(this.colourMap, this.valueFormatter);
      this._key.unshift(["No data", Colours.GREY]);
    }
    return this._key;
  }

  get areas() {
    return Object.keys(this.data[this.timePeriods[0]]);
  }

  get timePeriods() {
    return Object.keys(this.data);
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
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
    const dataEmpty = Object.keys(this._data).length == 0;
    if (dataEmpty) {
      return new Promise<void>((resolve) => {
        fetch(this.dataPath, { method: "get" })
          .then((resp) => resp.json())
          .then((data) => {
            this._data = data;
            resolve();
          });
      });
    } else {
      return new Promise<void>((resolve) => resolve());
    }
  }

  colourForArea(timePeriod: string, areaCode: string): string | null {
    const value = this.data[timePeriod][areaCode];
    return this.colourMap.mapValueToColour(value);
  }

  valueForArea(timePeriod: string, areaCode: string): number {
    return this.data[timePeriod][areaCode];
  }
}
