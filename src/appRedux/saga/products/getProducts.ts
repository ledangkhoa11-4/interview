import apiService from "services/apiService";
import { call, put, takeLatest } from "redux-saga/effects";
import apiRoutes from "configs/apiRoutes";
import { setProducts } from "appRedux/reducers/products";
import { GET_PRODUCTS_REQUEST } from "appRedux/reducers/products/actionTypes";

function* getProductsRequest() {
  try {
    //skeleton
    yield put(
      setProducts({
        isLoading: true,
        data: [],
      })
    );

    const products = yield call(apiService.GET, apiRoutes.products.default);
    yield put(
      setProducts({
        isLoading: false,
        data: products ?? [],
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* getProducts() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsRequest);
}

export default getProducts;
