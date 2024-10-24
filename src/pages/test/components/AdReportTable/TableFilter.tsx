import { IndexFilters, useSetIndexFiltersMode } from "@shopify/polaris";

export const TableFilter = ({
  queryValue = "",
  onQueryValueChange,
  onFiltersChange,
  selectedFilters = [],
}: {
  queryValue: any;
  onQueryValueChange: any;
  onFiltersChange: any;
  selectedFilters: any;
}) => {
  const { mode, setMode } = useSetIndexFiltersMode();

  const handleChangeSearchValue = (value: string) => {
    onQueryValueChange((value ?? "").trimStart());
  };

  const handleCancel = () => {
    onQueryValueChange("");
  };

  const handleClearAll = () => {
    onQueryValueChange("");
  };

  const handleClearQueryValue = () => {
    onQueryValueChange("");
  };

  return (
    <IndexFilters
      queryValue={queryValue}
      onQueryChange={handleChangeSearchValue}
      mode={mode}
      setMode={setMode}
      tabs={[]}
      cancelAction={{
        onAction: handleCancel,
        disabled: false,
        loading: false,
      }}
      onQueryClear={handleClearQueryValue}
      queryPlaceholder="Search by campaign, ad group, ad"
      selected={selectedFilters}
      onSelect={onFiltersChange}
      onClearAll={handleClearAll}
      filters={[]}
    />
  );
};
