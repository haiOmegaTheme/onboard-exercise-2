import { LazyExoticComponent } from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

export type IRoute = {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  layout?: React.LazyExoticComponent<
    ({ children }: LayoutProps) => JSX.Element
  >;
};
