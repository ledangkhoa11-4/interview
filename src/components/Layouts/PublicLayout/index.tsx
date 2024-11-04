import Header from "components/Header";
import classes from "./styles.module.scss";
import Footer from "components/Footer";
import { memo } from "react";
import { Outlet } from "react-router-dom";

interface PublicLayoutProps {}

const PublicLayout: React.FC<PublicLayoutProps> = memo((props: PublicLayoutProps) => {
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
