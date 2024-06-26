import { ACollapse } from "@/components/collapse";
import { LabelIcon } from "@/components/label-icon";
import { Checkbox } from "@shopify/polaris";
import {
  TextIcon,
  PaintBrushFlatIcon,
  ThemeTemplateIcon,
} from "@shopify/polaris-icons";
export default function HomePage() {
  return (
    <div>
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
                <Checkbox label="Show the calendar at the product page" />
                <Checkbox label="Require the delivery date before checkout" />
              </div>
            </ACollapse>
          </div>
          <div className="mt-2.5">
            <ACollapse
              id="1"
              open={false}
              toggleTitle={
                <LabelIcon
                  icon={PaintBrushFlatIcon}
                  label="Widget Appearance"
                />
              }
            ></ACollapse>
          </div>
          <div className="mt-2.5">
            <ACollapse
              id="1"
              open={false}
              toggleTitle={<LabelIcon icon={TextIcon} label="Widget Text" />}
            ></ACollapse>
          </div>
        </div>
      </div>
    </div>
  );
}
