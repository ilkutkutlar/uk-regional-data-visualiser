import type { Formatter, GeoJSONMap } from "./constants";
import type { ColourMap } from "./colour_map";
import _ from "lodash";

type DatasetMetadata = {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceLink: string;
  boundaries: string;
};

export class Dataset {
  metadata: DatasetMetadata;
  geoJSONMap: GeoJSONMap;
  colourMap: ColourMap;
  dataPath: string;
  valueFormatter: Formatter;
  data: { [index: string]: { [index: string]: any } } = {};

  get years() {
    return Object.keys(this.data);
  }

  get isDataDownloaded() {
    return !_.isEmpty(this.data);
  }

  constructor(
    metadata: DatasetMetadata,
    geoJSONMap: GeoJSONMap,
    colourMap: ColourMap,
    valueFormatter: Formatter,
    dataPath: string
  ) {
    this.metadata = metadata;
    this.geoJSONMap = geoJSONMap;
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

  prettyNameOf(regionCode: string) {
    return this.geoJSONMap.prettyNames.get(regionCode);
  }

  countyOf(regionCode: string) {
    const county = this.geoJSONMap.countyLookup.get(regionCode);
    return county ? county[1] : undefined;
  }
}
