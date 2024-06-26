import { lazy } from "react";
import { appRoutes } from "./path-constant";
import { IRoute } from "@/types";

const MainLayout = lazy(() => import("@/layout/main-layout"));

const HomePage = lazy(() => import("@/pages/home"));

const routeList: IRoute[] = [
  {
    path: appRoutes.home,
    component: HomePage,
    layout: MainLayout,
  },
];

export default routeList;
