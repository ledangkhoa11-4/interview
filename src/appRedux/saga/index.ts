import { all } from 'redux-saga/effects';
import { productSaga } from './products';

export const rootSaga = function* root() {
  yield all([productSaga()]);
};
