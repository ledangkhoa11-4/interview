import { combineReducers } from '@reduxjs/toolkit';
import products from './products'
import categories from './categories'

export const rootReducer = combineReducers({
  products,
  categories,
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
