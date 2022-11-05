type ColourMapObject = {range: [number, number], colour: string}[]

export class ColourMap {
  colourMap: ColourMapObject

  constructor (colourMap: ColourMapObject) {
    this.colourMap = colourMap
  }

  mapValueToColour (value: number) {
    for (const mapping of this.colourMap) {
      const [lower, upper] = mapping.range
      /* This case handles open ended upper bounds,
      * e.g. for a value 35,000+. The open ended
      * upper bound is denoted by NaN. */
      if (isNaN(upper)) {
        if (value >= lower) return mapping.colour
      } else if ((value >= lower) && (value < upper)) {
        return mapping.colour
      }
    }
    return null
  }
}
