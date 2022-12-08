import type { Dataset } from "./dataset";

type DataObject = { [index: string]: number };
type DatasetData = { [index: string]: DataObject };

export class PerCapitaConverter {
  populationData: DatasetData = {};

  downloadPopulation() {
    const dataEmpty = Object.keys(this.populationData).length == 0;
    if (dataEmpty) {
      return new Promise<void>((resolve) => {
        fetch("./data/dataset/population.json", { method: "get" })
          .then((resp) => resp.json())
          .then((data) => {
            this.populationData = data;
            resolve();
          });
      });
    }
  }

  convert(data: DatasetData) {
    return new Promise<DatasetData>((resolve) => {
      this.downloadPopulation();
    })
    const perCapita: DatasetData = {};
    Object.keys(data).forEach((year) => {
      if (this.populationData[year] === undefined) return;
      perCapita[year] = this._perCapitaForYear(
        data[year],
        this.populationData[year]
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
