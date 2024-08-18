import { ACard } from "@/components/ACard";
import { BTabs } from "@/components/BTabs";
import { DemoTabs } from "@/components/dem-tabs";
import WorkspaceToggle from "@/components/DemoToggle";
import DTabs from "@/components/DTabs";
import { useState } from "react";

type Tabs = {
  id: number;
  label: string;
};

type Feature = {
  id: number;
  label: string;
  active: boolean;
};

export type Plan = {
  id: number;
  title: string;
  price: number;
  features: Feature[];
};

export default function DemoPage() {
  const tabsItem = [
    { id: 1, label: "Monthly" },
    { id: 2, label: "Annual larger than other" },
  ];

  const demo = ["Monthly", "Annual larger than other"];
  const [selectedTab, setSelectedTab] = useState(1);
  const handleSelectTab = (tab: Tabs) => {
    setSelectedTab(tab.id);
  };

  const monthlyPlans: Plan[] = [
    {
      id: 1,
      title: "Free",
      price: 0,
      features: [
        { id: 1, label: "2 team members", active: true },
        { id: 2, label: "20GB Cloud storage", active: true },
        { id: 3, label: "Basic support", active: true },
        { id: 4, label: "Weekly backups", active: false },
        { id: 5, label: "Limited analytics", active: false },
      ],
    },
    {
      id: 2,
      title: "Pro",
      price: 10,
      features: [
        { id: 1, label: "10 team members", active: true },
        { id: 2, label: "100GB Cloud storage", active: true },
        { id: 3, label: "Priority email support", active: true },
        { id: 4, label: "Custom domain support", active: true },
        { id: 5, label: "Daily backups", active: true },
      ],
    },
    {
      id: 3,
      title: "Enterprise",
      price: 30,
      features: [
        { id: 1, label: "Unlimited team members", active: true },
        { id: 2, label: "1TB Cloud storage", active: true },
        { id: 3, label: "Dedicated account manager", active: true },
        { id: 4, label: "Hourly backups", active: true },
        { id: 5, label: "Full analytics and reporting", active: true },
      ],
    },
  ];

  const annualPlans: Plan[] = [
    {
      id: 1,
      title: "Free",
      price: 0,
      features: [
        { id: 1, label: "2 team members", active: true },
        { id: 2, label: "20GB Cloud storage", active: true },
        { id: 3, label: "Basic support", active: true },
        { id: 4, label: "Weekly backups", active: false },
        { id: 5, label: "Limited analytics", active: false },
      ],
    },
    {
      id: 2,
      title: "Pro",
      price: 100,
      features: [
        { id: 1, label: "10 team members", active: true },
        { id: 2, label: "100GB Cloud storage", active: true },
        { id: 3, label: "Priority email support", active: true },
        { id: 4, label: "Custom domain support", active: true },
        { id: 5, label: "Daily backups", active: true },
      ],
    },
    {
      id: 3,
      title: "Enterprise",
      price: 300,
      features: [
        { id: 1, label: "Unlimited team members", active: true },
        { id: 2, label: "1TB Cloud storage", active: true },
        { id: 3, label: "Dedicated account manager", active: true },
        { id: 4, label: "Hourly backups", active: true },
        { id: 5, label: "Full analytics and reporting", active: true },
      ],
    },
  ];

  const currentPlans = selectedTab === 1 ? monthlyPlans : annualPlans;

  return (
    <div className="flex flex-col h-dvh bg-secondary">
      <div className="flex items-center justify-between py-2 px-5 bg-black h-[40px]"></div>
      <div className="overflow-y-scroll flex-1 mt-7">
        <div className="flex flex-col items-center">
          <div className="font-bold text-xl">Choose your plan</div>
          <div className="mt-2.5">
            Only pay for Visor users that need to edit.
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[412px]">
            <BTabs />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[412px]">
            <WorkspaceToggle tabs={demo} />
          </div>
        </div>
        <div className="flex justify-center">
          <DTabs />
        </div>
        <div className=" max-w-full mx-auto mt-5">
          <DemoTabs
            tabs={tabsItem}
            selectedTab={selectedTab}
            onTabSelected={handleSelectTab}
          />
          <div
            className="flex gap-5 justify-center mt-7
          "
          >
            {currentPlans.map((plan) => (
              <ACard plan={plan} key={plan.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
