import { memo } from "react";
import classes from "./styles.module.scss";
import { Badge, IconButton } from "@mui/material";
import { CartIcon } from "assets";

interface CartButtonProps {}

const CartButton: React.FC<CartButtonProps> = memo((props: CartButtonProps) => {
  return (
    <div className={classes.container}>
      <IconButton>
        <Badge badgeContent={9} color="primary">
          <CartIcon />
        </Badge>
      </IconButton>
    </div>
  );
});

export default CartButton;
