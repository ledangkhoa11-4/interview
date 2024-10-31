import { all } from 'redux-saga/effects';
import getProducts from './getProducts';

export const productSaga = function* root() {
  yield all([getProducts()]);
};
