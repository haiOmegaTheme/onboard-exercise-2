import {
  AdReportTableTabEnum,
  ColumnTypeEnum,
  OrderItem,
  SortDirectionEnum,
  SourceTypeEnum,
  TapTypeEnum,
} from "@/types";
import {
  Badge,
  Box,
  Icon,
  IndexFiltersProps,
  InlineStack,
  TabProps,
  Text,
} from "@shopify/polaris";
import { ArrowDownIcon, ArrowUpIcon } from "@shopify/polaris-icons";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";

export function disambiguateLabel(
  key: string,
  value: string | string[]
): string {
  switch (key) {
    case "moneySpent":
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case "taggedWith":
      return `Tagged with ${value}`;
    case "accountStatus":
      return (value as string[]).map((val) => `Customer ${val}`).join(", ");
    default:
      return value as string;
  }
}

export function isEmpty(value?: string): boolean {
  if (Array.isArray(value)) {
    return value?.length === 0;
  }
  return value === "" || value === null || value === undefined;
}
// export const orders= MOCK_DATA_TEST

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const COLUMNS_TYPE_OPTIONS = [
  { value: ColumnTypeEnum.name, label: "Name" },
  { value: ColumnTypeEnum.viewContent, label: "View Content" },
  { value: ColumnTypeEnum.addToCart, label: "Add to Cart" },
  { value: ColumnTypeEnum.initiateCheckout, label: "Initiate Checkout" },
  { value: ColumnTypeEnum.purchases, label: "Purchases" },
  { value: ColumnTypeEnum.totalSales, label: "Total Sales" },
];

export const SORT_BY_NUMBER_OPTIONS = [
  {
    label: (
      <InlineStack>
        <Box>
          <Icon source={ArrowDownIcon} tone="base" />
        </Box>
        <Text as="span">Highest to Lowest</Text>
      </InlineStack>
    ),
    value: SortDirectionEnum.descending,
  },
  {
    label: (
      <InlineStack>
        <Box>
          <Icon source={ArrowUpIcon} tone="base" />
        </Box>
        <Text as="span">Highest to Lowest</Text>
      </InlineStack>
    ),
    value: SortDirectionEnum.ascending,
  },
];

export const SORT_BY_NAME_OPTIONS = [
  {
    label: (
      <InlineStack>
        <Box>
          <Icon source={ArrowDownIcon} tone="base" />
        </Box>
        <Text as="span">A to Z</Text>
      </InlineStack>
    ),
    value: SortDirectionEnum.descending,
  },
  {
    label: (
      <InlineStack>
        <Box>
          <Icon source={ArrowUpIcon} tone="base" />
        </Box>
        <Text as="span">Z to A</Text>
      </InlineStack>
    ),
    value: SortDirectionEnum.ascending,
  },
];

export const FILTER_SOURCE_OPTIONS = [
  {
    label: "TikTok",
    value: SourceTypeEnum.tikTok,
  },
];

export const HEADER: NonEmptyArray<IndexTableHeading> = [
  { title: "Name", alignment: "start" },
  { title: "Source", alignment: "center" },
  { title: "View Content", alignment: "end" },
  { title: "Add to Cart", alignment: "end" },
  { title: "Initiate Checkout", alignment: "end" },
  { title: "Purchases", alignment: "end" },
  { title: "Total sales", alignment: "end" },
];

export enum FilterKeyEnum {
  totalSales = "TOTAL_SALES",
  source = "SOURCE",
  sortBy = "SORT_BY",
}

export const FILTER_LABELS = {
  totalSales: "Total sales",
  sortBy: "Sort by",
  source: "Source",
};

export const MAPPING_SORT_BY_LABEL: Record<string, string> = {
  [ColumnTypeEnum.name]: "Name",
  [ColumnTypeEnum.viewContent]: "View Content",
  [ColumnTypeEnum.addToCart]: "Add to Cart",
  [ColumnTypeEnum.initiateCheckout]: "Initiate Checkout",
  [ColumnTypeEnum.purchases]: "Purchases",
  [ColumnTypeEnum.totalSales]: "Total sales",
};

export const ALPHABETICAL_ORDER_LABELS: Record<string, string> = {
  [SortDirectionEnum.descending]: " Z to A",
  [SortDirectionEnum.ascending]: " A to Z",
};

export const SUPERLATIVE_LABELS: Record<string, string> = {
  [SortDirectionEnum.descending]: " Highest to lowest",
  [SortDirectionEnum.ascending]: " Lowest to highest",
};

export const MAPPING_SOURCE = {
  [SourceTypeEnum.tikTok]: "TikTok",
};

