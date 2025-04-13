# UK Regional Data Visualiser

![Project logo with name](./logo_with_name.svg)

UK Regional Data Visualiser is an interactive tool for visualising and exploring regional data related to the UK. This project was born out of my interest in exploring the differences between various UK regions.

## Development

This project is a web app developed with the [VueJS](https://vuejs.org/) framework. [Vite](https://vite.dev/) is used for bundling and providing a development server. [ESLint](https://eslint.org/) is used for linting, and [Prettier](https://prettier.io/) for auto formatting. [Vitest](https://vitest.dev/) is used as a test runner for component tests and [Cypress](https://www.cypress.io/) for end-to-end tests.

To get set up and start developing, first install the dependencies:

```shell
npm install
```

To run the tests:

```shell
# Component tests
npm run test:component

# End-to-end tests
npm run test:e2e
```

To run various linting and formatting tools:

```shell
npm run lint          # Run ESLint
npm run lint:fix      # Run ESLint and fix errors which are auto-fixable
npm run lint:type     # Check that TypeScript types are correct
npm run format:check  # Run Prettier to check files for formatting rule violations
npm run format:fix    # Run Prettier to fix formatting rule violations
```

To start the dev server:

```shell
npm run dev
```

## Datasets

The data used in this project all come from UK's Office for National Statistics (ONS) datasets which have been cleaned and processed to fit this project's purposes.

Attribution for all ONS datasets excluding house prices:

> Contains public sector information licensed under the [Open Government Licence v3.0](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

Attribution for the ONS house prices dataset:

> Contains HM Land Registry data © Crown copyright and database right 2020. This data is licensed under the [Open Government Licence v3.0](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

Links to the original datasets used are given here for reference:

- [Median earnings](https://www.ons.gov.uk/datasets/ashe-tables-7-and-8)
- [Life expectancy (Female)](https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/lifeexpectancyforlocalareasoftheuk/between2001to2003and2018to2020)
- [Life expectancy (Male)](https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/lifeexpectancyforlocalareasoftheuk/between2001to2003and2018to2020)
- [Net Internal Migration](https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022)
- [Population](https://www.ons.gov.uk/datasets/mid-year-pop-est/editions/mid-2020-april-2021-geography/versions/1)
- [Number of Pubs and Bars](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/publichousesandbarsbylocalauthority)
- [House prices](https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022)

The boundary files for visualising regional data also come from ONS. The original geographical data has been processed to fit the purposes of this project. Attribution for the original regional data:

> Source: Office for National Statistics licensed under the [Open Government Licence v.3.0](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).
>
> Contains OS data © Crown copyright and database right 2025

Links to the original boundary files from the ONS are given here for reference (2017 is missing from the ONS website, so is omitted from here):

- [December 2016 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2016-boundaries-uk-buc/about)
- [December 2018 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2018-boundaries-uk-buc-1/about)
- [December 2019 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2019-boundaries-uk-buc-1/about)
- [December 2020 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2020-boundaries-uk-buc/about)
- [December 2021 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2021-boundaries-uk-buc-2/about)
- [December 2022 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2022-boundaries-uk-buc-2/about)
- [December 2023 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2023-boundaries-uk-buc-2/about)

The files should be downloaded as a zipped Shapefile. Some processing is necessary which can be done using the `scripts/shp_file_to_geojson.sh` file to convert it to a GeoJSON file and simplify it to reduce file size using Mapshaper.

## Licence

MIT License

Copyright (c) 2025 Ilkut Kutlar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
