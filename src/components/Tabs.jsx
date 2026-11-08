
const tabs = [
  { label: "History" },
  { label: "Compare" },
  { label: "Favorites", count: 10 },
  { label: "Log", count: 8 },
];

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-6 sm:gap-8 border-b border-[#292929] overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.label;

        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onTabChange(tab.label)}
            className={`flex shrink-0 items-center gap-1.5
              pb-3 text-sm tracking-[0.15em]
              transition-colors border-b-2
              ${
                isActive
                  ? "text-white border-[#CEF739]"
                  : "text-[#A3A3A3] border-transparent hover:text-white"
              }`}
          >
            <span>{tab.label.toUpperCase()}</span>

            {tab.count !== undefined && (
              <span className="rounded-full bg-[#26320C]
                px-1.5 py-0.5 text-[10px] leading-none
                text-[#CEF739] tracking-normal">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
