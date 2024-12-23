import { useClickOutSide } from '@/hooks';
import { Folder } from '@/pages/demo/components/Folder';
import { BaseOptions, Node } from '@/types/treeSelect';
import { BlockStack, Card, Icon, OptionList, Scrollable, TextField } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useCallback, useMemo, useRef, useState } from 'react';
import './style.scss';

type Props = {
  search: string;
  onSearch: (search: string) => void;
  nodes?: Node[];
  onSelectLocation?: (checked: boolean, node: Node, isClearAll?: boolean) => void;
  selectedIds?: string[];
  flattedNodes?: BaseOptions[];
  onScrolledToBottom?: () => void;
};

export const TreeSelect = ({
  search,
  onSearch,
  nodes,
  onSelectLocation,
  selectedIds,
  onScrolledToBottom,
  flattedNodes
}: Props) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutSide(inputRef, () => setActive(false));

  const isShowNode = useMemo(() => {
    return !search;
  }, [search]);

  const handleSelect = useCallback(
    (checked: boolean, node: Node) => {
      onSelectLocation?.(checked, node);
    },
    [onSelectLocation]
  );
  return (
    <div className="tree-select" ref={inputRef}>
      <TextField
        autoComplete="off"
        label=""
        placeholder="Search or choose location"
        value={search}
        onChange={(value) => onSearch(value)}
        prefix={<Icon source={SearchIcon} tone="base" />}
        clearButton
        onClearButtonClick={() => onSearch('')}
        onFocus={() => setActive(() => true)}
      />
      <div className={`tree-select__dropdown${active ? ' tree-select__dropdown--visible' : ''}`}>
        <Card padding="200">
          <Scrollable
            onScrolledToBottom={onScrolledToBottom}
            style={{
              height: 266
            }}>
            {isShowNode &&
              (nodes?.length ? (
                nodes.map((item) => (
                  <Folder node={item} key={item.id} selectedIds={selectedIds} onSelectLocation={handleSelect} />
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div>There are no items</div>
                </div>
              ))}
            {!isShowNode && flattedNodes?.length ? (
              <BlockStack>
                <OptionList
                  selected={selectedIds ?? []}
                  options={flattedNodes}
                  onChange={(value) => {
                    onSelectLocation?.(true, { id: value[0], label: '' }, true);
                  }}
                />
              </BlockStack>
            ) : null}
          </Scrollable>
        </Card>
      </div>
    </div>
  );
};
