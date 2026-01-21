import React from "react";

const ProfileSummaryCard = ({ summary }) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
        Summary
      </h2>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
        {summary || "Add a summary to describe your profile professionally."}
      </p>
    </div>
  );
};

export default ProfileSummaryCard;
