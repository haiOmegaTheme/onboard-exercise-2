import { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@/hooks";
import { Popover, TextField, TextFieldProps } from "@shopify/polaris";
import ColorPicker, { Color, ColorBlock } from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

const prefixCls = "rc-color-picker";

type Props = Omit<TextFieldProps, "label" | "autoComplete"> & {
  color: Color | string;
  onChangeColor?: (color: string) => void;
  label: string;
};

export const InputColorPicker = ({
  color,
  onChangeColor,
  label,
  ...rest
}: Props) => {
  const [value, setValue] = useState<Color | string>(color);

  const hexColor = useMemo(() => {
    if (typeof value === "string") {
      return value;
    }
    return value.getAlpha() < 1 ? value.toHex8String() : value.toHexString();
  }, [value]);

  const { isOpen, close, toggle } = useDisclosure(false);

  const renderPanel = (panel: React.ReactElement) => {
    return (
      <>
        {panel}
        <TextField label="" autoComplete="off" value={hexColor} />
      </>
    );
  };

  useEffect(() => {
    onChangeColor?.(hexColor ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexColor]);

  return (
    <TextField
      label={label}
      autoComplete="off"
      value={hexColor}
      onChange={(e) => setValue(e)}
      {...rest}
      suffix={
        <Popover
          active={isOpen}
          onClose={close}
          activator={
            <ColorBlock
              color={hexColor}
              prefixCls={prefixCls}
              onClick={toggle}
              className="cursor-pointer"
            />
          }
        >
          <ColorPicker
            value={value}
            onChange={setValue}
            panelRender={renderPanel}
          />
        </Popover>
      }
    />
  );
};
