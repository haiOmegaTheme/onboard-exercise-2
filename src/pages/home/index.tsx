import { ACollapse } from "@/components/collapse";
import { InputColorPicker } from "@/components/color-picker";
import { InputDatePicker } from "@/components/date-picker";
import { LabelIcon } from "@/components/label-icon";
import Tabs from "@/components/tabs/tab-content";
import {
  CALENDAR_LAYOUT_OPTIONS,
  LANGUAGE_CODES,
  LANGUAGE_OPTIONS,
  LAYOUT_OPTIONS,
  WEEKDAYS_OPTIONS,
} from "@/helper/constant";
import { CalendarLayoutEnum, LayoutEnum, WeekdaysEnum } from "@/helper/enum";
import * as Switch from "@radix-ui/react-switch";
import { Checkbox, Select, TextField } from "@shopify/polaris";
import {
  PaintBrushFlatIcon,
  TextIcon,
  ThemeTemplateIcon,
} from "@shopify/polaris-icons";
import {
  asChoiceField,
  notEmpty,
  useField,
  useForm,
} from "@shopify/react-form";

export default function HomePage() {
  const { fields } = useForm({
    fields: {
      showCalendar: useField({ value: false, validates: [] }),
      requireDeliveryDate: useField({ value: false, validates: [] }),
      layout: useField({ value: LayoutEnum.default, validates: [] }),
      calendarLayout: useField({
        value: CalendarLayoutEnum.calendar,
        validates: [],
      }),
      alwaysOpenCalendar: useField({ value: false, validates: [] }),
      calendarLang: useField({ value: LANGUAGE_CODES.english, validates: [] }),
      firstDayOfCalendar: useField({
        value: WeekdaysEnum.monday,
        validates: [],
      }),
      dateFormat: useField<string>({
        validates: [notEmpty("Date format is Required!")],
        value: "",
      }),
      titleColor: useField<string>({
        value: "",
        validates: [notEmpty("Title color is required!")],
      }),
      themeColor: useField<string>({
        value: "",
        validates: [notEmpty("Theme color is required!")],
      }),
      requiredMessageTextColor: useField<string>({
        value: "",
        validates: [notEmpty("Required message text color is required!")],
      }),
      title: useField({
        value: "",
        validates: [notEmpty("Title is required!")],
      }),
      deliveryDateLabel: useField({
        value: "",
        validates: [notEmpty("Delivery date label is required!")],
      }),
      deliveryDateTitle: useField({
        value: "",
        validates: [notEmpty("Delivery date title is required!")],
      }),
      deliveryTimeTitle: useField({
        value: "",
        validates: [notEmpty("Delivery time title is required!")],
      }),
      requireMessageText: useField({
        value: "",
        validates: [notEmpty("Required message text is required!")],
      }),
      customCSS: useField({
        value: "",
        validates: [notEmpty("Custom CSS is required!")],
      }),
      storePickupLabel: useField({
        value: "",
        validates: [notEmpty("Store pickup label is required!")],
      }),
      messageToRequireBuyer: useField({
        value: "",
        validates: [
          notEmpty(
            "Message text to require buyers to choose a pickup location is required!"
          ),
        ],
      }),
      storePickupDateTitle: useField({
        value: "",
        validates: [notEmpty("Store pickup date title is required!")],
      }),
      storePickupTimeTitle: useField({
        value: "",
        validates: [notEmpty("Store pickup time title is required!")],
      }),
      requireMessageTextStorePickup: useField({
        value: "",
        validates: [notEmpty("Required message text is required!")],
      }),
    },
    onSubmit: async (props) => {
      console.log("submitted>>>", props);

      return { status: "success" };
    },
  });

  const tabs = [
    {
      key: "1",
      label: "Delivery Date",
      content: (
        <div className="flex-1 flex flex-col gap-3">
          <TextField label="Title" autoComplete="off" {...fields.title} />
          <TextField
            label="Delivery date label"
            autoComplete="off"
            {...fields.deliveryDateLabel}
          />
          <TextField
            label="Delivery date title"
            autoComplete="off"
            {...fields.deliveryDateTitle}
          />
          <TextField
            label="Delivery time title"
            autoComplete="off"
            {...fields.deliveryTimeTitle}
          />
          <TextField
            label="Required message text"
            autoComplete="off"
            {...fields.requireMessageText}
          />
          <TextField
            label="Custom CSS"
            autoComplete="off"
            multiline={4}
            {...fields.customCSS}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Store Pickup",
      content: (
        <div className="flex-1 flex flex-col gap-3">
          <TextField
            label="Store pickup label"
            autoComplete="off"
            {...fields.storePickupLabel}
          />
          <TextField
            label="Message text to require buyers to choose a pickup location"
            autoComplete="off"
            {...fields.messageToRequireBuyer}
          />
          <TextField
            label="Store pickup date title"
            autoComplete="off"
            {...fields.storePickupDateTitle}
          />
          <TextField
            label="Store pickup time title"
            autoComplete="off"
            {...fields.storePickupTimeTitle}
          />
          <TextField
            label="Required message text"
            autoComplete="off"
            {...fields.requireMessageTextStorePickup}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="font-semibold text-xl">Widget Setting</div>
      <div className="w-full">
        <div className="mt-2.5">
          <ACollapse
            id="1"
            open={true}
            toggleTitle={
              <LabelIcon icon={ThemeTemplateIcon} label="Widget Position" />
            }
          >
            <div className="flex flex-col ml-[2px] text-primary">
              <Checkbox
                label="Show the calendar at the product page"
                {...asChoiceField(fields.showCalendar)}
              />
              <Checkbox
                label="Require the delivery date before checkout"
                {...asChoiceField(fields.requireDeliveryDate)}
              />
            </div>
          </ACollapse>
        </div>
        <div className="mt-2.5">
          <ACollapse
            id="2"
            open={true}
            toggleTitle={
              <LabelIcon icon={PaintBrushFlatIcon} label="Widget Appearance" />
            }
          >
            <div className="flex gap-2.5">
              {" "}
              aa
              <Switch.Root className="SwitchRoot" id="airplane-mode">
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
              <div className="flex-1">
                <Select
                  label="Layout"
                  options={LAYOUT_OPTIONS}
                  value={fields.layout.value}
                  onChange={(value: LayoutEnum) =>
                    fields.layout.onChange(value)
                  }
                />
              </div>
              <div className="flex-1">
                <Select
                  label="Calendar layout"
                  options={CALENDAR_LAYOUT_OPTIONS}
                  value={fields.calendarLayout.value}
                  onChange={(value: CalendarLayoutEnum) =>
                    fields.calendarLayout.onChange(value)
                  }
                />
                <Checkbox
                  label="Always open the calendar"
                  {...asChoiceField(fields.alwaysOpenCalendar)}
                />
              </div>
            </div>
            <div className="flex gap-2.5 mt-2">
              <div className="flex-1 flex flex-col gap-3">
                <Select
                  label="Calendar language"
                  options={LANGUAGE_OPTIONS}
                  value={fields.calendarLang.value}
                  onChange={(value: string) =>
                    fields.calendarLang.onChange(value)
                  }
                />
                <InputDatePicker
                  label="Date Format"
                  autoComplete="off"
                  value={
                    fields.dateFormat.value
                      ? new Date(fields.dateFormat.value)
                      : undefined
                  }
                  onChangeDate={(value?: Date) => {
                    fields.dateFormat.onChange(value ? value.toString() : "");
                  }}
                  error={fields.dateFormat.error}
                />

                <InputColorPicker
                  label="Title color"
                  color={fields.titleColor.value}
                  onChangeColor={(value: string) =>
                    fields.titleColor.onChange(value)
                  }
                  error={fields.titleColor.error}
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <Select
                  value={fields.firstDayOfCalendar.value}
                  label="First day of calendar"
                  options={WEEKDAYS_OPTIONS}
                  onChange={(value: WeekdaysEnum) => {
                    fields.firstDayOfCalendar.onChange(value);
                  }}
                />
                <InputColorPicker
                  label="Theme color"
                  color={fields.themeColor.value}
                  onChangeColor={(value: string) =>
                    fields.themeColor.onChange(value)
                  }
                  error={fields.themeColor.error}
                />
                <InputColorPicker
                  label="Require message text color"
                  color={fields.requiredMessageTextColor.value}
                  onChangeColor={(value: string) =>
                    fields.requiredMessageTextColor.onChange(value)
                  }
                  error={fields.requiredMessageTextColor.error}
                />
              </div>
            </div>
          </ACollapse>
        </div>
        <div className="mt-2.5">
          <ACollapse
            id="3"
            open={true}
            toggleTitle={<LabelIcon icon={TextIcon} label="Widget Text" />}
          >
            <Tabs tabs={tabs} />
          </ACollapse>
        </div>
      </div>
    </>
  );
}
