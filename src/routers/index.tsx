import { RouteObject } from "react-router-dom";
import PublicLayout from "components/Layouts/PublicLayout";
import HomePage from "pages/Home";
import appRoutes from "./routes";

const routeObject: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: appRoutes.public.home,
        element: <HomePage />
      }
    ]
  }
]

export default routeObject;