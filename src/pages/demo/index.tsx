import { TreeSelect } from '@/components/TreeSelect';
import { normalizeString } from '@/helper/common-func';
import { useGetLocations } from '@/services';
import { RegionInfo } from '@/types';
import { BaseOptions, Node } from '@/types/treeSelect';
import { Box, InlineStack, Tag } from '@shopify/polaris';
import { useCallback, useMemo, useState } from 'react';

type SelectedIds = {
  [key: string]: boolean;
};

export default function DemoPage() {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<SelectedIds>({});
  const { data } = useGetLocations();

  const sortNodes = useCallback((nodes: Node[]) => {
    nodes.forEach((node) => {
      if (node.nodes && node.nodes.length > 0) {
        sortNodes(node.nodes);
      }
    });
    nodes.sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const mapRegionToNode = useCallback(
    (region: RegionInfo, regionInfo: RegionInfo[], parentNames: string[] = []): Node => {
      const nextLevelIds = region?.next_level_ids;
      const currentNames = [...parentNames, region.name];

      if (!Array.isArray(nextLevelIds) || !nextLevelIds.length) {
        return {
          id: region.location_id,
          label: region.name,
          alternativeName: currentNames.join(', '),
          nodes: []
        };
      }

      const mappedNode = nextLevelIds.map((id: string) => {
        const nextRegion = regionInfo.find((item) => item.location_id === id);
        return nextRegion ? mapRegionToNode(nextRegion, regionInfo, currentNames) : undefined;
      });

      const filteredNode: Node[] = mappedNode.filter((node: Node | undefined) => node !== undefined);

      return {
        id: region.location_id,
        label: region.name,
        alternativeName: currentNames.join(', '),
        nodes: filteredNode
      };
    },
    []
  );

  const nodes = useMemo(() => {
    const regionInfo = data?.region_info;
    if (!Array.isArray(regionInfo) || !regionInfo.length) return [];
    const nodes: Node[] = regionInfo
      .filter((region) => region.parent_id === '0')
      .map((region) => mapRegionToNode(region, regionInfo, region?.name ? [region.name] : []));
    sortNodes(nodes);
    return nodes;
  }, [data?.region_info, mapRegionToNode, sortNodes]);

  const handleSelect = useCallback(
    (checked: boolean, node: Node, isClearAll?: boolean) => {
      if (isClearAll && node?.id) {
        setSelectedIds({
          [node.id]: checked
        });
        return;
      }
      const newSelected = { ...selectedIds };
      const selectRecursive = (n: Node) => {
        newSelected[n.id] = checked;
        n.nodes?.forEach((child) => selectRecursive(child));
      };
      selectRecursive(node);
      setSelectedIds(newSelected);
    },
    [selectedIds]
  );

  const buildAlternativeNames = useCallback((locations: RegionInfo[]): BaseOptions[] => {
    const locationMap = new Map();
    locations.forEach((location) => locationMap.set(location.location_id, location));

    const getAlternativeName = (location: RegionInfo): string => {
      if (!location?.parent_id) {
        return location?.name;
      }
      const parent = locationMap.get(location.parent_id);

      if (getAlternativeName(parent)) return `${location.name}, ${getAlternativeName(parent)}`;

      return location.name;
    };

    return locations.map((location) => ({
      ...location,
      id: location.location_id,
      value: location.location_id,
      label: getAlternativeName(location),
      name: location.name
    }));
  }, []);

  const [itemsToShow, setItemsToShow] = useState<number>(20);

  const flattedNodes = useMemo(() => {
    if (!search) return [];
    const trimmedSearchValue = (search ?? '').trim().toLowerCase();

    if (!trimmedSearchValue) return [];

    const keywords = trimmedSearchValue.split(' ').filter(Boolean);

    const mappedNodes = buildAlternativeNames(data?.region_info ?? []);

    const result = mappedNodes.filter((item) => {
      const name = normalizeString(item.name.toLowerCase());
      return keywords.some((keyword) => name.includes(normalizeString(keyword)));
    });

    return result.length > itemsToShow ? result.slice(0, itemsToShow) : result;
  }, [search, buildAlternativeNames, data?.region_info, itemsToShow]);

  return (
    <div className="container">
      <div className="mt-[50px]"></div>

      {Object.keys(selectedIds).filter((id) => selectedIds[id])?.length ? (
        <>
          <Box borderRadius="100" padding="200">
            <InlineStack gap="200">
              {Object.keys(selectedIds)
                .filter((id) => selectedIds[id])
                .map((item) => (
                  <Tag onRemove={() => {}} key={item}>
                    {item}
                  </Tag>
                ))}
            </InlineStack>
          </Box>
          <Box paddingBlockStart="400" />
        </>
      ) : null}

      <TreeSelect
        nodes={nodes}
        search={search}
        onSelectLocation={handleSelect}
        selectedIds={Object.keys(selectedIds).filter((id) => selectedIds[id])}
        flattedNodes={flattedNodes}
        onScrolledToBottom={() => setItemsToShow((prev) => prev + 20)}
        onSearch={(value) => {
          setSearch(value);
        }}
      />
    </div>
  );
}
