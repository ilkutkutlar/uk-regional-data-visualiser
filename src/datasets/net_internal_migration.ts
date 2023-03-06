import { Colours, ValueFormatters } from "../constants";
import { LocalAuthoritiesSvgMap } from "../svg_maps/local_authorities";
import { ColourMap } from "../colour_map";
import { Dataset } from "../dataset";

const metadata = {
  id: "net_internal_migration",
  name: "Net Internal Migration",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra lectus at ex convallis, eu semper purus maximus. In a mauris euismod, rhoncus ante a, varius velit.",
  source: "Office for National Statistics (ONS)",
  sourceLink:
    "https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022",
  boundaries: "Local Authority Boundaries",
};

const colourMap = new ColourMap([
  { range: [-15000, -5000], colour: Colours.RED },
  { range: [-5000, -2500], colour: Colours.ORANGE },
  { range: [-2500, 0], colour: Colours.YELLOW },
  { range: [0, 2500], colour: Colours.GREEN },
  { range: [2500, 5000], colour: Colours.BLUE },
]);

export const netInternalMigration = new Dataset(
  metadata,
  LocalAuthoritiesSvgMap,
  colourMap,
  ValueFormatters.NONE,
  "./data/dataset/net_internal_migration.json"
);
