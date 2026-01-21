import React from "react";
import { LayoutGrid, Send, Bookmark } from "lucide-react";

const SidebarTabs = ({ activeTab, setActiveTab, savedCount, appliedCount }) => {
  return (
    <aside className="w-full lg:w-72 bg-white dark:bg-[#0F1117] border-r border-slate-200 dark:border-white/10 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
      
      <div className="mb-4 hidden lg:block">
        <p className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          Dashboard
        </p>
      </div>

      <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
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

const TabButton = ({ active, icon, label, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-200 border
        ${
          active
            ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-blue-600/15"
            : "bg-transparent text-slate-700 dark:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-white/5"
        }
      `}
    >
      
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
            ${
              active
                ? "bg-white/15 text-white"
                : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
            }
          `}
        >
          {icon}
        </div>

        <span
          className={`text-sm font-semibold tracking-tight truncate
            ${
              active
                ? "text-white"
                : "text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
            }
          `}
        >
          {label}
        </span>
      </div>

      
      {typeof count === "number" && count > 0 && (
        <span
          className={`text-[11px] px-2.5 py-1 rounded-full font-bold shrink-0
            ${
              active
                ? "bg-white/20 text-white"
                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-200"
            }
          `}
        >
          {count}
        </span>
      )}
    </button>
  );
};
