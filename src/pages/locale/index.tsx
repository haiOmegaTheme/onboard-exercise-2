import { OptionList } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LocalePage() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<string[]>(["en"]);
  console.log(1);

  const handleChangeLanguage = useCallback(
    (langStr: string[]) => {
      i18n.changeLanguage(langStr[0]);
      setSelected(langStr);
    },
    [i18n]
  );
  return (
    <div className="flex flex-col h-dvh bg-secondary">
      <div className="flex items-center justify-between py-2 px-5 bg-black h-[40px]"></div>
      <div className="overflow-y-scroll flex-1 mt-7">
        <div className="flex flex-col items-center">
          <div className="font-bold text-xl">{t("title")}</div>
          <div className="mt-2.5">
            <div
              className="font-medium text-md"
              dangerouslySetInnerHTML={{ __html: t("description.part1") }}
            />
            <div className="mt-5">
              <OptionList
                options={[
                  { label: "English", value: "en" },
                  { label: "Vietnamese", value: "vi" },
                ]}
                selected={selected}
                onChange={handleChangeLanguage}
              />
            </div>
            <div
              className="font-medium text-md"
              dangerouslySetInnerHTML={{ __html: t("description.part2") }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
