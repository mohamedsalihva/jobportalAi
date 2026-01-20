import React from "react";

const ProfileExperienceCard = ({ experience }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-lg font-extrabold text-slate-900">Experience</h2>

      {experience?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="border rounded-xl p-4 bg-slate-50">
              <p className="font-bold text-slate-900">{exp.title}</p>
              <p className="text-sm text-slate-600 font-semibold">
                {exp.company}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
              </p>
              {exp.description && (
                <p className="text-sm text-slate-600 mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 mt-3">
          No experience added yet.
        </p>
      )}
    </div>
  );
};

export default ProfileExperienceCard;
