import { IndexTable, InlineStack } from "@shopify/polaris";
import { memo } from "react";

export const TableRows = memo(function TableRows({
  list,
  selectedResources,
}: {
  list: any;
  selectedResources: any;
}) {
  return (
    <>
      {list.map((item: any, index: any) => (
        <IndexTable.Row
          id={item?.id}
          key={item?.id}
          selected={selectedResources?.includes?.(item?.id)}
          position={index}
          onClick={() => {}}
        >
          <IndexTable.Cell>{item?.name}</IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="center">{item?.source}</InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="end">{item?.viewContent}</InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="end">{item?.addToCart}</InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="end">{item?.initiateCheckout}</InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="end">{item?.purchases}</InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="end">{item?.totalSales}</InlineStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </>
  );
});

TableRows.displayName = "TableRows";
