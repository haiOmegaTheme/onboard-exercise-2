import { TreeSelect } from "@/components/TreeSelect";
import { useGetLocations, useSearchLocations } from "@/services";
import { Node } from "@/types/treeSelect";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function DemoPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data } = useGetLocations();
  useSearchLocations(
    { search: search.trim() },
    {
      enabled: !!search.trim(),
    }
  );

  const sortNodes = useCallback((nodes: Node[]) => {
    nodes.forEach((node) => {
      if (node.nodes && node.nodes.length > 0) {
        sortNodes(node.nodes);
      }
    });
    nodes.sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const nodes: Node[] = useMemo(() => {
    const regionInfo = data?.region_info;
    if (!regionInfo?.length) return [];

    // Create a map of all nodes
    const nodeMap: { [key: string]: Node } = {};
    regionInfo.forEach((item) => {
      nodeMap[item.location_id] = {
        id: item.location_id,
        label: item.name,
        nodes: [],
      };
    });

    // Link child nodes to their parent nodes
    regionInfo.forEach((item) => {
      if (item.next_level_ids.length > 0) {
        item.next_level_ids.forEach((childId) => {
          if (nodeMap[childId]) {
            nodeMap[item.location_id].nodes!.push(nodeMap[childId]);
          }
        });
      }
    });

    // Get the root nodes and sort them
    const rootNodes = regionInfo
      .filter((item) => item.parent_id === "0")
      .map((item) => nodeMap[item.location_id]);

    sortNodes(rootNodes);

    return rootNodes;
  }, [data?.region_info, sortNodes]);

  return (
    <div className="container">
      <div className="mt-[50px]"></div>
      <TreeSelect
        nodes={nodes}
        search={search}
        onSearch={(value) => {
          console.log(1111, value);
          setSearch(value);
        }}
      />
    </div>
  );
}
