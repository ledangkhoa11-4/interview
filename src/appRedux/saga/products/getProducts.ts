import apiService from "services/apiService";
import { call, put, takeLatest } from "redux-saga/effects";
import apiRoutes from "configs/apiRoutes";
import { IProductState, setProducts } from "appRedux/reducers/products";
import { GET_PRODUCTS_REQUEST } from "appRedux/reducers/products/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";

function* getProductsRequest(action: PayloadAction<IProductState>) {
  try {
    //skeleton
    yield put(
      setProducts({
        isLoading: true,
        data: action.payload.data,
        meta: action.payload.meta
      })
    );
    
    const meta = {...action.payload.meta};
    const take = meta.limit * meta.page;
    const products = yield call(apiService.GET, `${apiRoutes.products.default}?limit=${take}`);
    meta.hasMore = products.length !== action.payload.data?.length;

    yield put(
      setProducts({
        isLoading: false,
        data: products ?? [],
        meta: meta
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
