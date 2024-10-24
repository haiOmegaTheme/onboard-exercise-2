import { ColumnTypeEnum, Filters } from "@/types";
import { AppliedFilterInterface } from "@shopify/polaris";
import { useMemo } from "react";
import {
  ALPHABETICAL_ORDER_LABELS,
  FilterKeyEnum,
  MAPPING_SORT_BY_LABEL,
  MAPPING_SOURCE,
  SUPERLATIVE_LABELS,
} from "./helper";

type DemoItem = AppliedFilterInterface;

type Demo = {
  totalSales: DemoItem;
  source: DemoItem;
  sortBy: DemoItem;
};

export const useAppliedFilters = (
  filters: Filters,
  handleChangeFilter: (data: Filters) => void
): AppliedFilterInterface[] => {
  const totalSalesMin = useMemo(
    () => filters?.totalSales?.min,
    [filters?.totalSales?.min]
  );
  const totalSalesMax = useMemo(
    () => filters?.totalSales?.max,
    [filters?.totalSales?.max]
  );

  const sourceValue = useMemo(() => filters?.source, [filters?.source]);

  const hasTotalSales = useMemo(
    () => !!totalSalesMin || !!totalSalesMax,
    [totalSalesMin, totalSalesMax]
  );

  const hasSource = useMemo(() => !!filters?.source, [filters?.source]);

  const hasSortBy = useMemo(
    () => !!filters?.sortBy?.item || !!filters?.sortBy?.direction,
    [filters?.sortBy?.direction, filters?.sortBy?.item]
  );

  const generateTotalSalesText = useMemo(() => {
    if (totalSalesMin && totalSalesMax)
      return `Total sales more than ${totalSalesMin} and less than ${totalSalesMax}`;

    if (totalSalesMin) return `Total sales more than ${totalSalesMin}`;

    return totalSalesMax
      ? `Total sales more than ${totalSalesMax}`
      : "Total sales";
  }, [totalSalesMin, totalSalesMax]);

  const generateSourceLabel = useMemo(() => {
    const mapValue = sourceValue ? MAPPING_SOURCE[sourceValue] : "";
    return mapValue ? `Source: ${mapValue}` : "Source";
  }, [sourceValue]);

  const generateSortByLabel = useMemo(() => {
    const item = filters?.sortBy?.item;
    const direction = filters?.sortBy?.direction;

    const prefix = item ? MAPPING_SORT_BY_LABEL[item] : "Sort by";

    if (!direction) return prefix;

    const alphabeticalDirection = ALPHABETICAL_ORDER_LABELS[direction] ?? "";
    const superlativeDirection = SUPERLATIVE_LABELS[direction] ?? "";

    const suffix =
      item === ColumnTypeEnum.name
        ? alphabeticalDirection
        : superlativeDirection;

    return suffix ? prefix + suffix : prefix;
  }, [filters?.sortBy]);

  const appliedFiltersObj: Demo = useMemo(() => {
    const totalSales: AppliedFilterInterface = {
      key: FilterKeyEnum.totalSales,
      label: generateTotalSalesText,
      onRemove: () => handleChangeFilter({ totalSales: undefined }),
    };

    const source: AppliedFilterInterface = {
      key: FilterKeyEnum.source,
      label: generateSourceLabel,
      onRemove: () => handleChangeFilter({ source: undefined }),
    };

    const sortBy: AppliedFilterInterface = {
      key: FilterKeyEnum.sortBy,
      label: generateSortByLabel,
      onRemove: () => handleChangeFilter({ sortBy: undefined }),
    };

    return { totalSales, source, sortBy };
  }, [
    generateSourceLabel,
    generateTotalSalesText,
    generateSortByLabel,
    handleChangeFilter,
  ]);

  const appliedFilters = useMemo(() => {
    const filters: AppliedFilterInterface[] = [];

    if (hasTotalSales) filters.push(appliedFiltersObj.totalSales);
    if (hasSource) filters.push(appliedFiltersObj.source);
    if (hasSortBy) filters.push(appliedFiltersObj.sortBy);

    return filters;
  }, [appliedFiltersObj, hasTotalSales, hasSource, hasSortBy]);

  return appliedFilters;
};
