import { isValidArray } from "@/helper/validator";
import {
  ColumnTypeEnum,
  Filters,
  SortDirectionEnum,
  SourceTypeEnum,
  TapTypeEnum,
} from "@/types";
import {
  Box,
  ChoiceList,
  InlineStack,
  OptionList,
  TextField,
} from "@shopify/polaris";
import {
  COLUMNS_TYPE_OPTIONS,
  FILTER_LABELS,
  FILTER_SOURCE_OPTIONS,
  FilterKeyEnum,
  SORT_BY_NAME_OPTIONS,
  SORT_BY_NUMBER_OPTIONS,
} from "./helper";

export const useFilters = (
  filters: Filters,
  handleChangeFilter: (data: Partial<Filters>) => void
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
            onChange={(value: SourceTypeEnum[]) => {
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
            onChange={(value: ColumnTypeEnum[]) => {
              if (!isValidArray(value)) return;
              handleChangeFilter({
                sortBy: {
                  ...(filters?.sortBy ?? {}),
                  item: value?.[0],
                  // direction: undefined,
                },
              });
            }}
          />
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

export const INITIAL_AD_REPORT_FILTERS = {
  search: "",
  totalSales: {},
  sortBy: {
    item: ColumnTypeEnum.name,
    direction: SortDirectionEnum.descending,
  },
  tabType: TapTypeEnum.campaign,
};
