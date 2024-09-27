export type LayoutProps = {
  children: React.ReactNode;
};

export type IRoute = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout?: React.LazyExoticComponent<
    ({ children }: LayoutProps) => JSX.Element
  >;
};

export type PaginationType = {
  page: number;
  total: number;
  limit: number;
};

export type DataItem = {
  id: string;
  order: string;
  date: string;
  customer: string;
  total: string;
  paymentStatus: JSX.Element;
  fulfillmentStatus: JSX.Element;
};
