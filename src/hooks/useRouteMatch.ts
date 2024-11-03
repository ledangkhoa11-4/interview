import { useLocation } from "react-router-dom";
import { pathToRegexp } from "path-to-regexp";

const useRouteMatch = (route: string) => {
  const { pathname } = useLocation();

  const pattern = pathToRegexp(route);
  const match = pattern?.regexp?.exec(pathname);

  if (!match) {
    return { params: {}, match: null };
  }

  const params: { [key: string]: string } | any = pattern.keys?.reduce((acc, key, index) => {
    acc[key?.name] = match?.[index + 1];
    return acc;
  }, {});

  return { params, match, isExact: !!match };
};

export default useRouteMatch;
