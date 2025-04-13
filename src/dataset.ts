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

/* Class representing a dataset and configurations
   about how its values should be formatted and displayed */
export class Dataset {
  metadata: DatasetMetadata;
  boundaries: Boundaries;
  colourMap: ColourMap;
  dataPath: string;
  valueFormatter: Formatter;
  data: { [index: string]: { [index: string]: number } } = {};

  /**
   * Get the years for which the dataset has data.
   */
  get years(): string[] {
    return Object.keys(this.data);
  }

  /**
   * Check whether the dataset represented by this class
   * has been downloaded to this instance.
   */
  get isDataDownloaded(): boolean {
    return !_.isEmpty(this.data);
  }

  /**
   * @param metadata - Metadata about the dataset.
   * @param boundaries - Boundaries for which the dataset is given.
   * @param colourMap - Colour map used to format values in the dataset when visualising.
   * @param valueFormatter - Formatter used for displaying the dataset values.
   * @param dataPath - File path to the dataset data.
   */
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

  /**
   * Fetch the dataset data and store it in the dataset instance.
   * @returns promise that resolves when the data is downloaded.
   * If data has already been downloaded, returns a promise that
   * resolves immediately.
   */
  downloadData(): Promise<void> {
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

  /**
   * Get the colour that should be used when visualising the value for a given region for a given year.
   * @returns The colour used for visualising the value for the given year and
   * region or null if the colour map does not prescribe a colour for the value.
   */
  colourOf(year: string, regionCode: string): string | null {
    const value = this.data[year][regionCode];
    return this.colourMap.mapValueToColour(value);
  }

  /**
   * Get the data from the dataset for a given region for a given year.
   */
  valueOf(year: string, regionCode: string): number {
    let value = NaN;
    if (year in this.data && regionCode in this.data[year]) {
      value = this.data[year][regionCode];
    }
    return value;
  }
}
