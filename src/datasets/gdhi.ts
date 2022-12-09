import { Colours, ValueFormatters } from "../constants";
import { ITL3SvgMap } from "../svg_maps/itl3";
import { ColourMap } from "../colour_map";
import { Dataset } from "../dataset";

const metadata = {
  id: "gdhi_itl3",
  name: "Household income (disposable)",
  description: "Gross disposable household income (GDHI) for each region.",
  source: "Office for National Statistics (ONS)",
  sourceLink:
    "https://www.ons.gov.uk/economy/regionalaccounts/grossdisposablehouseholdincome/datasets/regionalgrossdisposablehouseholdincomegdhi",
};
const colourMap = new ColourMap([
  { range: [10000, 15000], colour: Colours.RED },
  { range: [15000, 20000], colour: Colours.ORANGE },
  { range: [20000, 25000], colour: Colours.YELLOW },
  { range: [25000, 30000], colour: Colours.GREEN },
  { range: [30000, 35000], colour: Colours.BLUE },
  { range: [35000, NaN], colour: Colours.PURPLE },
]);

export const gdhi = new Dataset(
  metadata,
  ITL3SvgMap,
  colourMap,
  ValueFormatters.CURRENCY_GBP,
  "./data/dataset/gdhi.json"
);
