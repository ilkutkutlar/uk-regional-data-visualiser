import _ from "lodash";
import { Boundaries } from "./boundaries";
import { type ColourMap } from "@/colour_map";
import { type Formatter } from "@/constants";

type DatasetMetadata = {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceLink: string;
  boundaries: string;
  licenceType: string;
};

export class Dataset {
  metadata: DatasetMetadata;
  boundaries: Boundaries;
  colourMap: ColourMap;
  dataPath: string;
  valueFormatter: Formatter;
  data: { [index: string]: { [index: string]: number } } = {};

  get years() {
    return Object.keys(this.data);
  }

  get isDataDownloaded() {
    return !_.isEmpty(this.data);
  }

  constructor(
    metadata: DatasetMetadata,
    boundaries: Boundaries,
    colourMap: ColourMap,
    valueFormatter: Formatter,
    dataPath: string,
  ) {
    this.metadata = metadata;
    this.boundaries = boundaries;
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

  valueOf(year: string, regionCode: string): number {
    let value = NaN;
    if (year in this.data && regionCode in this.data[year]) {
      value = this.data[year][regionCode];
    }
    return value;
  }
}
