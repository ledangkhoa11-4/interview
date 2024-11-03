import { RouteObject } from "react-router-dom";
import PublicLayout from "components/Layouts/PublicLayout";
import HomePage from "pages/Home";
import appRoutes from "./routes";
import CartPage from "pages/Cart";

const routeObject: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: appRoutes.public.home,
        element: <HomePage />
      },
      {
        path: appRoutes.public.cart,
        element: <CartPage />
      }
    ]
  }
]

export default routeObject;