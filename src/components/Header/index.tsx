import { memo } from "react";
import classes from "./styles.module.scss";
import { Container, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import appRoutes from "routers/routes";
import { DefaultLogo } from "assets";
import CartButton from "components/CartButton";
import useRouteMatch from "hooks/useRouteMatch";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = memo((props: HeaderProps) => {
  const { isExact: isCartPage } = useRouteMatch(appRoutes.public.cart);

  return (
    <div className={classes.header}>
      <Container className={classes.container} maxWidth={false}>
        <div className={classes.leftSide}>
          <Link to={appRoutes.public.home} aria-label="KVY Technology">
            <DefaultLogo className={classes.logo} />
          </Link>
          {isCartPage ? (
            <>
              <Divider orientation="vertical" flexItem />
              <p>Cart</p>
            </>
          ) : null}
        </div>

        {!isCartPage ? <CartButton /> : null}
      </Container>
    </div>
  );
});

export default Header;
