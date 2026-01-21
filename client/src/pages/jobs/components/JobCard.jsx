import React from "react";
import { Bookmark, MapPin, Briefcase } from "lucide-react";

const JobCard = ({
  job,
  isSelected,
  onClick,
  onSave,
  isSaved,
  appliedStatus,
}) => {
  const getStatusStyle = (status) => {
    if (status === "shortlisted") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20";
    }
    if (status === "rejected") {
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20";
    }
    return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-200 dark:border-white/10";
  };

  return (
    <div
      onClick={onClick}
      className={`group p-4 rounded-3xl border transition-all cursor-pointer
      bg-white dark:bg-[#0F1117]
      ${
        isSelected
          ? "border-amber-500 ring-2 ring-amber-500/20 shadow-sm"
          : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
      }`}
    >
      <div className="flex items-start gap-4">
        
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0
          ${
            isSelected
              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
          }`}
        >
          {(job?.title?.[0] || "J").toUpperCase()}
        </div>

        
        <div className="flex-1 min-w-0">
          
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-[16px] font-semibold tracking-tight text-slate-900 dark:text-white truncate">
                  {job?.title || "Job Title"}
                </h4>

                {appliedStatus && (
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(
                      appliedStatus
                    )}`}
                  >
                    {appliedStatus.toUpperCase()}
                  </span>
                )}
              </div>

             
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] font-medium text-slate-500 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5 truncate">
                  <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                  {job?.location || "Location"}
                </span>

                <span className="inline-flex items-center gap-1.5 truncate">
                  <Briefcase
                    size={14}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  {job?.jobType || "Job Type"}
                </span>
              </div>
            </div>

            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className={`p-2.5 rounded-2xl border transition-all
              ${
                isSaved
                  ? "border-amber-500 text-amber-600 bg-amber-500/10 dark:text-amber-400"
                  : "border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-300 hover:text-amber-500 hover:border-amber-500/40 hover:bg-amber-500/10"
              }`}
            >
              <Bookmark size={18} />
            </button>
          </div>

          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10">
              {job?.salary || "Not disclosed"}
            </span>

            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              {job?.experienceRequired || "0-2 yrs"}
            </span>

            {job?.workMode && (
              <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10">
                {job.workMode}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
