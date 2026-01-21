import React from "react";

const ProfileSkillsCard = ({ skills }) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
        Skills
      </h2>

      {skills?.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-extrabold px-3 py-1 rounded-full
              bg-amber-500/10 text-amber-700 border border-amber-500/20
              dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
          Add skills like React, Node.js, MongoDB...
        </p>
      )}
    </div>
  );
};

export default ProfileSkillsCard;
