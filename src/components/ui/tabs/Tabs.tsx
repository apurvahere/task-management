import clsx from "clsx";

type TabItem = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
};

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            "px-4 py-2 text-sm font-medium border-b-2 transition-colors uppercase whitespace-nowrap",
            activeTab === tab.value
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
