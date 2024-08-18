import { useState } from "react";

interface TabToggleProps {
  tabs: string[];
}

const TabToggle = ({ tabs }: TabToggleProps) => {
  const [selected, setSelected] = useState(tabs[0]);

  const tabWidth = 100 / tabs.length;

  return (
    <div className="relative flex flex-1 gap-1 rounded-full bg-gray-100 p-1 font-sfpro phone:flex-initial mt-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 rounded-full px-6 py-[8px] text-[11px] phone:text-[16px] text-gray-500 relative z-[1] ${
            selected === tab ? "opacity-100" : "opacity-60"
          } hover:opacity-100`}
          onClick={() => setSelected(tab)}
        >
          {tab}
        </button>
      ))}
      <div
        style={{
          width: `calc(${tabWidth}% - 8px)`,
          height: "calc(100% - 8px)",
          position: "absolute",
          left: `calc(${tabs.indexOf(selected)} * ${tabWidth}% + 4px)`,
          zIndex: 0,
          top: "4px",
        }}
        className="rounded-full bg-white transition-all duration-500 shadow"
      />
    </div>
  );
};

export default TabToggle;
