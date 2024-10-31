import Header from 'components/Header';
import classes from './styles.module.scss';
import Footer from 'components/Footer';
import { memo, useEffect } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'appRedux/hook';
import { getProductsRequest } from 'appRedux/reducers/products/actionTypes';

interface PublicLayoutProps {}

const PublicLayout: React.FC<PublicLayoutProps> = memo((props: PublicLayoutProps) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!products.isLoading && !products.data) {
      dispatch(getProductsRequest());
    }
  }, [products]);

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