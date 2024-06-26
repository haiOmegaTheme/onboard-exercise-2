import {
  formatDateToYYMMDD,
  getCurrentMonth,
  getCurrentYear,
} from "@/helper/date-time";
import { useDisclosure, useClickOutSide } from "@/hooks";
import {
  Card,
  DatePicker,
  Popover,
  TextField,
  TextFieldProps,
} from "@shopify/polaris";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = Omit<TextFieldProps, "value"> & {
  value?: Date;
  onChangeDate?: (date?: Date) => void;
};

export function InputDatePicker({ value, onChangeDate, ...rest }: Props) {
  const { isOpen, open, close } = useDisclosure(false);

  const [isFocused, setIsFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [{ month, year }, setDate] = useState({
    month: value?.getMonth() ?? getCurrentMonth(),
    year: value?.getFullYear() ?? getCurrentYear(),
  });

  const ref = useRef<HTMLDivElement>(null);

  const formattedValue = useMemo(
    () => formatDateToYYMMDD(selectedDate),
    [selectedDate]
  );

  const handleMonthChange = (month: number, year: number) => {
    setDate({ month, year });
  };

  const handleChangeDate = (data: { start: Date; end: Date }) => {
    setSelectedDate(data.end);
    onChangeDate?.(data.end);
    close();
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    onChangeDate?.(undefined);
  };

  useClickOutSide(ref, () => {
    if (!isFocused) close();
  });

  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);

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
            value={formattedValue}
            onFocus={() => {
              open();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            {...rest}
            clearButton
            onClearButtonClick={handleClear}
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
