import React, { memo, useMemo, useState } from "react";
import classes from "./styles.module.scss";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "appRedux/hook";
import { ClearIcon, MediaThumbnailPlaceholderImage, NoProductFound } from "assets";
import Input from "components/Input";
import currencyService from "services/currencyService";
import { changeQuantityProductCartReducer, removeProductFromCartReducer } from "appRedux/reducers/cart";
import { IProduct } from "interfaces/products";
import { IConfirmModal } from "interfaces/common";
import ConfirmModal from "components/Modals/ConfirmModal";
import appRoutes from "routers/routes";
import { Link } from "react-router-dom";

const MAX_QUANTITY_PRODUCT = 99;

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = memo((props: CartPageProps) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);

  const totalPrice = useMemo(() => (cart.data?.length ? cart.data.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0) : 0), [cart]);
  const totalProduct = useMemo(() => cart.data?.length ?? 0, [cart]);

  const [confirmModal, setConfirmModal] = useState<IConfirmModal>(null);

  const onChangeQuantity = (product: IProduct, quantity: number) => {
    if (quantity > 0 && quantity <= MAX_QUANTITY_PRODUCT) {
      dispatch(
        changeQuantityProductCartReducer({
          product,
          quantity: quantity,
        })
      );
    }
    if (quantity <= 0) {
      setConfirmModal({
        isOpen: true,
        title: "Are you sure you want to remove this product?",
        description: `Product: ${product.title}`,
        onSubmit: () => {
          dispatch(removeProductFromCartReducer(product.id));
          setConfirmModal(null);
        },
      });
    }
  };

  const onCloseConfirmModal = () => {
    setConfirmModal(null);
  };

  return (
    <>
      <div className={classes.container}>
        <TableContainer component={Paper} className={classes.cartTable}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center" width={"45%"}>
                  Product
                </TableCell>
                <TableCell align="center" width={"10%"}>
                  Quantity
                </TableCell>
                <TableCell align="center" width={"20%"}>
                  Price
                </TableCell>
                <TableCell align="center" width={"20%"}>
                  Total
                </TableCell>
                <TableCell align="center" width={"5%"}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalProduct > 0 ? (
                <>
                  {cart.data.map((cartItem) => (
                    <TableRow key={cartItem.product.id}>
                      <TableCell align="center" component="th" scope="row">
                        <div className={classes.product}>
                          <img rel="preload" src={cartItem.product?.image ?? MediaThumbnailPlaceholderImage} alt={cartItem.product?.title} />
                          <div className={classes.productDesc}>
                            <p>{cartItem.product?.title}</p>
                            <span title={cartItem.product?.description}>{cartItem.product?.description}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row" className={classes.quantityInput}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          value={cartItem.quantity}
                          onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault();
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            onChangeQuantity(cartItem.product, Number(e.target.value));
                          }}
                          inputProps={{ min: 0, max: MAX_QUANTITY_PRODUCT }}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" scope="row" className={classes.price}>
                        <p>{currencyService.formatPrice(cartItem.product.price)}</p>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row" className={classes.price}>
                        <p>{currencyService.formatPrice(cartItem.product.price * cartItem.quantity)}</p>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row" className={classes.price}>
                        <IconButton
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Are you sure you want to remove this product?",
                              description: `Product: ${cartItem.product.title}`,
                              onSubmit: () => {
                                dispatch(removeProductFromCartReducer(cartItem.product.id));
                                setConfirmModal(null);
                              },
                            });
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className={classes.noItemFound}>
                      <img rel="preload" src={NoProductFound} style={{ margin: "0 auto" }} alt="No product found" />
                      <Link to={appRoutes.public.home}>Go shopping</Link>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalProduct > 0 ? (
          <Box className={classes.totalPrice}>
            <p>
              Total payment {`(${totalProduct} ${totalProduct > 1 ? "products" : "product"})`}:{" "}
              <strong>{currencyService.formatPrice(totalPrice)}</strong>
            </p>
            <Button variant="contained">Check out</Button>
          </Box>
        ) : null}
      </div>

      <ConfirmModal
        isOpen={confirmModal?.isOpen}
        title={confirmModal?.title}
        description={confirmModal?.description}
        onSubmit={confirmModal?.onSubmit}
        onClose={onCloseConfirmModal}
      />
    </>
  );
});

export default CartPage;