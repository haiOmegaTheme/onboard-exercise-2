import { ACollapse } from "@/components/collapse";
import { InputDatePicker } from "@/components/date-picker";
import { LabelIcon } from "@/components/label-icon";
import {
  CALENDAR_LAYOUT_OPTIONS,
  LANGUAGE_CODES,
  LANGUAGE_OPTIONS,
  LAYOUT_OPTIONS,
  WEEKDAYS_OPTIONS,
} from "@/helper/constant";
import { CalendarLayoutEnum, LayoutEnum, WeekdaysEnum } from "@/helper/enum";
import { Button, Checkbox, Select, TextField } from "@shopify/polaris";
import {
  TextIcon,
  PaintBrushFlatIcon,
  ThemeTemplateIcon,
} from "@shopify/polaris-icons";
import {
  asChoiceField,
  notEmpty,
  useField,
  useForm,
} from "@shopify/react-form";
export default function HomePage() {
  const { fields, submit, dirty } = useForm({
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
      dateFormat: useField<Date | undefined>({
        validates: [notEmpty("Date Format is Required!")],
        value: undefined,
      }),
      title: useField({
        value: "",
        validates: [notEmpty("Field is required!")],
      }),
    },
    onSubmit: async (props) => {
      console.log("submitted>>>", props);

      return { status: "success" };
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-2 px-5 bg-black">
        <div className="text-gray font-bold">Unsaved changes</div>
        <div className="flex items-center gap-1">
          <Button>Discard</Button>
          <Button disabled={!dirty} onClick={submit}>
            Save
          </Button>
        </div>
      </div>
      <div className="container ">
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
                <LabelIcon
                  icon={PaintBrushFlatIcon}
                  label="Widget Appearance"
                />
              }
            >
              <div className="flex gap-2.5">
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
                    label="Calendar Language"
                    options={LANGUAGE_OPTIONS}
                    value={fields.calendarLang.value}
                    onChange={(value: string) =>
                      fields.calendarLang.onChange(value)
                    }
                  />
                  {/* <TextField label="Date Format" autoComplete="off" /> */}
                  <InputDatePicker
                    label="Date Format"
                    autoComplete="off"
                    value={fields.dateFormat.value}
                    onChangeDate={(value?: Date) => {
                      if (value) {
                        fields.dateFormat.onChange(value);
                      }
                    }}
                  />
                  {/* <TextField label="Title color" autoComplete="off" /> */}
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
                  <TextField
                    label="Theme color"
                    autoComplete="off"
                    {...fields.title}
                  />
                  <TextField
                    label="Require message text color"
                    autoComplete="off"
                    {...fields.title}
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
              <TextField label="Test" autoComplete="off" {...fields.title} />
            </ACollapse>
          </div>
        </div>
      </div>
    </div>
  );
}
