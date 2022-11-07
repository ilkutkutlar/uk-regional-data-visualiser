import type { Formatter, SvgMap } from "./types";
import type { ColourMap } from "./colour_map";
import { generateKey } from "./utils";

type DatasetMetadata = {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceLink: string;
};
type DatasetStylingOptions = {
  valueFormatter: Formatter;
};
type DatasetData = { [index: string]: { [index: string]: any } };
type DatasetKey = [string, string][];

export class Dataset {
  metadata: DatasetMetadata;
  svgMap: SvgMap;
  colourMap: ColourMap;
  stylingOptions: DatasetStylingOptions;
  dataPath: string;
  data: DatasetData = {};
  private _key: DatasetKey = [];

  get key() {
    if (this._key === undefined) {
      this._key = generateKey(
        this.colourMap,
        this.stylingOptions.valueFormatter
      );
    }
    return this._key;
  }

  get areas() {
    return Object.keys(this.data[this.timePeriods[0]]);
  }

  get timePeriods() {
    return Object.keys(this.data);
  }

  constructor(
    metadata: DatasetMetadata,
    svgMap: SvgMap,
    colourMap: ColourMap,
    stylingOptions: DatasetStylingOptions,
    dataPath: string
  ) {
    this.metadata = metadata;
    this.svgMap = svgMap;
    this.colourMap = colourMap;
    this.stylingOptions = stylingOptions;
    this.dataPath = dataPath;
  }

  downloadData() {
    return new Promise<void>((resolve) => {
      fetch(this.dataPath, { method: "get" })
        .then((resp) => resp.json())
        .then((data) => {
          this.data = data;
          resolve();
        });
    });
  }

  colourForArea(timePeriod: string, areaCode: string): string | null {
    const value = this.data[timePeriod][areaCode];
    return this.colourMap.mapValueToColour(value);
  }

  valueForArea(timePeriod: string, areaCode: string): number {
    return this.data[timePeriod][areaCode];
  }
}
