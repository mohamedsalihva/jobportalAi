import React from "react";
import { Bookmark, MapPin, Briefcase, Clock, IndianRupee } from "lucide-react";

const JobDetails = ({ job, isSaved, onSave, isApplied, onApply }) => {
  if (!job) return null;

  return (
    <div className="bg-white dark:bg-[#0F1117] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
      
      <div className="p-6 border-b border-slate-100 dark:border-white/10">
        <div className="flex items-start justify-between gap-4">
          
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
              Job Details
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white truncate">
              {job.title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
                {job.location}
              </span>

              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">
                •
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Briefcase
                  size={16}
                  className="text-slate-400 dark:text-slate-500"
                />
                {job.jobType}
              </span>

              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">
                •
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock size={16} className="text-slate-400 dark:text-slate-500" />
                {job.workMode}
              </span>
            </div>

            
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag icon={<IndianRupee size={14} />} text={job.salary || "Not disclosed"} />
              <Tag text={`Experience: ${job.experienceRequired || "0-2 yrs"}`} />
              {job.languages?.length > 0 && (
                <Tag text={`Languages: ${job.languages.slice(0, 2).join(", ")}`} />
              )}
            </div>
          </div>

          
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={onSave}
              className={`px-4 py-2.5 rounded-2xl border font-semibold text-sm transition flex items-center justify-center gap-2
              ${
                isSaved
                  ? "border-amber-500 text-amber-600 bg-amber-500/10 dark:text-amber-400"
                  : "border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <Bookmark size={16} />
              {isSaved ? "Saved" : "Save"}
            </button>

            <button
              disabled={isApplied}
              onClick={onApply}
              className={`px-4 py-2.5 rounded-2xl font-semibold text-sm transition
              ${
                isApplied
                  ? "bg-emerald-600 text-white cursor-not-allowed opacity-90"
                  : "bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20"
              }`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          </div>
        </div>
      </div>

      
      <div className="p-6 space-y-8">
        
        <Section title="Job Description">
          <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
            {job.description}
          </p>
        </Section>

       
        {job.skills?.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        
        {job.requirements?.length > 0 && (
          <Section title="Requirements">
            <ul className="space-y-2 text-[15px] text-slate-700 dark:text-slate-300 list-disc list-inside">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {job.responsibilities?.length > 0 && (
          <Section title="Responsibilities">
            <ul className="space-y-2 text-[15px] text-slate-700 dark:text-slate-300 list-disc list-inside">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {job.benefits?.length > 0 && (
          <Section title="Benefits">
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((item, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20"
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
    <h5 className="text-[13px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
      {title}
    </h5>
    <div className="mt-3">{children}</div>
  </div>
);


const Tag = ({ text, icon }) => {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10">
      {icon ? <span className="text-slate-400 dark:text-slate-500">{icon}</span> : null}
      {text}
    </span>
  );
};
