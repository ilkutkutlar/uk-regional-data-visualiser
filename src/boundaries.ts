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
