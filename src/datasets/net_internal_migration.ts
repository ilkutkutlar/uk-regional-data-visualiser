import { Colours, ValueFormatters } from "@/constants";
import { ColourMap } from "@/colour_map";
import { LocalAuthoritiesGeoJSON } from "@/boundaries/local_authorities";
import { RegionalDataset } from "@/dataset";

export const netInternalMigration = new RegionalDataset(
  {
    id: "net_internal_migration",
    name: "Net Internal Migration",
    description:
      "Net internal migration (external migration - internal migration) into each local authority district across all ages and sexes.",
    source: "Office for National Statistics (ONS)",
    sourceLink:
      "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/migrationwithintheuk/datasets/internalmigrationlaandregionmovesandbysexandsingleyearofagetotals",
    licenceType: "open_government_licence_v3",
  },
  LocalAuthoritiesGeoJSON,
  new ColourMap([
    { range: [-15000, -5000], colour: Colours.RED },
    { range: [-5000, -2500], colour: Colours.ORANGE },
    { range: [-2500, 0], colour: Colours.YELLOW },
    { range: [0, 2500], colour: Colours.GREEN },
    { range: [2500, 5000], colour: Colours.BLUE },
  ]),
  ValueFormatters.NONE,
  "./data/dataset/net_internal_migration.json",
);
