import { Colours, ValueFormatters } from "@/constants";
import { ColourMap } from "@/colour_map";
import { LocalAuthoritiesGeoJSON } from "../boundaries/local_authorities";
import { RegionalDataset } from "@/dataset";

export const hpi = new RegionalDataset(
  {
    id: "hpi_local",
    name: "House prices",
    description:
      "House Price Index (HPI) data showing the average price of a house for each local authority district.",
    source: "Office for National Statistics (ONS)",
    sourceLink:
      "https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022",
    licenceType: "open_government_licence_v3_hm_land_registry",
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
