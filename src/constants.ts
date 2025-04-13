export type Formatter = (value: number) => string;

export const ValueFormatters: { [index: string]: Formatter } = {
  NONE: (value: number) => {
    return isNaN(value) ? "No data" : value.toLocaleString();
  },
  CURRENCY_GBP: (value: number) => {
    return isNaN(value) ? "No data" : `£${value.toLocaleString()}`;
  },
  LARGE_NUMBER: (value: number) => {
    return isNaN(value) ? "No data" : `${value.toLocaleString()}`;
  },
};

export const enum Colours {
  PURPLE = "#9B4994",
  LIGHT_BLUE = "#9BC5C9",
  BLUE = "#636BD8",
  GREEN = "#60BF40",
  YELLOW = "#BFBF40",
  ORANGE = "#D37B2E",
  RED = "#BF4040",
  GREY = "#BFBFBF",
}
