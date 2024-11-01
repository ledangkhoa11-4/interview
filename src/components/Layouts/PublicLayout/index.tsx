import Header from "components/Header";
import classes from "./styles.module.scss";
import Footer from "components/Footer";
import { memo, useEffect } from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "appRedux/hook";
import { getProductsRequest } from "appRedux/reducers/products/actionTypes";
import { getCategoriesRequest } from "appRedux/reducers/categories/actionTypes";

interface PublicLayoutProps {}

const PublicLayout: React.FC<PublicLayoutProps> = memo((props: PublicLayoutProps) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!products.isLoading && !products.data) {
      dispatch(getProductsRequest());
    }
  }, [products]);

  useEffect(() => {
    if (!categories.isLoading && !categories.data) {
      dispatch(getCategoriesRequest());
    }
  }, [categories]);

  return (
    <div className={classes.publicLayout}>
      <Header />

      <Container className={classes.container}>
        <Outlet />
      </Container>

      <Footer />
    </div>
  );
});

export default PublicLayout;
