import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "interfaces/products";

export interface IProductState {
  isLoading: boolean;
  data: IProduct[];
  meta: {
    page: number;
    limit: number;
    hasMore: boolean;
  }
}

const initialState: IProductState = {
  isLoading: false,
  data: null,
  meta: {
    page: 1,
    limit: 9,
    hasMore: null
  }
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state: IProductState, action: PayloadAction<IProductState>) {
      state.isLoading = action.payload.isLoading;
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;