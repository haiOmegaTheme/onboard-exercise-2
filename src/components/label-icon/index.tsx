import { Icon, IconSource } from "@shopify/polaris";
import { twMerge } from "tailwind-merge";

type Props = {
  icon: IconSource;
  label: string;
  className?: string;
};

export const LabelIcon = ({ icon, label, className }: Props) => {
  return (
    <div className={twMerge("flex items-center", className ?? "")}>
      <div>
        <Icon source={icon} tone="inherit" />
      </div>
      <div className="ml-1">{label}</div>
    </div>
  );
};
