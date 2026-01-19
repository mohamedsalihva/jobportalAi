import React, { useEffect } from "react";
import { X, Briefcase, MapPin, Clock, IndianRupee, CheckCircle2 } from "lucide-react";
import { createPortal } from "react-dom";

const ApplyModal = ({ open, onClose, job, user, onSubmit }) => {
  
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-3"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-start justify-between px-6 py-5 border-b bg-white">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Application review
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-gray-900">
              Confirm your application
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              You’re about to apply for{" "}
              <span className="font-semibold text-gray-900">
                {job?.title || "Job"}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        
        <div className="px-6 py-6 space-y-5">
          
          <div className="border border-gray-200 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Job details
                </p>

                <h3 className="mt-2 text-lg font-extrabold text-gray-900 truncate">
                  {job?.title || "Job Title"}
                </h3>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      {job?.location || "Location"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      {job?.jobType || "Job Type"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      {job?.salary || "Not disclosed"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      Exp: {job?.experienceRequired || "0-2 Years"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      {job?.workMode || "Onsite"}
                    </span>
                  </div>
                </div>
              </div>

              
              <div className="shrink-0">
                <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  Quick Apply
                </div>
              </div>
            </div>
          </div>

         
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Applicant info
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold">
                {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="font-extrabold text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          </div>

          
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-sm text-blue-800 font-semibold">
              After applying, the recruiter can review your profile and application status
              will appear in <b>My Applications</b>.
            </p>
          </div>
        </div>


        <div className="px-6 py-4 border-t bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-gray-400 font-semibold">
            Tip: Keep your profile updated for better chances.
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition shadow-md shadow-blue-100"
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
