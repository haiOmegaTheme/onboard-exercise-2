import { isValidArray } from '@/helper/validator';
import { Node } from '@/types/treeSelect';
import { Box, Checkbox, Icon, InlineStack } from '@shopify/polaris';
import { ChevronDownIcon, ChevronRightIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

type Props = {
  node: Node;
  selectedIds?: string[];
  onSelectLocation?: (checked: boolean, node: Node) => void;
};

export const Folder = ({ node, selectedIds, onSelectLocation }: Props) => {
  const [open, setOpen] = useState(false);

  const generateCheckedValue = useCallback(
    (node: Node): boolean | 'indeterminate' => {
      if (!isValidArray(selectedIds)) return false;

      const nodeItems = node?.nodes;

      if (!Array.isArray(nodeItems) || !nodeItems.length) return (selectedIds ?? [])?.includes(node.id);

      const allNodesChecked = nodeItems.every((item) => generateCheckedValue(item) === true);
      const someNodesChecked = nodeItems.some((item) => generateCheckedValue(item) !== false);

      if (allNodesChecked) return true;
      if (someNodesChecked) return 'indeterminate';
      return false;
    },
    [selectedIds]
  );

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
          checked={generateCheckedValue(node)}
          onChange={(checked) => onSelectLocation?.(checked, node)}
        />
      </InlineStack>
      {open ? (
        <Box paddingInlineStart="400">
          {node.nodes?.length
            ? node.nodes.map((item) => (
                <Folder node={item} key={item.id} onSelectLocation={onSelectLocation} selectedIds={selectedIds} />
              ))
            : null}
        </Box>
      ) : null}
    </>
  );
};
