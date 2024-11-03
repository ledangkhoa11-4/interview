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
        state.data.unshift(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    changeQuantityProductCartReducer(state: ICartState, action: PayloadAction<ICartItem>) {
      const productIndex = state.data?.findIndex((cart) => cart.product.id === action.payload.product.id);
      if (productIndex >= 0) {
        state.data[productIndex].quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.data));
      }
    },
    removeProductFromCartReducer(state: ICartState, action: PayloadAction<number>) {
      const cart = Array.from(state.data);
      const productIndex = cart?.findIndex((cart) => cart.product.id === action.payload);
      if (productIndex >= 0) {
        cart.splice(productIndex, 1);
        state.data = cart;
        localStorage.setItem("cart", JSON.stringify(state.data));
      }
    },
    setCartReducer(state: ICartState, action: PayloadAction<ICartItem[]>) {
      state.data = action.payload;
    },
  },
});

export const { setCartReducer, addProductToCartReducer, changeQuantityProductCartReducer, removeProductFromCartReducer } = cartSlice.actions;

export default cartSlice.reducer;
