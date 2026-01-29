import { X, MapPin, Briefcase, Clock, IndianRupee } from "lucide-react";

const MobileJobSheet = ({ open, onClose, job, onApply, isApplied }) => {
  if (!open || !job) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

     
      <div className="absolute bottom-0 left-0 right-0 h-[90vh] bg-white dark:bg-[#0B0B0F] rounded-t-3xl shadow-xl flex flex-col">
        
        
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h2 className="font-bold text-lg leading-tight">
              {job.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {job.companyName}
            </p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {job.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location}
              </div>
            )}

            {job.employmentType && (
              <div className="flex items-center gap-1">
                <Briefcase size={14} />
                {job.employmentType}
              </div>
            )}

            {job.experience && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {job.experience}
              </div>
            )}

            {(job.salaryMin || job.salaryMax) && (
              <div className="flex items-center gap-1">
                <IndianRupee size={14} />
                {job.salaryMin} - {job.salaryMax}
              </div>
            )}
          </div>

          
          {job.description && (
            <section>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-sm text-slate-600 whitespace-pre-line">
                {job.description}
              </p>
            </section>
          )}

          
          {job.responsibilities && (
            <section>
              <h3 className="font-semibold mb-2">Responsibilities</h3>
              <p className="text-sm text-slate-600 whitespace-pre-line">
                {job.responsibilities}
              </p>
            </section>
          )}

          
          {job.requirements && (
            <section>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <p className="text-sm text-slate-600 whitespace-pre-line">
                {job.requirements}
              </p>
            </section>
          )}

          
          {job.skills?.length > 0 && (
            <section>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {job.companyDescription && (
            <section>
              <h3 className="font-semibold mb-2">About Company</h3>
              <p className="text-sm text-slate-600 whitespace-pre-line">
                {job.companyDescription}
              </p>
            </section>
          )}
        </div>

      
        <div className="p-4 border-t bg-white dark:bg-[#0B0B0F]">
          <button
            disabled={isApplied}
            onClick={onApply}
            className={`w-full py-3 rounded-xl font-bold ${
              isApplied
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-400"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileJobSheet;
