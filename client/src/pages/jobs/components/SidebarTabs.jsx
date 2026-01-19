import React from "react";
import { LayoutGrid, Send, Bookmark } from "lucide-react";

const SidebarTabs = ({ activeTab, setActiveTab, savedCount, appliedCount }) => {
  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
      <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        <TabButton
          active={activeTab === "explore"}
          onClick={() => setActiveTab("explore")}
          icon={<LayoutGrid size={18} />}
          label="Explore Jobs"
        />
        <TabButton
          active={activeTab === "applied"}
          onClick={() => setActiveTab("applied")}
          icon={<Send size={18} />}
          label="My Applications"
          count={appliedCount}
        />
        <TabButton
          active={activeTab === "saved"}
          onClick={() => setActiveTab("saved")}
          icon={<Bookmark size={18} />}
          label="Saved Jobs"
          count={savedCount}
        />
      </div>
    </aside>
  );
};

export default SidebarTabs;

const TabButton = ({ active, icon, label, onClick, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </div>

    {typeof count === "number" && count > 0 && !active && (
      <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-bold">
        {count}
      </span>
    )}
  </button>
);
