# UK Data Maps

UK Data Maps is an interactive tool for visualising and exploring regional data related to the UK. This project was born out of my interest in exploring the differences between various UK regions.

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

Currently, all datasets come from ONS. Each dataset file contains the links to the source, but for quick reference they are given here:

- [Median earnings](https://www.ons.gov.uk/datasets/ashe-tables-7-and-8)
- [House prices](https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022)
- [Life expectancy (Female)](https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/lifeexpectancyforlocalareasoftheuk/between2001to2003and2018to2020)
- [Life expectancy (Male)](https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/lifeexpectancyforlocalareasoftheuk/between2001to2003and2018to2020)
- [Net Internal Migration](https://www.gov.uk/government/statistical-data-sets/uk-house-price-index-data-downloads-january-2022)
- [Population](https://www.ons.gov.uk/datasets/mid-year-pop-est/editions/mid-2020-april-2021-geography/versions/1)
- [Number of Pubs and Bars](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/publichousesandbarsbylocalauthority)

The boundary files for visualising regional data also come from ONS:

- Local Authority District boundaries:
  - [December 2016 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2016-boundaries-uk-buc/about)
  - 2017
  - [December 2018 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2018-boundaries-uk-buc-1/about)
  - [December 2019 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2019-boundaries-uk-buc-1/about)
  - [December 2020 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2020-boundaries-uk-buc/about)
  - [December 2021 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2021-boundaries-uk-buc-2/about)
  - [December 2022 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2022-boundaries-uk-buc-2/about)
  - [December 2023 BUC](https://geoportal.statistics.gov.uk/datasets/ons::local-authority-districts-december-2023-boundaries-uk-buc-2/about)

The files should be downloaded as a zipped Shapefile. Some processing is necessary which can be done using the `scripts/shp_file_to_geojson.sh` file to convert it to a GeoJSON file and simplify it to reduce file size using Mapshaper.
