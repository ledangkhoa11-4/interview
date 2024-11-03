import { memo, useMemo } from "react";
import classes from "./styles.module.scss";
import { Badge, IconButton } from "@mui/material";
import { CartIcon } from "assets";
import { useAppSelector } from "appRedux/hook";
import { Link } from "react-router-dom";
import appRoutes from "routers/routes";

interface CartButtonProps {}

const CartButton: React.FC<CartButtonProps> = memo((props: CartButtonProps) => {
  const cart = useAppSelector((state) => state.cart);

  const cartBadge = useMemo(() => (cart.data?.length > 9 ? "9+" : cart.data?.length), [cart]);

  return (
    <div className={classes.container}>
      <Link to={appRoutes.public.cart} aria-label="Cart">
        <IconButton>
          <Badge badgeContent={cartBadge} color="primary">
            <CartIcon />
          </Badge>
        </IconButton>
      </Link>
    </div>
  );
});

export default CartButton;
