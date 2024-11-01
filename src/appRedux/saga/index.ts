import { all } from "redux-saga/effects";
import { productSaga } from "./products";
import { categorySaga } from "./categories";

export const rootSaga = function* root() {
  yield all([productSaga(), categorySaga()]);
};
