import { AppPagination } from "@/components/Pagination";
import {
  Badge,
  Card,
  IndexTable,
  Text,
  useBreakpoints,
  useIndexResourceState,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { useEffect, useState, memo } from "react";
import { MOCK_ORDERS } from "./helper";
import { DataItem } from "@/types";
import { paginate } from "./demo";

type PaginationState = {
  page: number;
  limit: number;
  total: number;
};

const Demo = memo(AppPagination);

function TestPage() {
  const orders = [
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
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 5,
    total: MOCK_ORDERS?.length ?? 0,
  });

  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const demo = paginate(MOCK_ORDERS, pagination);

    setData(demo.data);
  }, [pagination]);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(MOCK_ORDERS);

  useEffect(() => {
    console.log("demo>>>", selectedResources);
  }, [selectedResources]);

  const rowMarkup = data.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const promotedBulkActions = [
    {
      content: "Create shipping labels",
      onAction: () => console.log("Todo: implement create shipping labels"),
    },
    {
      content: "Mark as fulfilled",
      onAction: () => console.log("Todo: implement mark as fulfilled"),
    },
    {
      content: "Capture payment",
      onAction: () => console.log("Todo: implement capture payment"),
    },
  ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-4/5">
        <Card>
          <IndexTable
            condensed={useBreakpoints().smDown}
            resourceName={resourceName}
            itemCount={MOCK_ORDERS.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            paginatedSelectAllText="asdasdflaskdjflaksdjflasjdlfjalsd"
            onSelectionChange={handleSelectionChange}
            hasMoreItems
            bulkActions={bulkActions}
            promotedBulkActions={promotedBulkActions}
            headings={[
              { title: "Order" },
              { title: "Date" },
              { title: "Customer" },
              { title: "Total", alignment: "end" },
              { title: "Payment status" },
              { title: "Fulfillment status" },
            ]}
          >
            {rowMarkup}
          </IndexTable>

          <Demo pagination={pagination} onChangePage={setPagination} />
        </Card>
      </div>
    </div>
  );
}

export default TestPage;
