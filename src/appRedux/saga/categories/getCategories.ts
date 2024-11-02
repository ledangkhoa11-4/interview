import apiService from "services/apiService";
import { call, put, takeLatest } from "redux-saga/effects";
import apiRoutes from "configs/apiRoutes";
import { setCategoriesReducer } from "appRedux/reducers/categories";
import { ICategory } from "interfaces/categories";
import { GET_CATEGORIES_REQUEST } from "appRedux/reducers/categories/actionTypes";

function* getCategoriesRequest() {
  try {
    //skeleton
    yield put(
      setCategoriesReducer({
        isLoading: true,
        data: [],
      })
    );

    const categoryArray = yield call(apiService.GET, apiRoutes.products.categories);
    const categories: ICategory[] = categoryArray?.length ? categoryArray?.map((category: string) => ({ title: category })) : [];
    yield put(
      setCategoriesReducer({
        isLoading: false,
        data: categories ?? [],
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* getCategories() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesRequest);
}

export default getCategories;
