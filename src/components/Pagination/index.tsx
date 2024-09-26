import { useDisclosure } from "@/hooks";
import { PaginationType } from "@/types";
import {
  Box,
  Button,
  InlineStack,
  OptionList,
  Pagination,
  Popover,
} from "@shopify/polaris";
import { OptionDescriptor } from "@shopify/polaris/build/ts/src/types";
import { useCallback } from "react";

type Props = {
  align?: "center" | "end" | "start";
  pagination?: PaginationType;
  onChangePage?: (pagination: PaginationType) => void;
  itemsPerPageOptions?: OptionDescriptor[];
};

export const AppPagination = ({
  align = "end",
  pagination = {
    page: 1,
    limit: 5,
    total: 0,
  },
  itemsPerPageOptions = [
    {
      label: "5",
      value: "5",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "15",
      value: "15",
    },
    {
      label: "20",
      value: "20",
    },
  ],
  onChangePage,
}: Props) => {
  const { isOpen, close, open } = useDisclosure(false);
  const handleChangePagination = useCallback(
    (fields: Partial<PaginationType>) => {
      const data = {
        ...pagination,
        ...fields,
      };

      onChangePage?.(data);
      close();
    },
    [close, onChangePage, pagination]
  );

  const handleChangeLimit = useCallback(
    (selected: string[]) => {
      handleChangePagination({ limit: parseInt(selected?.[0] ?? 5) });
    },
    [handleChangePagination]
  );
  return (
    <InlineStack blockAlign="center" align={align} gap="200">
      <Popover
        active={isOpen}
        onClose={close}
        activator={
          <Box width="50px">
            <Button fullWidth variant="secondary" onClick={open}>
              {pagination.limit.toString()}
            </Button>
          </Box>
        }
      >
        <Box width="fit">
          <InlineStack align="center">
            <OptionList
              allowMultiple={false}
              options={itemsPerPageOptions}
              selected={[pagination.limit.toString()]}
              onChange={handleChangeLimit}
            />
          </InlineStack>
        </Box>
      </Popover>
      <Pagination
        hasPrevious={pagination.page > 1}
        hasNext={pagination.page < pagination.total}
        onNext={() => handleChangePagination({ page: pagination.page - 1 })}
        onPrevious={() => handleChangePagination({ page: pagination.page + 1 })}
      />
    </InlineStack>
  );
};
