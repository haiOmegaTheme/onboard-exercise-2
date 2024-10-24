import {
  Box,
  IndexTable,
  InlineStack,
  SkeletonDisplayText,
} from "@shopify/polaris";

export const TableRowSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <IndexTable.Row
          key={item}
          id={`${item}`}
          selected={false}
          position={index}
        >
          <IndexTable.Cell>
            <SkeletonDisplayText size="small" />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack align="center">
              <Box width="100%">
                <SkeletonDisplayText size="small" />
              </Box>
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Box width="100%">
              <SkeletonDisplayText size="small" maxWidth="100%" />
            </Box>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Box width="100%">
              <SkeletonDisplayText size="small" maxWidth="100%" />
            </Box>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Box width="100%">
              <SkeletonDisplayText size="small" maxWidth="100%" />
            </Box>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Box width="100%">
              <SkeletonDisplayText size="small" maxWidth="100%" />
            </Box>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Box width="100%">
              <SkeletonDisplayText size="small" maxWidth="100%" />
            </Box>
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </>
  );
};
