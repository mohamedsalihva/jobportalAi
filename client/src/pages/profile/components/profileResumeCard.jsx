import React from "react";
import { ExternalLink } from "lucide-react";

const ProfileResumeCard = ({ resumeUrl }) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
        Resume
      </h2>

      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-amber-600 dark:text-amber-300 font-extrabold hover:underline"
        >
          View Resume <ExternalLink size={16} />
        </a>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
          Add your resume link (Google Drive / PDF URL).
        </p>
      )}
    </div>
  );
};

export default ProfileResumeCard;
