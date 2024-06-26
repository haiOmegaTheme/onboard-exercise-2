import { twMerge } from "tailwind-merge";

interface TabProps {
  label: string;
  onClick: () => void;
  active: boolean;
}

export const Tab = ({ label, onClick, active }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "py-2 px-4 border-b-4 transition- border-light-gray duration-300 w-full font-semibold text-md",
        active ? "border-pink text-pink" : "border-light-gray"
      )}
    >
      {label}
    </button>
  );
};
