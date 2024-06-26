import { useDisclosure, useClickOutSide } from "@/hooks";
import {
  Card,
  DatePicker,
  Popover,
  TextField,
  TextFieldProps,
} from "@shopify/polaris";
import { useMemo, useRef, useState } from "react";

type Props = Omit<TextFieldProps, "value"> & {
  value?: Date;
  onChangeDate?: (date: Date) => void;
};

export function InputDatePicker({ value, onChangeDate, ...rest }: Props) {
  const { isOpen, open, close } = useDisclosure(false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date());
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const ref = useRef<HTMLDivElement>(null);

  const formattedValue = useMemo(() => {
    return formatDate(selectedDate);
  }, [selectedDate]);

  function handleMonthChange(month: number, year: number) {
    setDate({ month, year });
  }
  function handleChangeDate(data: { start: Date; end: Date }) {
    setSelectedDate(data.end);
    onChangeDate?.(data.end);
    close();
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useClickOutSide(ref, () => {
    if (isFocused) return;
    close();
  });

  //   useEffect(() => {
  //     if (selectedDate) {
  //       setDate({
  //         month: selectedDate.getMonth(),
  //         year: selectedDate.getFullYear(),
  //       });
  //     }
  //   }, [selectedDate]);

  return (
    <Popover
      active={isOpen}
      autofocusTarget="none"
      preferredAlignment="left"
      fullWidth
      preferInputActivator={false}
      preferredPosition="below"
      preventCloseOnChildOverlayClick
      onClose={close}
      activator={
        <div ref={ref}>
          <TextField
            role="combobox"
            value={formattedValue}
            onFocus={() => {
              open();
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            {...rest}
          />
        </div>
      }
    >
      <div ref={ref}>
        <Card>
          <DatePicker
            month={month}
            year={year}
            selected={selectedDate}
            onMonthChange={handleMonthChange}
            onChange={handleChangeDate}
          />
        </Card>
      </div>
    </Popover>
  );
}
