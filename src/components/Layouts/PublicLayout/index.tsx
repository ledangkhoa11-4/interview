import Header from "components/Header";
import classes from "./styles.module.scss";
import Footer from "components/Footer";
import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "appRedux/hook";
import { getProductsRequest } from "appRedux/reducers/products/actionTypes";
import { getCategoriesRequest } from "appRedux/reducers/categories/actionTypes";
import { setCartReducer } from "appRedux/reducers/cart";
import cartService from "services/cartService";

interface PublicLayoutProps {}

const PublicLayout: React.FC<PublicLayoutProps> = memo((props: PublicLayoutProps) => {
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

  return (
    <div className={classes.publicLayout}>
      <Header />
      <div className={classes.container}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
});

export default PublicLayout;
