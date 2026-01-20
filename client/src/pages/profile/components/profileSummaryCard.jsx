import React from "react";

const ProfileSummaryCard = ({ summary }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-lg font-extrabold text-slate-900">Summary</h2>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
        {summary || "Add a summary to describe your profile professionally."}
      </p>
    </div>
  );
};

export default ProfileSummaryCard;
