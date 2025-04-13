type ColourMapObject = Array<{
  range: [number, number];
  colour: string;
}>;

/**
 * Class representing a colour map.
 * A colour map is a mapping of a range of values to a colour.
 */
export class ColourMap {
  colourMap: ColourMapObject;

  /**
   * Create a colour map.
   * @param colourMap - The range of values and colours to create a colour map
   * from. The lower bounds are inclusive and upper bounds are exclusive. Use
   * NaN for open ended upper bounds (e.g. where range is for all values bigger
   * than 35,000).
   */
  constructor(colourMap: ColourMapObject) {
    this.colourMap = colourMap;
  }

  /**
   * Map a value to a colour using the colour map.
   * @param value - The value to map to a colour.
   * @returns The colour corresponding to the value.
   */
  mapValueToColour(value: number) {
    for (const mapping of this.colourMap) {
      const [lower, upper] = mapping.range;
      /* The isNan case handles open ended upper bounds,
       * e.g. for a value 35,000+. The open ended
       * upper bound is denoted by NaN. */
      if (value >= lower && (value < upper || isNaN(upper))) {
        return mapping.colour;
      }
    }
    return null;
  }
}
