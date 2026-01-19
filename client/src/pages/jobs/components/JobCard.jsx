    import React from "react";
import { Bookmark } from "lucide-react";

const JobCard = ({ job, isSelected, onClick, onSave, isSaved }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
          {job?.title?.[0] || "J"}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-extrabold text-slate-900 text-[15px] truncate">
            {job.title}
          </h4>

          <p className="text-xs text-slate-500 font-medium truncate mt-1">
            {job.location} • {job.jobType}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          className={`p-2 rounded-xl border transition ${
            isSaved
              ? "border-blue-600 text-blue-600 bg-blue-50"
              : "border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Bookmark size={18} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
          {job.salary || "Not disclosed"}
        </span>

        <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
          {job.experienceRequired || "0-2 yrs"}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
