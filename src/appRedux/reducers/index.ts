import { combineReducers } from '@reduxjs/toolkit';
import products from './products'
import categories from './categories'
import cart from './cart'

export const rootReducer = combineReducers({
  products,
  categories,
  cart
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
