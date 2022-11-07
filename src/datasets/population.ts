import { Colours, ValueFormatters } from "../constants";
import { LocalAuthoritiesSvgMap } from "../svg_maps/local_authorities";
import { ColourMap } from "../colour_map";
import { Dataset } from "../dataset";

const metadata = {
  id: "population_local",
  name: "Population",
  description:
    "Estimated resident population of each region. The estimates are produced on the 30th of June for every year.",
  source: "Office for National Statistics (ONS)",
  sourceLink:
    "https://www.ons.gov.uk/datasets/mid-year-pop-est/editions/mid-2020-april-2021-geography/versions/1",
};
const colourMap = new ColourMap([
  { range: [0, 100000], colour: Colours.GREEN },
  { range: [100000, 250000], colour: Colours.YELLOW },
  { range: [250000, 500000], colour: Colours.ORANGE },
  { range: [500000, 2000000], colour: Colours.RED },
]);
const stylingOptions = {
  valueFormatter: ValueFormatters.LARGE_NUMBER,
};

export const population = new Dataset(
  metadata,
  LocalAuthoritiesSvgMap,
  colourMap,
  stylingOptions,
  "./data/dataset/population.json"
);
