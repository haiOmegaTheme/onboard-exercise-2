import { BlockStack } from "@shopify/polaris";
import { Folder } from "./components/Folder";
import { Node } from "@/types";
import { TreeNodeProps, TreeSelect } from "antd";
import { DataNode } from "antd/es/tree";
import { useState } from "react";
import { useGetLocations } from "@/services";
import { TreeSelect as DemoTree } from "@/components/DemoTree";
import { mockData } from "@/helper/constant";

const data: Node[] = [
  {
    name: "Home",
    checked: false,
  },
  {
    name: "Demo",
    checked: false,
    nodes: [
      {
        name: "1",
        checked: true,
      },
      {
        name: "2",
        checked: true,
        nodes: [
          {
            name: "demo 1",
            checked: false,
          },
        ],
      },
    ],
  },
];

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

export default function DemoPage() {
  const options: DataNode[] = [
    {
      key: "1",
      title: "demo 1",
      children: [
        {
          key: "11",
          title: "11",
        },
      ],
    },
    {
      key: "2",
      title: "demo 2",
      children: [
        {
          key: "11",
          title: "11",
        },
      ],
    },
    {
      key: "3",
      title: "demo 3",
      children: [
        {
          key: "11",
          title: "11",
        },
      ],
    },
  ];

  const [value, setValue] = useState(["0-0-0"]);

  const onChange = (newValue: string[]) => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  const { data: demo } = useGetLocations();
  return (
    <div className="container">
      <BlockStack>
        {data.map((item) => (
          <Folder folder={item} key={item.name} />
        ))}
      </BlockStack>
      <div className="w-20">
        <TreeSelect
          showCheckedStrategy="SHOW_PARENT"
          className="w-[200px]"
          treeCheckable
          treeData={options}
          value={["1"]}
          onChange={(value) => console.log(1111, value)}
        />
      </div>

      <DemoTree
        data={mockData}
        onChange={(data) => {
          console.log(1111, data);
        }}
      />
    </div>
  );
}
