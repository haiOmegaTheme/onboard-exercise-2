import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

type Tabs = {
  id: number;
  label: string;
};

type Props = {
  tabs: Tabs[];
  selectedTab: number;
  onTabSelected: (tab: Tabs) => void;
};

export const DemoTabs = ({ tabs, selectedTab, onTabSelected }: Props) => {
  const [tabWidth, setTabWidth] = useState(0);
  const [tabLeft, setTabLeft] = useState(4);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const generateTabItemClass = useCallback(
    (id: number) => {
      if (selectedTab === id)
        return " tabs__item  tabs__item--active z-20 relative";
      return "tabs__item z-20 relative";
    },
    [selectedTab]
  );

  useEffect(() => {
    console.log("check", selectedTab);
    const selectedTabElement = tabRefs.current[selectedTab];
    if (selectedTabElement) {
      setTabWidth(selectedTabElement.offsetWidth);
      setTabLeft(selectedTabElement.offsetLeft);
    }
  }, [selectedTab, tabs]);

  return (
    <div className="demo-tabs-wrapper">
      <div className="w-[412px] max-w-full mx-auto relative ">
        <ul className="tabs__container">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.label.toLowerCase()}`}
                className={generateTabItemClass(tab.id)}
                onClick={() => onTabSelected(tab)}
                ref={(el) => {
                  console.log("el>>>", el);
                  tabRefs.current[tab.id] = el;
                }}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          style={{
            width: tabWidth,
            height: "calc(100% - 8px)",
            position: "absolute",
            left: tabLeft,
            zIndex: 0,
            top: "4px",
          }}
          className="rounded-full bg-white transition-all duration-700 shadow"
        ></div>
      </div>
    </div>
  );
};
