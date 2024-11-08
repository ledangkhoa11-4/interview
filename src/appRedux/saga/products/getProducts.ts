import apiService from "services/apiService";
import { call, put, takeLatest } from "redux-saga/effects";
import apiRoutes from "configs/apiRoutes";
import { IProductState, setProducts } from "appRedux/reducers/products";
import { GET_PRODUCTS_REQUEST } from "appRedux/reducers/products/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "interfaces/products";
import { ESortType } from "configs/enums";
import { MOCK_PRICE_RANGE } from "components/DataControl";

function sortProducts(products: IProduct[], type: ESortType): IProduct[] {
  return products.slice().sort((a, b) => {
    switch (type) {
      case ESortType.NAME_ASC:
        return a.title.localeCompare(b.title);
      case ESortType.NAME_DESC:
        return b.title.localeCompare(a.title);
      case ESortType.RATING_DESC:
        return b.rating.rate - a.rating.rate;
      case ESortType.PRICE_ASC:
        return a.price - b.price;
      case ESortType.PRICE_DESC:
        return b.price - a.price;
      default:
        return 0; // If no valid criteria is provided, return unsorted
    }
  });
}

function* getProductsRequest(action: PayloadAction<IProductState>) {
  try {
    //skeleton
    yield put(
      setProducts({
        ...action.payload,
        ...(action.payload.isSortingOrFiltering ? { data: [] } : {}),
        isLoading: true,
      })
    );

    const name = action.payload.sortFilterCriteria.name;
    const categories = action.payload.sortFilterCriteria.categories;
    const prices = action.payload.sortFilterCriteria.prices;
    const rating = action.payload.sortFilterCriteria.rating;
    const fetchAll =
      action.payload.sortFilterCriteria.sortBy !== null ||
      !!categories?.length ||
      (prices?.length && (prices?.[0] !== MOCK_PRICE_RANGE.min || prices?.[1] !== MOCK_PRICE_RANGE.max)) ||
      !!rating ||
      !!name; // Fetch all products to sort

    const meta = { ...action.payload.meta };
    let take = meta.limit * meta.page;
    let products = yield call(apiService.GET, `${apiRoutes.products.default}${!fetchAll ? `?limit=${take}` : ""}`);
    if (fetchAll) take = products.length;

    // Stimulate sorting and filtering
    if (name) {
      products = products.filter(
        (product) => product.title.toLowerCase().includes(name.toLowerCase()) || product.description.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (action.payload.sortFilterCriteria.sortBy) {
      products = sortProducts(products, action.payload.sortFilterCriteria.sortBy.value as ESortType);
    }
    if (categories?.length) {
      products = products.filter((product) => categories.some((category) => category.value === product.category));
    }
    if (prices) {
      products = products.filter((product) => product.price >= prices[0] && product.price <= prices[1]);
    }
    if (rating) {
      products = products.filter((product) => Math.round(product.rating.rate * 2) / 2 >= rating);
    }

    const productsResult = products.slice(0, take);
 
    if (fetchAll && take >= products.length) {
      meta.hasMore = false;
    } else {
      meta.hasMore = products.length !== action.payload.data?.length;
    }
    yield put(
      setProducts({
        isLoading: false,
        isSortingOrFiltering: false,
        data: productsResult ?? [],
        meta: meta,
        sortFilterCriteria: action.payload.sortFilterCriteria,
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
