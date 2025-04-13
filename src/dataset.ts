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
   * @returns The years for which the dataset has data.
   */
  get years(): string[] {
    return Object.keys(this.data);
  }

  /**
   * Check whether the dataset represented by this object has been downloaded.
   * @returns True if the dataset has been downloaded, false otherwise.
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
   * Fetch the dataset data and stores it in the dataset instance.
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
   * @param year - The year for which the value should be visualised.
   * @param regionCode - The region code for which the value should be visualised.
   * @returns The colour used for visualising the value or null if the colour map does not
   * prescribe a colour for the value.
   */
  colourOf(year: string, regionCode: string): string | null {
    const value = this.data[year][regionCode];
    return this.colourMap.mapValueToColour(value);
  }

  /**
   * Get the data from the dataset for a given region for a given year.
   * @param year - The year for which the data should be returned.
   * @param regionCode - The region code for which the data should be returned.
   * @returns The data from the dataset for the given region and year.
   */
  valueOf(year: string, regionCode: string): number {
    let value = NaN;
    if (year in this.data && regionCode in this.data[year]) {
      value = this.data[year][regionCode];
    }
    return value;
  }
}
