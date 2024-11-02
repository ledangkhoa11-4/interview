import { IProductState } from ".";

export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";

export const getProductsRequest = (payload: IProductState) => {
  return { type: GET_PRODUCTS_REQUEST, payload };
};
