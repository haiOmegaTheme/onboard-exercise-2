import { useEffect, useState } from "react";

interface TabToggleProps {
  tabs: string[];
}

const TabToggle = ({ tabs }: TabToggleProps) => {
  const [selected, setSelected] = useState(0);

  const tabWidth = 100 / tabs.length;

  useEffect(() => {
    const demo = document.querySelector(".demo-selected");
    console.log("demo", demo);
    console.log("test>>>", demo?.clientWidth);
  }, []);

  return (
    <div className="relative flex flex-1 gap-1 rounded-full bg-gray-100 p-1 text-gray-500 mt-4">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`flex-1 rounded-full px-6 py-[8px] text-[11px] phone:text-[16px]  relative z-[1] ${
            index === selected ? "demo-selected" : ""
          }`}
          onClick={() => setSelected(index)}
        >
          {tab}
        </button>
      ))}
      <div
        style={{
          width: `calc(${tabWidth}% - 8px)`,
          height: "calc(100% - 8px)",
          position: "absolute",
          left: `calc(${tabs.indexOf(
            tabs?.[selected] ?? ""
          )} * ${tabWidth}% + 4px)`,
          zIndex: 0,
          top: "4px",
        }}
        className="rounded-full bg-white transition-all duration-700 shadow"
      />
    </div>
  );
};

export default TabToggle;
