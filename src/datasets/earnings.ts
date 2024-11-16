import { Colours, ValueFormatters } from "../constants";
import { LocalAuthoritiesGeoJSON } from "../svg_maps/local_authorities";
import { ColourMap } from "../colour_map";
import { Dataset } from "../dataset";

const metadata = {
  id: "median_earnings_local",
  name: "Median earnings",
  description:
    "Median annual gross income for residents of each region. The figures include both part-time and full-time workers.",
  source: "Office for National Statistics (ONS)",
  sourceLink: "https://www.ons.gov.uk/datasets/ashe-tables-7-and-8",
  boundaries: "Local Authority Districts",
};

const colourMap = new ColourMap([
  { range: [10000, 15000], colour: Colours.RED },
  { range: [15000, 20000], colour: Colours.ORANGE },
  { range: [20000, 25000], colour: Colours.YELLOW },
  { range: [25000, 30000], colour: Colours.GREEN },
  { range: [30000, 35000], colour: Colours.BLUE },
  { range: [35000, NaN], colour: Colours.PURPLE },
]);

export const earnings = new Dataset(
  metadata,
  LocalAuthoritiesGeoJSON,
  colourMap,
  ValueFormatters.CURRENCY_GBP,
  "./data/dataset/earnings.json"
);
