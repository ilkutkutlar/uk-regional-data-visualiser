import { population } from "./datasets/population";

type DataObject = { [index: string]: number };
type DatasetData = { [index: string]: DataObject };

export class PerCapitaConverter {
  async convert(data: DatasetData) {
    await population.downloadData();

    const perCapita: DatasetData = {};
    Object.keys(data).forEach((year) => {
      if (population.data[year] === undefined) return;
      perCapita[year] = this._perCapitaForYear(
        data[year],
        population.data[year]
      );
    });
    return perCapita;
  }
  _perCapitaForYear(values: DataObject, population: DataObject) {
    const perCapita: DataObject = {};
    Object.keys(values).forEach((regionId) => {
      perCapita[regionId] = values[regionId] / population[regionId];
    });
    return perCapita;
  }
}
