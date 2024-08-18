import { useEffect, useState } from "react";
import "./style.scss";

type Props = {
  tabs: Array<{ title: string }>;
  activeTab: number;
  onTabClick: (index: number) => void;
};

const Tabs = ({ tabs, activeTab, onTabClick }: Props) => {
  const [selectorStyle, setSelectorStyle] = useState({});

  useEffect(() => {
    const activeItem: any = document.querySelector(".tabs a.active");
    if (activeItem) {
      setSelectorStyle({
        left: activeItem.offsetLeft + "px",
        width: activeItem.offsetWidth + "px",
      });
    }
  }, [activeTab]);

  return (
    <nav className="tabs">
      <div className="selector" style={selectorStyle}></div>
      {tabs.map((tab, index) => (
        <a
          href="#"
          key={index}
          className={activeTab === index ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            onTabClick(index);
          }}
        >
          {tab.title}
        </a>
      ))}
    </nav>
  );
};

export default Tabs;
