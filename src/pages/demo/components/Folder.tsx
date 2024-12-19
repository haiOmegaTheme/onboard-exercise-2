import { Node } from "@/types/treeSelect";
import { Box, Checkbox, Icon, InlineStack } from "@shopify/polaris";
import { ChevronDownIcon, ChevronRightIcon } from "@shopify/polaris-icons";
import { useState } from "react";

type Props = {
  node: Node;
};

export const Folder = ({ node }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <InlineStack align="start" blockAlign="center">
        <div
          onClick={() => setOpen((prev) => !prev)}
          role="none"
          style={{
            cursor: "pointer",
          }}
        >
          <Box width="20px">
            {node?.nodes?.length ? (
              <Icon
                source={open ? ChevronDownIcon : ChevronRightIcon}
                tone="base"
              />
            ) : null}
          </Box>
        </div>
        <Checkbox label={node.label + " --- " + node.id} checked />
      </InlineStack>
      {open ? (
        <Box paddingInlineStart="400">
          {node.nodes?.length
            ? node.nodes.map((item) => <Folder node={item} key={item.id} />)
            : null}
        </Box>
      ) : null}
    </>
  );
};
