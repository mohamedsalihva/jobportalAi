import React from "react";

const profileSkillsCard = ({ skills }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-lg font-extrabold text-slate-900">Skills</h2>

      {skills?.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 mt-3">
          Add skills like React, Node.js, MongoDB...
        </p>
      )}
    </div>
  );
};

export default profileSkillsCard;
