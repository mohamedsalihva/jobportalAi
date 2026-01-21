import React from "react";

const ProfileEducationCard = ({ education }) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Education
        </h2>

        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400">
          Verified Section
        </span>
      </div>

      {education?.length > 0 ? (
        <div className="mt-5 space-y-4">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0B0F]/40 p-5"
            >
              <p className="font-extrabold text-slate-900 dark:text-white">
                {edu.degree || "Degree"}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
                {edu.institution || "Institution"}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-semibold">
                {edu.startYear || "Start"} - {edu.endYear || "End"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold">
            No education added yet.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add your college / degree details to strengthen your profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileEducationCard;
