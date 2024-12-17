import { Node } from "@/types";
import { Box, Checkbox, Icon, InlineStack } from "@shopify/polaris";
import { ChevronDownIcon, ChevronRightIcon } from "@shopify/polaris-icons";
import { useState } from "react";

type Props = {
  folder: Node;
};

export const Folder = ({ folder }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <InlineStack>
        <div
          onClick={() => setOpen((prev) => !prev)}
          role="none"
          style={{
            cursor: "pointer",
          }}
        >
          <Box>
            <Icon
              source={open ? ChevronDownIcon : ChevronRightIcon}
              tone="base"
            />
          </Box>
        </div>
        <Checkbox label={folder.name} checked={folder.checked} />
      </InlineStack>
      {open && (
        <Box paddingInlineStart="400">
          {folder.nodes?.length &&
            folder.nodes.map((item) => (
              <Folder folder={item} key={folder.name} />
            ))}
        </Box>
      )}{" "}
    </>
  );
};
