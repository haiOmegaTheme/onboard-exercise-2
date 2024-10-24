import { ColumnTypeEnum, Filters, SortDirectionEnum } from "@/types";
import {
  Box,
  ChoiceList,
  InlineStack,
  OptionList,
  TextField,
} from "@shopify/polaris";
import {
  COLUMNS_TYPE_OPTIONS,
  FILTER_SOURCE_OPTIONS,
  SORT_BY_NAME_OPTIONS,
  SORT_BY_NUMBER_OPTIONS,
} from "./helper";
import { isValidArray } from "@/helper/validator";

enum FilterKeyEnum {
  totalSales = "TOTAL_SALES",
  source = "SOURCE",
  sortBy = "SORT_BY",
}

const FILTER_LABELS = {
  totalSales: "Total sales",
  sortBy: "Sort by",
  source: "Source",
};

export const useFilters = (
  filters: Filters,
  handleChangeFilter: (data: Filters) => void
) => {
  const demoFilters = [
    {
      key: FilterKeyEnum.totalSales,
      label: FILTER_LABELS.totalSales,
      filter: (
        <Box width="200px">
          <InlineStack gap="200" wrap={false}>
            <TextField
              label="More than"
              autoComplete="off"
              type="number"
              value={filters?.totalSales?.min}
              onChange={(value) =>
                handleChangeFilter({
                  totalSales: {
                    ...filters.totalSales,
                    min: value,
                  },
                })
              }
            />
            <TextField
              label="Less than"
              autoComplete="off"
              type="number"
              value={filters?.totalSales?.max}
              onChange={(value) =>
                handleChangeFilter({
                  totalSales: {
                    ...filters.totalSales,
                    max: value,
                  },
                })
              }
            />
          </InlineStack>
        </Box>
      ),
      shortcut: true,
    },
    {
      key: FilterKeyEnum.source,
      label: FILTER_LABELS.source,
      filter: (
        <Box>
          <OptionList
            onChange={(value) => {
              if (!isValidArray(value)) return;
              handleChangeFilter({
                source: value?.[0],
              });
            }}
            options={FILTER_SOURCE_OPTIONS}
            selected={filters?.source ? [filters?.source] : []}
          />
        </Box>
      ),
      shortcut: true,
    },
    {
      key: FilterKeyEnum.sortBy,
      label: FILTER_LABELS.sortBy,
      filter: (
        <Box>
          <ChoiceList
            title=""
            choices={COLUMNS_TYPE_OPTIONS}
            selected={filters?.sortBy?.item ? [filters?.sortBy?.item] : []}
            onChange={(value) => {
              if (!isValidArray(value)) return;
              handleChangeFilter({
                sortBy: {
                  ...(filters?.sortBy ?? {}),
                  item: value?.[0],
                  direction: undefined,
                },
              });
            }}
          />
          {filters?.sortBy?.item === ColumnTypeEnum.name ? "" : ""}
          <OptionList
            options={
              filters?.sortBy?.item === ColumnTypeEnum.name
                ? SORT_BY_NAME_OPTIONS
                : SORT_BY_NUMBER_OPTIONS
            }
            selected={
              filters?.sortBy?.direction ? [filters?.sortBy?.direction] : []
            }
            onChange={(value: SortDirectionEnum[]) => {
              if (!isValidArray(value)) return;
              handleChangeFilter({
                sortBy: {
                  ...(filters?.sortBy ?? {}),
                  direction: value?.[0],
                },
              });
            }}
          />
        </Box>
      ),
    },
  ];
  return { demoFilters };
};
