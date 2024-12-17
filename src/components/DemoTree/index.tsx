import { Checkbox, Icon } from "@shopify/polaris";
import { ChevronDownIcon, ChevronRightIcon } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeSelectProps {
  data: TreeNode[];
  onChange: (selectedIds: string[]) => void;
}

export const TreeSelect: React.FC<TreeSelectProps> = ({ data, onChange }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (node: TreeNode) => {
    const newSelected = { ...selected };
    const selectRecursive = (n: TreeNode, isSelected: boolean) => {
      newSelected[n.id] = isSelected;
      n.children?.forEach((child) => selectRecursive(child, isSelected));
    };
    selectRecursive(node, !selected[node.id]);
    setSelected(newSelected);
    onChange(Object.keys(newSelected).filter((id) => newSelected[id]));
  };

  const isIndeterminate = (node: TreeNode): boolean => {
    if (!node.children) return false;
    const childStates = node.children.map((child) => selected[child.id]);
    return childStates.some(Boolean) && !childStates.every(Boolean);
  };

  useEffect(() => {}, []);

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <div key={node.id} className="ml-4">
        <div className="flex items-center space-x-2">
          {node.children && (
            <button
              onClick={() => toggleExpand(node.id)}
              className="focus:outline-none"
            >
              {expanded[node.id] ? (
                <Icon source={ChevronDownIcon} tone="base" />
              ) : (
                <Icon source={ChevronRightIcon} tone="base" />
              )}
            </button>
          )}
          <Checkbox
            label=""
            id={node.id}
            checked={selected[node.id]}
            onChange={() => toggleSelect(node)}
          />
          <label
            htmlFor={node.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {node.label}
          </label>
        </div>
        {node.children && expanded[node.id] && (
          <div className="ml-4 mt-2">{renderTree(node.children)}</div>
        )}
      </div>
    ));
  };

  const getSelectedDisplay = (nodes: TreeNode[]): string[] => {
    let display: string[] = [];
    nodes.forEach((node) => {
      if (node.children) {
        const childStates = node.children.map((child) => selected[child.id]);
        if (childStates.every(Boolean)) {
          display.push(node.label);
        } else if (childStates.some(Boolean)) {
          display = [...display, ...getSelectedDisplay(node.children)];
        }
      } else if (selected[node.id]) {
        display.push(node.label);
      }
    });
    return display;
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 p-2 border rounded-md bg-gray-50">
        <p className="text-sm font-medium text-gray-700">
          Selected: {getSelectedDisplay(data).join(", ") || "None"}
        </p>
      </div>
      <div className="border rounded-md p-4">{renderTree(data)}</div>
    </div>
  );
};

export default TreeSelect;
