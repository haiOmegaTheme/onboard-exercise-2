import { AppPagination } from "@/components/Pagination";
import { isValidArray } from "@/helper/validator";
import {
  ColumnTypeEnum,
  Filters,
  SortDirectionEnum,
  TapTypeEnum,
} from "@/types";
import {
  Box,
  Card,
  IndexFilters,
  IndexFiltersMode,
  IndexTable,
  Page,
  useBreakpoints,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AD_REPORT_SORT_OPTIONS,
  HEADER,
  INITIAL_TABS_OPTIONS,
  MAPPING_SELECTED_TAB_TO_TAB_TYPE,
  MAPPING_TAB_TYPE_TO_SELECTED_TAB,
  orders,
} from "./helper";
// import { TableRows } from "./TableRows";
import { TableRowSkeleton } from "./TableRowSkeleton";
import { useAppliedFilters } from "./useAppliedFilters";
import { INITIAL_AD_REPORT_FILTERS, useFilters } from "./useFilters";

const LazyTableRows = lazy(() => import("./TableRows"));

const resourceName = {
  singular: "Ad report",
  plural: "Ad reports",
};

export function DemoTable() {
  const [demoFilters, setDemoFilters] = useState<Filters>(
    structuredClone(INITIAL_AD_REPORT_FILTERS)
  );

  const [isLoading, setIsLoading] = useState(true);

  const handleChangeFilter = useCallback((data: Partial<Filters>) => {
    setDemoFilters((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  const handleFiltersClearAll = useCallback(() => {
    handleChangeFilter(structuredClone(INITIAL_AD_REPORT_FILTERS));
  }, [handleChangeFilter]);

  const { demoFilters: filters } = useFilters(demoFilters, handleChangeFilter);
  const appliedFilters = useAppliedFilters(demoFilters, handleChangeFilter);

  const selectedTabTest = useMemo(() => {
    return (
      MAPPING_TAB_TYPE_TO_SELECTED_TAB[demoFilters?.tabType] ??
      TapTypeEnum.campaign
    );
  }, [demoFilters?.tabType]);

  const handleChangeTab = useCallback(
    (tabIndex: number) => {
      const convertedValue = MAPPING_SELECTED_TAB_TO_TAB_TYPE[tabIndex];
      handleChangeFilter({ tabType: convertedValue });
    },
    [handleChangeFilter]
  );

  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Default);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const handleChangeSorts = (value: string[]) => {
    if (!isValidArray(value) || !value?.length || !value?.[0]) return;

    const [item, direction] = value[0].split(" ");

    item &&
      direction &&
      handleChangeFilter({
        sortBy: {
          item: item,
          direction: direction,
        },
      });
  };

  const selectedSort = useMemo(() => {
    const item = demoFilters?.sortBy?.item;
    const direction = demoFilters?.sortBy?.direction;

    return item && direction
      ? [item + " " + direction]
      : [ColumnTypeEnum.name + " " + SortDirectionEnum.descending];
  }, [demoFilters]);

  const [fullWidth, setFullWidth] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Your code to run after the timeout
      setFullWidth(true);
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Page fullWidth={!isLoading}>
      <Card>
        <IndexFilters
          loading={isLoading}
          autoFocusSearchField
          sortOptions={AD_REPORT_SORT_OPTIONS}
          sortSelected={selectedSort}
          queryValue={demoFilters?.search}
          queryPlaceholder="Searching in all"
          onQueryChange={(value) => handleChangeFilter({ search: value })}
          onQueryClear={() => handleChangeFilter({ search: undefined })}
          onSort={handleChangeSorts}
          cancelAction={{
            onAction: () => setMode(IndexFiltersMode.Default),
            disabled: false,
            loading: false,
          }}
          tabs={INITIAL_TABS_OPTIONS}
          selected={selectedTabTest}
          onSelect={handleChangeTab}
          canCreateNewView={false}
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={HEADER}
        >
          {isLoading ? (
            <TableRowSkeleton />
          ) : (
            <Suspense fallback={<TableRowSkeleton />}>
              <LazyTableRows
                dataSource={orders}
                selectedResources={selectedResources}
              />
            </Suspense>
          )}
        </IndexTable>
        <AppPagination />
      </Card>
    </Page>
  );
}
