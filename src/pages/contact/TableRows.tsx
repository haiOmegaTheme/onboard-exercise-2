import { OrderItem } from "@/types";
import { IndexTable, Text } from "@shopify/polaris";

type Props = {
  dataSource: OrderItem[];
  selectedResources: string[];
};

export const TableRows = ({ dataSource, selectedResources }: Props) => {
  return (
    <>
      {dataSource.map(
        (
          {
            id,
            order,
            date,
            customer,
            total,
            paymentStatus,
            fulfillmentStatus,
          },
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
      )}
    </>
  );
};
