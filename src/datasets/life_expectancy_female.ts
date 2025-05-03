import { Colours, ValueFormatters } from "@/constants";
import { ColourMap } from "@/colour_map";
import { Dataset } from "@/dataset";
import { LocalAuthoritiesGeoJSON } from "@/boundaries/local_authorities";

export const lifeExpectancyFemale = new Dataset(
  {
    id: "life_expectancy_female",
    name: "Life expectancy (Female)",
    description: "Life expectancy at birth for women",
    source: "Office for National Statistics (ONS)",
    sourceLink:
      "https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/lifeexpectancyforlocalareasoftheuk/between2001to2003and2018to2020",
    licenceType: "open_government_licence_v3",
  },
  LocalAuthoritiesGeoJSON,
  new ColourMap([
    { range: [76, 78], colour: Colours.RED },
    { range: [78, 80], colour: Colours.ORANGE },
    { range: [80, 82], colour: Colours.YELLOW },
    { range: [82, 84], colour: Colours.GREEN },
    { range: [84, NaN], colour: Colours.BLUE },
  ]),
  ValueFormatters.NONE,
  "./data/dataset/life_expectancy_female.json",
);
