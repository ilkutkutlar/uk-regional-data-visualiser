type BoundariesGeoJSONFile = {
  filePath: string;
  sourceUrl: string;
  idProperty: string;
};

export class Boundaries {
  boundariesFiles: Map<string, BoundariesGeoJSONFile>;
  prettyNames: Map<string, string>;
  countyLookup: Map<string, [string, string]>;

  constructor(
    boundariesFiles: Map<string, BoundariesGeoJSONFile>,
    prettyNames: Map<string, string>,
    countyLookup: Map<string, [string, string]>,
  ) {
    this.boundariesFiles = boundariesFiles;
    this.prettyNames = prettyNames;
    this.countyLookup = countyLookup;
  }

  getGeoJSONFilePathForYear(year: string): string {
    const maybeFilePath = this.boundariesFiles.get(year)?.filePath;
    if (!maybeFilePath) {
      throw new Error(
        `No file path found for the GeoJSON file for year ${year}`,
      );
    }
    return maybeFilePath;
  }

  getGeoJSONSourceUrlForYear(year: string): string {
    const maybeSourceUrl = this.boundariesFiles.get(year)?.sourceUrl;
    if (!maybeSourceUrl) {
      throw new Error(
        `No source URL found for the GeoJSON file for year ${year}`,
      );
    }
    return maybeSourceUrl;
  }

  getIdPropertyForYear(year: string): string {
    const maybeIdProperty = this.boundariesFiles.get(year)?.idProperty;
    if (!maybeIdProperty) {
      throw new Error(
        `No ID property found for the GeoJSON file for year ${year}`,
      );
    }
    return maybeIdProperty;
  }

  prettyNameOf(regionCode: string) {
    return this.prettyNames.get(regionCode);
  }

  countyOf(regionCode: string) {
    const county = this.countyLookup.get(regionCode);
    return county ? county[1] : undefined;
  }
}
