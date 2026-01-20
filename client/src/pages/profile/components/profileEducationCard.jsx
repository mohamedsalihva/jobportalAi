import React from "react";

const ProfileEducationCard = ({ education }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-lg font-extrabold text-slate-900">Education</h2>

      {education?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {education.map((edu, idx) => (
            <div key={idx} className="border rounded-xl p-4 bg-slate-50">
              <p className="font-bold text-slate-900">{edu.degree}</p>
              <p className="text-sm text-slate-600 font-semibold">
                {edu.institution}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 mt-3">No education added yet.</p>
      )}
    </div>
  );
};

export default ProfileEducationCard;
