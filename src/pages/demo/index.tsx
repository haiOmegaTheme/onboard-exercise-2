import { TreeSelect } from '@/components/TreeSelect';
import { normalizeString } from '@/helper/common-func';
import { useGetLocations } from '@/services';
import { RegionInfo } from '@/types';
import { BaseOptions, Node } from '@/types/treeSelect';
import { Box, InlineStack, Scrollable, Tag } from '@shopify/polaris';
import { useCallback, useEffect, useMemo, useState } from 'react';

type SelectedIds = {
  [key: string]: boolean;
};

/**
 * Filter a node by ID in a tree-like structure.
 * @param nodes Array of nodes to search within.
 * @param selectedNodeId ID of the node to find.
 * @returns The found node or undefined if not found.
 */
function findNodeById(nodes: Node[], selectedNodeId: string): Node | undefined {
  for (const node of nodes) {
    if (node.id === selectedNodeId) {
      return node; // Node found, return it.
    }

    if (node.nodes) {
      const foundNode = findNodeById(node.nodes, selectedNodeId); // Recursively search in child nodes.
      if (foundNode) {
        return foundNode; // Node found in child nodes, return it.
      }
    }
  }

  return undefined; // Node not found in the current tree.
}

type RenderItem = {
  label: string;
  tags: { id: string; label: string }[];
};

function renderRegions(regionInfo: RegionInfo[], selectedIds: string[]): RenderItem[] {
  const groupByParent = selectedIds.reduce<Record<string, RegionInfo[]>>((acc, selectedId) => {
    const selectedRegion = regionInfo.find((region) => region.location_id === selectedId);

    if (selectedRegion) {
      // Traverse up to the parent region if it's not a COUNTRY
      let currentRegion = selectedRegion;
      while (currentRegion.level !== 'COUNTRY') {
        const parentRegion = regionInfo.find((region) => region.location_id === currentRegion.parent_id);
        if (parentRegion) {
          currentRegion = parentRegion;
        } else {
          break; // Stop if no valid parent is found
        }
      }

      // Use the country's location_id as the grouping key
      const parentId = currentRegion.location_id;
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(selectedRegion);
    }
    return acc;
  }, {});

  const result: RenderItem[] = [];

  // Iterate through top-level regions (countries)
  regionInfo
    .filter((region) => region.level === 'COUNTRY')
    .forEach((country) => {
      const countrySelected = selectedIds.includes(country.location_id);
      const provinces = groupByParent[country.location_id] || [];

      if (countrySelected) {
        // Entire country is selected
        result.push({
          label: country.name,
          tags: [{ id: country.location_id, label: country.name }]
        });
      } else if (provinces.length > 0) {
        // Partial selection within the country
        const provinceTags = provinces.flatMap((province) => {
          const districts = groupByParent[province.location_id] || [];
          const provinceSelected = selectedIds.includes(province.location_id);

          if (provinceSelected) {
            // Entire province is selected
            return { id: province.location_id, label: province.name };
          } else if (districts.length > 0) {
            // Partial selection within the province
            return districts
              .filter((district) => selectedIds.includes(district.location_id))
              .map((district) => ({
                id: district.location_id,
                label: `${district.name} - ${province.name}`
              }));
          }
          return null; // Province not selected, no districts selected
        });

        result.push({
          label: country.name,
          tags: provinceTags.filter(Boolean) as { id: string; label: string }[]
        });
      }
    });

  return result;
}

// function renderRegions(regionInfo: RegionInfo[], selectedIds: string[]): RenderItem[] {
//   const groupByParent = selectedIds.reduce<Record<string, RegionInfo[]>>((acc, selectedId) => {
//     const selectedRegion = regionInfo.find((region) => region.location_id === selectedId);

//     if (selectedRegion) {
//       // Traverse up to the parent region if it's not a COUNTRY
//       let currentRegion = selectedRegion;
//       while (currentRegion.level !== 'COUNTRY') {
//         const parentRegion = regionInfo.find((region) => region.location_id === currentRegion.parent_id);
//         if (parentRegion) {
//           currentRegion = parentRegion;
//         } else {
//           break; // Stop if no valid parent is found
//         }
//       }

