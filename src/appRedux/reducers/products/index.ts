import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MOCK_PRICE_RANGE } from "components/DataControl";
import { IProduct, IProductFilters } from "interfaces/products";

export interface IProductState {
  isLoading: boolean;
  isSortingOrFiltering: boolean;
  data: IProduct[];
  meta: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
  sortFilterCriteria: IProductFilters;
}

const initialState: IProductState = {
  isLoading: false,
  isSortingOrFiltering: false,
  data: null,
  meta: {
    page: 1,
    limit: 9,
    hasMore: null,
  },
  sortFilterCriteria: {
    name: "",
    sortBy: null,
    categories: [],
    prices: [MOCK_PRICE_RANGE.min, MOCK_PRICE_RANGE.max],
    rating: 0,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state: IProductState, action: PayloadAction<IProductState>) {
      state.isLoading = action.payload.isLoading;
      state.isSortingOrFiltering = action.payload.isSortingOrFiltering;
      state.data = action.payload.data;
      state.meta = action.payload.meta;
      state.sortFilterCriteria = action.payload.sortFilterCriteria;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
