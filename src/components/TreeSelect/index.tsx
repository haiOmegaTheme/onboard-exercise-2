import { useClickOutSide } from "@/hooks";
import { Folder } from "@/pages/demo/components/Folder";
import {
  BlockStack,
  Card,
  Icon,
  Scrollable,
  TextField,
} from "@shopify/polaris";
import { useMemo, useRef, useState } from "react";
import { SearchIcon } from "@shopify/polaris-icons";
import "./style.scss";
import { Node } from "@/types/treeSelect";

type Props = {
  search: string;
  onSearch: (search: string) => void;
  nodes?: Node[];
  locations?: string[];
  onSelectLocation?: (node: Node[]) => void;
};

export const TreeSelect = ({
  search,
  onSearch,
  nodes,
  locations,
  onSelectLocation,
}: Props) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutSide(inputRef, () => setActive(false));

  const isShowNode = useMemo(() => {
    return !search;
  }, [search]);
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
        onClearButtonClick={() => onSearch("")}
        onFocus={() => setActive(() => true)}
      />
      <div
        className={`tree-select__dropdown${
          active ? " tree-select__dropdown--visible" : ""
        }`}
      >
        <Card padding="200">
          <Scrollable
            style={{
              height: 266,
            }}
          >
            {isShowNode && nodes?.length ? (
              nodes.map((item) => <Folder node={item} key={item.id} />)
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div>There are no items</div>
              </div>
            )}
            {!isShowNode && (
              <BlockStack>
                {locations?.length
                  ? locations.map((item) => <div key={item}>{item}</div>)
                  : null}
              </BlockStack>
            )}
          </Scrollable>
        </Card>
      </div>
    </div>
  );
};
