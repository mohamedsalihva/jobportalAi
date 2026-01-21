import React from "react";

const ProfileExperienceCard = ({ experience }) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
        Experience
      </h2>

      {experience?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-white/10 rounded-2xl p-5 
              bg-slate-50 dark:bg-[#0B0B0F]/40"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-extrabold text-slate-900 dark:text-white">
                  {exp.title || "Role"}
                </p>

                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full 
                bg-amber-500/10 text-amber-700 border border-amber-500/20
                dark:text-amber-300">
                  {exp.isCurrent ? "Current" : "Past"}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
                {exp.company || "Company"}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {exp.startDate || "Start"} -{" "}
                {exp.isCurrent ? "Present" : exp.endDate || "End"}
              </p>

              {exp.description && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
          No experience added yet.
        </p>
      )}
    </div>
  );
};

export default ProfileExperienceCard;
