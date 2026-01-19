import React from "react";
import { Bookmark } from "lucide-react";

const JobDetails = ({ job, isSaved, onSave, isApplied, onApply }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">{job.title}</h2>

          <p className="text-sm text-slate-600 font-semibold mt-1">
            {job.location} • {job.jobType} • {job.workMode}
          </p>

          <p className="text-sm text-slate-500 mt-2">
            💰 {job.salary} • 🧑‍💻 {job.experienceRequired}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onSave}
            className={`px-4 py-2 rounded-xl border font-bold text-sm transition ${
              isSaved
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2 justify-center">
              <Bookmark size={16} />
              {isSaved ? "Saved" : "Save"}
            </span>
          </button>

          <button
            disabled={isApplied}
            onClick={onApply}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
              isApplied
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Section title="Job Description">
          <p className="text-slate-600 text-sm leading-relaxed">
            {job.description}
          </p>
        </Section>

        {job.skills?.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {job.requirements?.length > 0 && (
          <Section title="Requirements">
            <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc list-inside">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {job.responsibilities?.length > 0 && (
          <Section title="Responsibilities">
            <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc list-inside">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {job.benefits?.length > 0 && (
          <Section title="Benefits">
            <div className="flex flex-wrap gap-2 mt-2">
              {job.benefits.map((item, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default JobDetails;

const Section = ({ title, children }) => (
  <div>
    <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
    <div className="mt-2">{children}</div>
  </div>
);
