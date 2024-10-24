import { ColumnTypeEnum, OrderItem, SortDirectionEnum } from "@/types";
import { Badge, Box, Icon, InlineStack, Text } from "@shopify/polaris";
import { ArrowDownIcon, ArrowUpIcon } from "@shopify/polaris-icons";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import {
  NonEmptyArray,
  OptionDescriptor,
} from "@shopify/polaris/build/ts/src/types";

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
export const orders: OrderItem[] = [
  {
    id: "1020",
    order: "#1020",
    date: "Jul 20 at 4:34pm",
    customer: "Jaydon Stanton",
    total: "$969.44",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1019",
    order: "#1019",
    date: "Jul 20 at 3:46pm",
    customer: "Ruben Westerfelt",
    total: "$701.19",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1018",
    order: "#1018",
    date: "Jul 20 at 3.44pm",
    customer: "Leo Carder",
    total: "$798.24",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
];

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
    value: "TIK_TOK",
  },
];

export const HEADER: NonEmptyArray<IndexTableHeading> = [
  { title: "Order" },
  { title: "Date" },
  { title: "Customer" },
  { title: "Total", alignment: "end" },
  { title: "Payment status" },
  { title: "Fulfillment status" },
];