//       // Use the country's location_id as the grouping key
//       const parentId = currentRegion.location_id;
//       if (!acc[parentId]) {
//         acc[parentId] = [];
//       }
//       acc[parentId].push(selectedRegion);
//     }
//     return acc;
//   }, {});

//   const result: RenderItem[] = [];

//   // Iterate through top-level regions (countries)
//   regionInfo
//     .filter((region) => region.level === 'COUNTRY')
//     .forEach((country) => {
//       const countrySelected = selectedIds.includes(country.location_id);
//       const provinces = groupByParent[country.location_id] || [];

//       if (countrySelected) {
//         // Entire country is selected
//         result.push({
//           label: country.name,
//           tags: [{ id: country.location_id, label: country.name }]
//         });
//       } else if (provinces.length > 0) {
//         // Partial selection within the country
//         const provinceTags = provinces.flatMap((province) => {
//           const districts = groupByParent[province.location_id] || [];
//           const allDistrictsSelected =
//             province.next_level_ids.length > 0 && province.next_level_ids.every((id) => selectedIds.includes(id));

//           if (allDistrictsSelected) {
//             // All districts selected, use province as a single tag
//             return { id: province.location_id, label: province.name };
//           } else if (districts.length > 0) {
//             // Partial selection within the province
//             return districts
//               .filter((district) => selectedIds.includes(district.location_id))
//               .map((district) => ({
//                 id: district.location_id,
//                 label: `${district.name} - ${province.name}`
//               }));
//           }
//           return null; // Province not selected, no districts selected
//         });

//         result.push({
//           label: country.name,
//           tags: provinceTags.filter(Boolean) as { id: string; label: string }[]
//         });
//       }
//     });

//   return result;
// }

export default function DemoPage() {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<SelectedIds>({});
  const { data } = useGetLocations();
  const [loading, setLoading] = useState(false);

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
          ...region,
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
        ...region,
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

  const handleSelectSearchItem = useCallback(
    (checked: boolean, selectedNodeId: string) => {
      const selectedIdsArray = Object.keys(selectedIds).filter((id) => selectedIds[id]);

      if (selectedIdsArray.includes(selectedNodeId)) {
        alert('Already selected!');
        return;
      }

      const newSelected = { ...selectedIds };
      const selectRecursive = (n: Node) => {
        newSelected[n.id] = checked;
        n.nodes?.forEach((child) => selectRecursive(child));
      };

      const filteredNode = findNodeById(nodes, selectedNodeId);
      if (filteredNode) selectRecursive(filteredNode);
      setSelectedIds(newSelected);
    },
    [nodes, selectedIds]
  );

  useEffect(() => {
    if (!selectedIds) return;
    const selectedIdsArray = Object.keys(selectedIds).filter((id) => selectedIds[id]);
    console.log('selectedIdsArray', renderRegions(data?.region_info ?? [], selectedIdsArray));
  }, [data?.region_info, selectedIds]);

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
            <Scrollable
              style={{
                maxHeight: 204
              }}>
              <InlineStack gap="200">
                {Object.keys(selectedIds)
                  .filter((id) => selectedIds[id])
                  .map((item) => (
                    <Tag onRemove={() => {}} key={item}>
                      {item}
                    </Tag>
                  ))}
              </InlineStack>
            </Scrollable>
          </Box>
          <Box paddingBlockStart="400" />
        </>
      ) : null}

      <TreeSelect
        nodes={nodes}
        search={search}
        loading={loading}
        onSelectLocation={handleSelect}
        selectedIds={Object.keys(selectedIds).filter((id) => selectedIds[id])}
        flattedNodes={flattedNodes}
        onSelectSearchItem={handleSelectSearchItem}
        onScrolledToBottom={() => {
          if (!loading) {
            setLoading(true);
            setTimeout(() => {
              setItemsToShow((prev) => prev + 20);
              setLoading(false);
            }, 1000);
          }
        }}
        onSearch={(value) => {
          setSearch(value);
        }}
      />
    </div>
  );
}
