import React from "react";
import { ExternalLink } from "lucide-react";

const ProfileResumeCard = ({ resumeUrl }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-lg font-extrabold text-slate-900">Resume</h2>

      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
        >
          View Resume <ExternalLink size={16} />
        </a>
      ) : (
        <p className="text-sm text-slate-600 mt-3">
          Add your resume link (Google Drive / PDF URL).
        </p>
      )}
    </div>
  );
};

export default ProfileResumeCard;
