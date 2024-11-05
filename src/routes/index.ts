import { lazy } from "react";
import { appRoutes } from "./path-constant";
import { IRoute } from "@/types";

const MainLayout = lazy(() => import("@/layout/main-layout"));

const HomePage = lazy(() => import("@/pages/home"));
const DemoPage = lazy(() => import("@/pages/demo"));
const LocalePage = lazy(() => import("@/pages/locale"));

const routeList: IRoute[] = [
  {
    path: appRoutes.home,
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: "/demo",
    component: DemoPage,
    layout: MainLayout,
  },
  {
    path: "/locale",
    component: LocalePage,
    layout: MainLayout,
  },
];

export default routeList;
