import React, { useEffect } from "react";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";
import { createPortal } from "react-dom";

const ApplyModal = ({ open, onClose, job, user, onSubmit }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-3"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-white/10">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Application review
            </p>

            <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Confirm your application
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              You’re about to apply for{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {job?.title || "Job"}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition"
          >
            <X size={18} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>

       
        <div className="px-6 py-6 space-y-5">
          
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#0B0B0F]/30">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Job details
                </p>

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white truncate">
                  {job?.title || "Job Title"}
                </h3>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {job?.location || "Location"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {job?.jobType || "Job Type"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {job?.salary || "Not disclosed"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      Exp: {job?.experienceRequired || "0-2 Years"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {job?.workMode || "Onsite"}
                    </span>
                  </div>
                </div>
              </div>

              
              <div className="shrink-0">
                <div className="px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-500/25">
                  Quick Apply
                </div>
              </div>
            </div>
          </div>

          
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-slate-50 dark:bg-[#0B0B0F]/40">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Applicant info
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center text-black font-bold">
                {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          </div>

          
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3">
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              After applying, the recruiter can review your profile and the
              application status will appear in <b>My Applications</b>.
            </p>
          </div>
        </div>

        
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Tip: Keep your profile updated for better chances.
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="px-6 py-2.5 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ApplyModal;
