import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "interfaces/cart";

export interface ICartState {
  data: ICartItem[];
}

const initialState: ICartState = {
  data: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCartReducer(state: ICartState, action: PayloadAction<ICartItem>) {
      const productIndex = state.data?.findIndex((cart) => cart.product.id === action.payload.product.id);
      if (productIndex >= 0) {
        state.data[productIndex].quantity += action.payload.quantity;
      } else {
        state.data.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.data));
    },
    setCartReducer(state: ICartState, action: PayloadAction<ICartItem[]>) {
      state.data = action.payload;
    },
  },
});

export const { setCartReducer, addProductToCartReducer } = cartSlice.actions;

export default cartSlice.reducer;
