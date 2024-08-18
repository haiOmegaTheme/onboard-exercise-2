import { useEffect, useRef, useState } from "react";
import "./style.scss";

export const ATabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectorStyle, setSelectorStyle] = useState({});
  const tabsRef = useRef<any>(null);

  const tabs = [
    { icon: "fab fa-superpowers", id: 1, label: "Avengers" },
    { icon: "fas fa-hand-rock", id: 2, label: "Hulk" },
    { icon: "fas fa-bolt", id: 3, label: "Thor larger than other" },
    { icon: "fas fa-burn", id: 4, label: "Marvel" },
  ];

  useEffect(() => {
    const updateSelectorStyle = () => {
      if (tabsRef.current) {
        const activeItem = tabsRef.current.children[activeTab];
        setSelectorStyle({
          left: activeItem.offsetLeft + "px",
          width: activeItem.offsetWidth + "px",
        });
      }
    };

    updateSelectorStyle();
    window.addEventListener("resize", updateSelectorStyle);

    return () => {
      window.removeEventListener("resize", updateSelectorStyle);
    };
  }, [activeTab]);

  const handleSelectTab = (tab: any, index: number) => {
    console.log(`Selected tab: ${tab.label}`, ">>>>", index);
  };

  return (
    <div className="wrapper">
      {/* <div className="tabs" ref={tabsRef}>
        <div className="selector" style={selectorStyle}></div>
        {tabs.map((tab, index) => (
          <button
            key={tab?.id}
            className={activeTab === index ? "active" : ""}
            onClick={() => {
              handleSelectTab(tab, index);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div> */}
    </div>
  );
};
