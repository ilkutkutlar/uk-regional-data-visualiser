import { Colours, ValueFormatters } from '../constants'
import { LocalAuthoritiesSvgMap } from '../svg_maps/local_authorities'
import { ColourMap } from '../colour_map'
import { Dataset } from '../dataset'

const metadata = {
  id: 'hpi_local',
  name: 'House prices',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra lectus at ex convallis, eu semper purus maximus. In a mauris euismod, rhoncus ante a, varius velit.',
  source: 'Office for National Statistics (ONS)',
  sourceLink: 'https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022'
}
const colourMap = new ColourMap([
  { range: [0, 100000], colour: Colours.LIGHT_BLUE },
  { range: [100000, 200000], colour: Colours.BLUE },
  { range: [200000, 300000], colour: Colours.GREEN },
  { range: [300000, 400000], colour: Colours.YELLOW },
  { range: [400000, 600000], colour: Colours.ORANGE },
  { range: [600000, NaN], colour: Colours.RED }
])
const stylingOptions = {
  valueFormatter: ValueFormatters.CURRENCY_GBP
}

export const hpi = new Dataset(
  metadata,
  LocalAuthoritiesSvgMap,
  colourMap,
  stylingOptions,
  './data/dataset/hpi.json'
)
