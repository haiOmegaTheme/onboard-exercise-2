import { Node } from '@/types/treeSelect';
import { Box, Checkbox, Icon, InlineStack } from '@shopify/polaris';
import { ChevronDownIcon, ChevronRightIcon } from '@shopify/polaris-icons';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  node: Node;
  selectedIds?: string[];
  onSelectLocation?: (checked: boolean, node: Node) => void;
  demo: boolean | 'indeterminate';
};

export const Folder = ({ node, selectedIds, onSelectLocation, demo }: Props) => {
  const [open, setOpen] = useState(false);

  const generateCheckedValue = useCallback(
    (node: Node): boolean | 'indeterminate' => {
      // Check if the node has no children

      if ((selectedIds ?? []).includes(node.id)) {
        return true;
      }

      // if (!node.nodes || node.nodes.length === 0) {
      //   // Return true if nodeId exists in selectedIds, otherwise return false
      //   return (selectedIds ?? []).includes(node.id);
      // }

      // If the node has children, recursively evaluate their state
      let allSelected = true;
      let anySelected = false;

      for (const child of node?.nodes ?? []) {
        const childValue = generateCheckedValue(child);
        if (childValue === true) {
          anySelected = true;
        } else if (childValue === false) {
          allSelected = false;
        } else if (childValue === 'indeterminate') {
          anySelected = true;
          allSelected = false;
        }
      }

      // Return 'indeterminate' if at least one child is selected but not all
      if (anySelected && !allSelected) {
        return 'indeterminate';
      }

      if (allSelected && anySelected) {
        return true;
      }
      // Return true if all children are selected, otherwise return false
      return false;
    },
    [selectedIds]
  );

  const demoValue = useMemo(() => {
    if (demo === true) {
      return demo;
    }
    return generateCheckedValue(node);
  }, [demo, generateCheckedValue, node]);

  return (
    <>
      <InlineStack align="start" blockAlign="center">
        <div
          onClick={() => setOpen((prev) => !prev)}
          role="none"
          style={{
            cursor: 'pointer'
          }}>
          <Box width="20px">
            {node?.nodes?.length ? <Icon source={open ? ChevronDownIcon : ChevronRightIcon} tone="base" /> : null}
          </Box>
        </div>
        <Checkbox
          label={node.label + ' --- ' + node.id}
          checked={demoValue}
          onChange={(checked) => onSelectLocation?.(checked, node)}
        />
      </InlineStack>
      {open ? (
        <Box paddingInlineStart="400">
          {node.nodes?.length
            ? node.nodes.map((item) => (
                <Folder
                  node={item}
                  key={item.id}
                  onSelectLocation={onSelectLocation}
                  selectedIds={selectedIds}
                  demo={demoValue}
                />
              ))
            : null}
        </Box>
      ) : null}
    </>
  );
};
