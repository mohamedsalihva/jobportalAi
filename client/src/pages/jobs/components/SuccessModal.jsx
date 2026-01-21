import React from "react";

const SuccessModal = ({ open, onClose, onViewApplications }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#111218] rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-6">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
           Application Submitted
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Your application was submitted successfully.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 font-extrabold hover:bg-slate-200 dark:hover:bg-white/10 transition"
          >
            Close
          </button>

          <button
            onClick={onViewApplications}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
