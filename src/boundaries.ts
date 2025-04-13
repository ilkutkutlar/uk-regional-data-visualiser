type BoundariesGeoJSONFile = {
  filePath: string;
  sourceUrl: string;
  idProperty: string;
};

/**
 * Class representing the a set of geographical boundaries for a set of regions
 * and information about how to format the names of the regions. A Boundaries
 * object may represent multiple editions of the same boundaries, e.g. one
 * for each year where the definition of boundaries might have changed from one
 * year to another.
 */
export class Boundaries {
  boundariesFiles: Map<string, BoundariesGeoJSONFile>;
  prettyNames: Map<string, string>;
  countyLookup: Map<string, [string, string]>;

  /**
   * Create a Boundaries object.
   * @param boundariesFiles - A map of boundaries edition name (e.g. year) to GeoJSON file path.
   * @param prettyNames - A lookup table of region codes to pretty names.
   * @param countyLookup - A lookup table of region codes to county names.
   */
  constructor(
    boundariesFiles: Map<string, BoundariesGeoJSONFile>,
    prettyNames: Map<string, string>,
    countyLookup: Map<string, [string, string]>,
  ) {
    this.boundariesFiles = boundariesFiles;
    this.prettyNames = prettyNames;
    this.countyLookup = countyLookup;
  }

  /**
   * Get the file path to the GeoJSON file for a given year.
   * @throws Will throw an error if the year is not found in the boundaries files.
   */
  getGeoJSONFilePathForYear(year: string): string {
    const maybeFilePath = this.boundariesFiles.get(year)?.filePath;
    if (!maybeFilePath) {
      throw new Error(
        `No file path found for the GeoJSON file for year ${year}`,
      );
    }
    return maybeFilePath;
  }

  /**
   * Get the source URL for the GeoJSON file for a given year.
   * @throws Will throw an error if the year is not found in the boundaries files.
   */
  getGeoJSONSourceUrlForYear(year: string): string {
    const maybeSourceUrl = this.boundariesFiles.get(year)?.sourceUrl;
    if (!maybeSourceUrl) {
      throw new Error(
        `No source URL found for the GeoJSON file for year ${year}`,
      );
    }
    return maybeSourceUrl;
  }

  /**
   * Get the ID property for the GeoJSON file for a given year. This is the property
   * of each feature in the GeoJSON file that contain the code for the region the
   * feature depicts.
   * @throws Will throw an error if the year is not found in the boundaries files.
   */
  getIdPropertyForYear(year: string): string {
    const maybeIdProperty = this.boundariesFiles.get(year)?.idProperty;
    if (!maybeIdProperty) {
      throw new Error(
        `No ID property found for the GeoJSON file for year ${year}`,
      );
    }
    return maybeIdProperty;
  }

  /**
   * Get the pretty name for a given region code.
   * @returns The pretty name for the region code, or undefined if not found.
   */
  prettyNameOf(regionCode: string): string | undefined {
    return this.prettyNames.get(regionCode);
  }

  /**
   * Get the county name for a given region code.
   * @returns The county name for the region code, or undefined if not found.
   */
  countyOf(regionCode: string): string | undefined {
    const county = this.countyLookup.get(regionCode);
    return county ? county[1] : undefined;
  }
}
