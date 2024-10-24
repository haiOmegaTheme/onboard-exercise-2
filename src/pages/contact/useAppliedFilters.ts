import { useMemo } from "react";
import { Filters } from "@/types";
import { AppliedFilterInterface } from "@shopify/polaris";

export const useAppliedFilters = (
  filters: Filters,
  handleChangeFilter: () => void
): AppliedFilterInterface[] => {
  const appliedFilters: AppliedFilterInterface[] = useMemo(() => {
    const result: AppliedFilterInterface[] = [];

    const totalSalesF: AppliedFilterInterface = {
      key: "",
      label: "",
      onRemove: handleChangeFilter,
    };

    return result;
  }, [filters]);

  return appliedFilters;
};
