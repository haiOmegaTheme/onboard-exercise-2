import React, { useState, useRef, useEffect } from "react";
import { Tab } from "./tab";

interface TabContent {
  label: string;
  content: React.ReactNode;
  key: string;
}

interface TabsProps {
  tabs: TabContent[];
  defaultActiveKey?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey ?? tabs[0].key
  );
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleTabClick = (key: string, index: number) => {
    setActiveKey(key);
    if (tabRefs.current[index]) {
      setIndicatorStyle({
        left: tabRefs.current[index]?.offsetLeft,
        width: tabRefs.current[index]?.clientWidth,
      });
    }
  };

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.key === activeKey);
    if (tabRefs.current[index]) {
      setIndicatorStyle({
        left: tabRefs.current[index]?.offsetLeft,
        width: tabRefs.current[index]?.clientWidth,
      });
    }
  }, [activeKey, tabs]);

  return (
    <div>
      <div className="relative border-b-1 border-light-gray">
        <div className="flex">
          {tabs.map((tab, index) => (
            <div
              className="flex-1"
              key={tab.key}
              ref={(el) => (tabRefs.current[index] = el)}
            >
              <Tab
                label={tab.label}
                onClick={() => handleTabClick(tab.key, index)}
                active={tab.key === activeKey}
              />
            </div>
          ))}
        </div>
        <span
          className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
          style={indicatorStyle}
        />
      </div>
      <div className="p-4">
        {tabs.find((tab) => tab.key === activeKey)?.content}
      </div>
    </div>
  );
};

export default Tabs;
