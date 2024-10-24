import { Box, Card, IndexTable, useIndexResourceState } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { AppPagination } from "@/components/Pagination";
import {
  AD_REPORT_TABLE_HEADERS,
  INITIAL_AD_REPORT_FILTER,
  MOCK_AD_REPORT_DATA,
} from "@/utils/adReport";
import { getPaginatedItems } from "@/helper/common-func";
import { PaginationType } from "@/types";
import { debounce } from "lodash";
import { TableFilter } from "./TableFilter";
import { TableRows } from "./TableRows";

const resourceName = {
  singular: "pixels",
  plural: "pixels",
};

export const AdReportTable = () => {
  const mockData = MOCK_AD_REPORT_DATA;
  const [pagination, setPagination] = useState<PaginationType>({
    limit: 5,
    page: 1,
    total: 0,
  });

  const [filterParams, setFilterParams] = useState(
    structuredClone(INITIAL_AD_REPORT_FILTER)
  );

  const [paginatedItems, setPaginatedItems] = useState<any>([]);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(paginatedItems);

  const handleClearSelections = useCallback(() => {
    handleSelectionChange("page", false, undefined, undefined);
    clearSelection();
  }, [clearSelection, handleSelectionChange]);

  const handleChangePagination = useCallback(
    (pagination: PaginationType) => {
      handleClearSelections();
      setPagination((prev) => ({ ...prev, ...pagination }));
    },
    [handleClearSelections]
  );
  const handleSetFilterParams = (filter = {}) => {
    setFilterParams((prev) => ({ ...prev, ...filter }));
  };

  const handleSearchPixel = useCallback(
    (value: string) => {
      setPagination({ ...pagination, page: 1 });
      handleSetFilterParams({ search: value });
    },
    [pagination]
  );

  const handleFilterChange = (sort: any) => {
    setPagination({ ...pagination, page: 1 });
    handleSetFilterParams({ sort: sort });
  };

  const performSearch = useCallback((keyword: string) => {
    if (keyword) {
      const result = mockData.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setPaginatedItems(result);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      performSearch(keyword);
    }, 500),
    [performSearch]
  );

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: mockData?.length ?? 0 }));
  }, []);

  useEffect(() => {
    debouncedSearch(filterParams?.search);
  }, [filterParams?.search]);

  useEffect(() => {
    const paginated = getPaginatedItems(mockData, pagination);

    setPaginatedItems(paginated);
  }, [pagination]);
  return (
    <Card>
      <TableFilter
        queryValue={filterParams?.search}
        selectedFilters={[]}
        onQueryValueChange={handleSearchPixel}
        onFiltersChange={handleFilterChange}
      />
      <IndexTable
        resourceName={resourceName}
        itemCount={paginatedItems?.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={AD_REPORT_TABLE_HEADERS}
        selectable
      >
        <TableRows
          list={paginatedItems}
          selectedResources={selectedResources}
        />
      </IndexTable>
      <Box padding="400">
        <AppPagination
          pagination={pagination}
          onChangePage={handleChangePagination}
        />
      </Box>
    </Card>
  );
};
