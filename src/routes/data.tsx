import { lazy } from "react";
const User = lazy(() => import("pages/admin"));
const Category = lazy(() => import("pages/category"));
const Custumer = lazy(() => import("pages/custumer"));
const Contract = lazy(() => import("pages/contract"));
const Product = lazy(() => import("pages/product"));
const Default = lazy(() => import("pages/default"));
const NotFound = lazy(() => import("pages/notFound"));

export interface IRoute {
  path: string;
  key?: string | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    key: "welcome",
    title: "",
    element: <Default />,
  },
  {
    path: "/profile",
    key: "profile",
    title: "Profile",
    element: <User />,
  },
  {
    path: "/categories",
    key: "categories",
    title: "Kategoriyalar",
    element: <Category />,
  },
  {
    path: "/customers",
    key: "customers",
    title: "Mijozlar",
    element: <Custumer />,
  },
  {
    path: "/contracts",
    key: "contracts",
    title: "Contracts",
    element: <Contract />,
  },
  {
    path: "/products",
    key: "products",
    title: "Products",
    element: <Product />,
  },
  {
    path: "*",
    key: "*",
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
