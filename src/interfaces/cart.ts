import { IProduct } from "./products";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
