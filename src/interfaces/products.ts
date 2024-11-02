import { ESortType } from "configs/enums";
import { ISelectOption } from "./common";

export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

export interface IProductFilters {
  sortBy?: ISelectOption;
  categories?: ISelectOption[];
  prices?: number[];
  rating?: number;
}