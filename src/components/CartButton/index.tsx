import { memo, useMemo } from "react";
import classes from "./styles.module.scss";
import { Badge, IconButton } from "@mui/material";
import { CartIcon } from "assets";
import { useAppSelector } from "appRedux/hook";

interface CartButtonProps {}

const CartButton: React.FC<CartButtonProps> = memo((props: CartButtonProps) => {
  const cart = useAppSelector(state => state.cart);

  const cartBadge = useMemo(() => cart.data?.length > 9 ? "9+" : cart.data?.length , [cart])

  return (
    <div className={classes.container}>
      <IconButton>
        <Badge badgeContent={cartBadge} color="primary">
          <CartIcon />
        </Badge>
      </IconButton>
    </div>
  );
});

export default CartButton;
