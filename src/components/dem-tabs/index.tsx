import { useCallback } from "react";
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
  const generateTabItemClass = useCallback(
    (id: number) => {
      if (selectedTab === id) return "tabs__item--active";
      return "tabs__item";
    },
    [selectedTab]
  );

  return (
    <div className="demo-tabs-wrapper">
      <div className="w-[412px] max-w-full mx-auto">
        <ul className="tabs__container">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.label.toLowerCase()}`}
                className={generateTabItemClass(tab.id)}
                onClick={() => onTabSelected(tab)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
