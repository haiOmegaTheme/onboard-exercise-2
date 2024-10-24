import { TableItem } from "@/types";
import { IndexTable, InlineStack } from "@shopify/polaris";

type Props = {
  dataSource: TableItem[];
  selectedResources: string[];
};

const TableRows = ({ dataSource, selectedResources }: Props) => {
  return (
    <>
      {dataSource.map((item, index) => (
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
};

export default TableRows;
