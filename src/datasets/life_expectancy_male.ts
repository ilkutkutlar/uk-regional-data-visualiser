import { Colours, ValueFormatters } from "../constants";
import { LocalAuthoritiesSvgMap } from "../svg_maps/local_authorities";
import { ColourMap } from "../colour_map";
import { Dataset } from "../dataset";

const metadata = {
  id: "life_expectancy_male",
  name: "Life expectancy (Male)",
  description: "Life expectancy at birth for men",
  source: "Office for National Statistics (ONS)",
  sourceLink:
    "https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/lifeexpectancyforlocalareasoftheuk/between2001to2003and2018to2020",
  boundaries: "Local Authority Boundaries",
};

const colourMap = new ColourMap([
  { range: [69, 72], colour: Colours.RED },
  { range: [72, 75], colour: Colours.ORANGE },
  { range: [75, 78], colour: Colours.YELLOW },
  { range: [78, 81], colour: Colours.GREEN },
  { range: [81, NaN], colour: Colours.BLUE },
]);

export const lifeExpectancyMale = new Dataset(
  metadata,
  LocalAuthoritiesSvgMap,
  colourMap,
  ValueFormatters.NONE,
  "./data/dataset/life_expectancy_male.json"
);
