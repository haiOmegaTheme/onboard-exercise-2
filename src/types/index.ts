import { ReactNode, LazyExoticComponent } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export type IRoute = {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  layout?: LazyExoticComponent<({ children }: LayoutProps) => JSX.Element>;
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
  paymentStatus: ReactNode;
  fulfillmentStatus: ReactNode;
};

enum FeatureEnum {
  pixel = "PIXEL",
  analytics = "ANALYTICS",
  catalog = "CATALOG",
  pricing = "PRICING",
  home = "HOME",
}

export type Data = {
  id: number;
  shop: string;
  rating: number;
  feedback: string | null;
  created_at: Date;
  updated_at: Date;
  useful: number;
  // =================================
  feature_type: FeatureEnum;
  question_title: string;
  // answer: string;
};

export type OrderItem = {
  id: string;
  order: ReactNode;
  date: string;
  customer: string;
  total: string;
  paymentStatus: JSX.Element;
  fulfillmentStatus: JSX.Element;
};

// =============================================

export enum SortDirectionEnum {
  ascending = "ASC",
  descending = "DESC",
}

type SortBy = {
  item?: string;
  type?: SortDirectionEnum;
  direction?: SortDirectionEnum;
};

// =============================================
export type Filters = {
  search?: string;
  totalSales?: {
    min?: string;
    max?: string;
  };
  source?: string;
  sortBy?: SortBy;
};

export enum ColumnTypeEnum {
  name = "NAME",
  viewContent = "VIEW_CONTENT",
  addToCart = "ADD_TO_CART",
  initiateCheckout = "INITIATE_CHECKOUT",
  purchases = "PURCHASES",
  totalSales = "TOTAL_SALES",
}
