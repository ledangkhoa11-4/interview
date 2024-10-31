import { combineReducers } from '@reduxjs/toolkit';
import products from './products'

export const rootReducer = combineReducers({
  products,
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
