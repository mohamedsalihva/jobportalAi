import React from "react";

const SuccessModal = ({ open, onClose, onViewApplications }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <h2 className="text-lg font-extrabold text-slate-900">
           Application Submitted
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          Your application was submitted successfully.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
          >
            Close
          </button>

          <button
            onClick={onViewApplications}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
