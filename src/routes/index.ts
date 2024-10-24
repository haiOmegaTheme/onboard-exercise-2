import { lazy } from "react";
import { appRoutes } from "./path-constant";
import { IRoute } from "@/types";

const MainLayout = lazy(() => import("@/layout/main-layout"));

const HomePage = lazy(() => import("@/pages/home"));
const DemoPage = lazy(() => import("@/pages/demo"));
const TestPage = lazy(() => import("@/pages/test"));
const ContactPage = lazy(() => import("@/pages/contact"));

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
    path: "/test",
    component: TestPage,
  },
  {
    path: "/contact",
    component: ContactPage,
    layout: MainLayout,
  },
];

export default routeList;
