import { all } from 'redux-saga/effects';
import getCategories from './getCategories';

export const categorySaga = function* root() {
  yield all([getCategories()]);
};
