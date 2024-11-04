import React, { Suspense, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routeObject from "routers";
import { getProductsRequest } from "appRedux/reducers/products/actionTypes";
import { useAppDispatch, useAppSelector } from "appRedux/hook";
import { getCategoriesRequest } from "appRedux/reducers/categories/actionTypes";
import { setCartReducer } from "appRedux/reducers/cart";
import cartService from "services/cartService";
interface AppProps {}

const App: React.FC<AppProps> = (props: AppProps) => {
  const routes = useRoutes(routeObject);

  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!products.isLoading && !products.data) {
      dispatch(getProductsRequest(products));
    }
  }, [products]);

  useEffect(() => {
    if (!categories.isLoading && !categories.data) {
      dispatch(getCategoriesRequest());
    }
  }, [categories]);

  useEffect(() => {
    if (!cart.data) {
      dispatch(setCartReducer(cartService.getCart()));
    }
  }, [cart]);

  return <Suspense>{routes}</Suspense>;
};

export default App;
