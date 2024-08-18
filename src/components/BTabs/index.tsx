import { useState } from "react";
import "./style.scss";

export const BTabs = () => {
  const [activeTab, setActiveTab] = useState("left");

  const handleClick = (direction: any) => {
    if (direction !== activeTab) {
      setActiveTab(direction);
    }
  };

  return (
    <main>
      <h1 className="text-center">Tab Switch</h1>

      <div className={`wrapper`}>
        <div className={`taeb-switch ${activeTab} text-center`}>
          <button
            className={`taeb ${activeTab === "left" ? "active" : ""}`}
            onClick={() => handleClick("left")}
          >
            List
          </button>
          <button
            className={`taeb ${activeTab === "right" ? "active" : ""}`}
            onClick={() => handleClick("right")}
          >
            larger than other
          </button>
        </div>
      </div>
    </main>
  );
};