export const AD_REPORT_TABLE_TABS: TabProps[] = [
  {
    id: "1",
    content: "Campaign",
  },
  {
    id: "2",
    content: "Ad group",
  },
  {
    id: "3",
    content: "Ad",
  },
];

export const AD_REPORT_SORT_OPTIONS: IndexFiltersProps["sortOptions"] = [
  {
    label: "Name",
    value: `${ColumnTypeEnum.name} ${SortDirectionEnum.ascending}`,
    directionLabel: "A to Z",
  },
  {
    label: "Name",
    value: `${ColumnTypeEnum.name} ${SortDirectionEnum.descending}`,
    directionLabel: "Z to A",
  },
  {
    label: "View Content",
    value: `${ColumnTypeEnum.viewContent} ${SortDirectionEnum.ascending}`,
    directionLabel: "Lowest to highest",
  },
  {
    label: "View Content",
    value: `${ColumnTypeEnum.viewContent} ${SortDirectionEnum.descending}`,
    directionLabel: "Highest to lowest",
  },
  {
    label: "Add to Cart",
    value: `${ColumnTypeEnum.addToCart} ${SortDirectionEnum.ascending}`,
    directionLabel: "Lowest to highest",
  },
  {
    label: "Add to Cart",
    value: `${ColumnTypeEnum.addToCart} ${SortDirectionEnum.descending}`,
    directionLabel: "Highest to lowest",
  },
  {
    label: "Initiate Checkout",
    value: `${ColumnTypeEnum.initiateCheckout} ${SortDirectionEnum.ascending}`,
    directionLabel: "Lowest to highest",
  },
  {
    label: "Initiate Checkout",
    value: `${ColumnTypeEnum.initiateCheckout} ${SortDirectionEnum.descending}`,
    directionLabel: "Highest to lowest",
  },
  {
    label: "Purchases",
    value: `${ColumnTypeEnum.purchases} ${SortDirectionEnum.ascending}`,
    directionLabel: "Lowest to highest",
  },
  {
    label: "Purchases",
    value: `${ColumnTypeEnum.purchases} ${SortDirectionEnum.descending}`,
    directionLabel: "Highest to lowest",
  },
  {
    label: "Total sales",
    value: `${ColumnTypeEnum.totalSales} ${SortDirectionEnum.ascending}`,
    directionLabel: "Lowest to highest",
  },
  {
    label: "Total sales",
    value: `${ColumnTypeEnum.totalSales} ${SortDirectionEnum.descending}`,
    directionLabel: "Highest to lowest",
  },
];

export const INITIAL_TABS_OPTIONS: TabProps[] = [
  {
    id: "Campaign",
    content: "Campaign",
  },
  {
    id: "Ad group",
    content: "Ad group",
  },
  {
    id: "Ad",
    content: "Ad",
  },
];

export const MAPPING_SELECTED_TAB_TO_TAB_TYPE: Record<number, TapTypeEnum> = {
  [AdReportTableTabEnum.first]: TapTypeEnum.campaign,
  [AdReportTableTabEnum.second]: TapTypeEnum.adGroup,
  [AdReportTableTabEnum.third]: TapTypeEnum.ad,
};

export const MAPPING_TAB_TYPE_TO_SELECTED_TAB: Record<string, number> = {
  [TapTypeEnum.campaign]: 0,
  [TapTypeEnum.adGroup]: 1,
  [TapTypeEnum.ad]: 2,
};

export const orders = [
  {
    id: "1",
    name: "Campaign name",
    source: "TikTok",
    viewContent: 100,
    addToCart: 100,
    initiateCheckout: 100,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "2",
    name: "Campaign name",
    source: "TikTok",
    viewContent: 200,
    addToCart: 200,
    initiateCheckout: 200,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "3",
    name: "Undetected",
    source: null,
    viewContent: null,
    addToCart: 400,
    initiateCheckout: 400,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "4",
    name: "Tulipan ArCampaign namechair",
    source: "TikTok",
    viewContent: 500,
    addToCart: 500,
    initiateCheckout: 500,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "5",
    name: "Undetected",
    source: null,
    viewContent: null,
    addToCart: 600,
    initiateCheckout: 600,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "6",
    name: "Ethan Wall Clock",
    source: "TikTok",
    viewContent: 800,
    addToCart: 800,
    initiateCheckout: 800,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "7",
    name: "Vibe Retro Coffee Table",
    source: "TikTok",
    viewContent: 900,
    addToCart: 900,
    initiateCheckout: 900,
    purchases: 100,
    totalSales: 100.02,
  },
  {
    id: "8",
    name: "Cascade Center Table",
    source: "TikTok",
    viewContent: 1000,
    addToCart: 1000,
    initiateCheckout: 1000,
    purchases: 100,
    totalSales: 100.02,
  },
];
