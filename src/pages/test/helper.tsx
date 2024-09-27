import { DataItem } from "@/types";
import { Badge } from "@shopify/polaris";

export const MOCK_ORDERS: DataItem[] = [
  {
    id: "1020",
    order: "#1020",
    date: "Jul 20 at 4:34pm",
    customer: "Jadon Stanton",
    total: "$969.44",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1019",
    order: "#1019",
    date: "Jul 20 at 3:46pm",
    customer: "Ruben Wester",
    total: "$701.19",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1018",
    order: "#1018",
    date: "Jul 20 at 3:44pm",
    customer: "Leo Carder",
    total: "$798.24",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1017",
    order: "#1017",
    date: "Jul 20 at 2:15pm",
    customer: "Sage Wagner",
    total: "$632.13",
    paymentStatus: <Badge progress="incomplete">Pending</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1016",
    order: "#1016",
    date: "Jul 20 at 1:30pm",
    customer: "Riley Jensen",
    total: "$499.99",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1015",
    order: "#1015",
    date: "Jul 20 at 12:45pm",
    customer: "Harlow Benton",
    total: "$100.00",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="complete">Fulfilled</Badge>,
  },
  {
    id: "1014",
    order: "#1014",
    date: "Jul 20 at 12:01pm",
    customer: "Niko Barnett",
    total: "$920.50",
    paymentStatus: <Badge progress="incomplete">Pending</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1013",
    order: "#1013",
    date: "Jul 20 at 11:15am",
    customer: "Milan Riddle",
    total: "$832.75",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1012",
    order: "#1012",
    date: "Jul 20 at 10:45am",
    customer: "Eve Potter",
    total: "$750.00",
    paymentStatus: <Badge progress="incomplete">Pending</Badge>,
    fulfillmentStatus: <Badge progress="complete">Fulfilled</Badge>,
  },
  {
    id: "1011",
    order: "#1011",
    date: "Jul 20 at 10:15am",
    customer: "Blake Ritchie",
    total: "$65.99",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "210201",
    order: "#1020",
    date: "Jul 20 at 4:34pm",
    customer: "Jadon Stanton",
    total: "$969.44",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "210191",
    order: "#1019",
    date: "Jul 20 at 3:46pm",
    customer: "Ruben Wester",
    total: "$701.19",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "21018",
    order: "#1018",
    date: "Jul 20 at 3:44pm",
    customer: "Leo Carder",
    total: "$798.24",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "21017",
    order: "#1017",
    date: "Jul 20 at 2:15pm",
    customer: "Sage Wagner",
    total: "$632.13",
    paymentStatus: <Badge progress="incomplete">Pending</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "21016",
    order: "#1016",
    date: "Jul 20 at 1:30pm",
    customer: "Riley Jensen",
    total: "$499.99",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "21015",
    order: "#1015",
    date: "Jul 20 at 12:45pm",
    customer: "Harlow Benton",
    total: "$100.00",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="complete">Fulfilled</Badge>,
  },
  {
    id: "21014",
    order: "#1014",
    date: "Jul 20 at 12:01pm",
    customer: "Niko Barnett",
    total: "$920.50",
    paymentStatus: <Badge progress="incomplete">Pending</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "21013",
    order: "#1013",
    date: "Jul 20 at 11:15am",
    customer: "Milan Riddle",
    total: "$832.75",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "21012",
    order: "#1012",
    date: "Jul 20 at 10:45am",
    customer: "Eve Potter",
    total: "$750.00",
    paymentStatus: <Badge progress="incomplete">Pending</Badge>,
    fulfillmentStatus: <Badge progress="complete">Fulfilled</Badge>,
  },
  {
    id: "21011",
    order: "#1011",
    date: "Jul 20 at 10:15am",
    customer: "Blake Ritchie",
    total: "$65.99",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
];

type PaginationResult = {
  currentPage: number;
  totalPages: number;
  items: {
    start: number;
    end: number;
  };
};

export const paginate = (
  page: number,
  limit: number,
  total: number
): PaginationResult => {
  if (page <= 0) {
    page = 1; // Set default page to 1 if invalid
  }
  if (limit <= 0) {
    limit = 10; // Set default limit to 10 if invalid
  }
  if (total < 0) {
    total = 0; // Set total to 0 if it's negative
  }

  // If total items are 0, return the first page with start and end as 0
  if (total === 0) {
    return {
      currentPage: 1,
      totalPages: 1,
      items: {
        start: 0,
        end: 0,
      },
    };
  }

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  // Ensure the current page is within range
  const currentPage = Math.max(1, Math.min(page, totalPages));

  // Calculate start and end indices
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(start + limit - 1, total);

  return {
    currentPage,
    totalPages,
    items: {
      start,
      end,
    },
  };
};
