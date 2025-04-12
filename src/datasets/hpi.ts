import { Colours, ValueFormatters } from "../constants";
import { ColourMap } from "../colour_map";
import { Dataset } from "../dataset";
import { LocalAuthoritiesGeoJSON } from "../svg_maps/local_authorities";

export const hpi = new Dataset(
  {
    id: "hpi_local",
    name: "House prices",
    description:
      "House Price Index (HPI) data showing the average price of a house for each local authority district.",
    source: "Office for National Statistics (ONS)",
    sourceLink:
      "https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022",
    boundaries: "Local Authority Districts",
  },
  LocalAuthoritiesGeoJSON,
  new ColourMap([
    { range: [0, 100000], colour: Colours.LIGHT_BLUE },
    { range: [100000, 200000], colour: Colours.BLUE },
    { range: [200000, 300000], colour: Colours.GREEN },
    { range: [300000, 400000], colour: Colours.YELLOW },
    { range: [400000, 600000], colour: Colours.ORANGE },
    { range: [600000, NaN], colour: Colours.RED },
  ]),
  ValueFormatters.CURRENCY_GBP,
  "./data/dataset/hpi.json",
);
