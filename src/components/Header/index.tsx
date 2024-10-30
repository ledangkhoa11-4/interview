import { memo } from "react";
import classes from "./styles.module.scss";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import appRoutes from "routers/routes";
import { DefaultLogo } from "assets";
import CartButton from "components/CartButton";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = memo((props: HeaderProps) => {
  return (
    <div className={classes.header}>
      <Container className={classes.container} maxWidth={false}>
        <Link to={appRoutes.public.home}>
          <DefaultLogo />
        </Link>
        
        <CartButton/>
      </Container>
    </div>
  );
});

export default Header;
