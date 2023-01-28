type ColourMapObject = Array<{
  range: [number, number];
  colour: string;
}>;

export class ColourMap {
  colourMap: ColourMapObject;

  constructor(colourMap: ColourMapObject) {
    this.colourMap = colourMap;
  }

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
