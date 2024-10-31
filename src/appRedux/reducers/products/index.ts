import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "interfaces/products";

export interface IProductState {
  isLoading: boolean;
  data: IProduct[];
}

const initialState: IProductState = {
  isLoading: false,
  data: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state: IProductState, action: PayloadAction<IProductState>) {
      state.isLoading = action.payload.isLoading;
      state.data = action.payload.data;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;