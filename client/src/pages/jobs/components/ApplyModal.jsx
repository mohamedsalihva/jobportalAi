import React, { useEffect, useState } from "react";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { createPortal } from "react-dom";
import api from "../../../api/axios";
import Toast from "../../../components/ui/Toast";
import { API } from "../../../constants/apiEndpoints";
import { useNavigate } from "react-router-dom";

const ApplyModal = ({ open, onClose, job, user }) => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const hasResume = Boolean(user?.resumePath);
  const [resumeExists, setResumeExists] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) =>
    setToast({ show: true, type, message });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => {
    if (open) {
      setAiResult(null);
      setChecking(false);
      setSubmitting(false);
      setResumeExists(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!hasResume) {
      setResumeExists(false);
      return;
    }

    const baseUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(
      /\/api\/?$/,
      ""
    );
    const resumeUrl = `${baseUrl}/${user.resumePath}`;
    const controller = new AbortController();

    const checkResume = async () => {
      try {
        const res = await fetch(resumeUrl, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });
        setResumeExists(res.ok);
      } catch (err) {
        if (err.name !== "AbortError") setResumeExists(false);
      }
    };

    checkResume();

    return () => controller.abort();
  }, [open, hasResume, user?.resumePath]);

  if (!open) return null;

  /* ---------- AI SCORE ---------- */
  const handleCheckScore = async () => {
    if (!job?._id) return showToast("error", "Job not found");

    if (!hasResume || resumeExists === false) {
      showToast("error", "Resume file missing. Please reupload in profile.");
      setTimeout(() => navigate("/profile"), 800);
      return;
    }

    try {
      setChecking(true);
      const res = await api.post(API.AI.RESUME_SCORE(job._id));
      setAiResult(res.data);
      showToast("success", "ATS score generated");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Score check failed");
    } finally {
      setChecking(false);
    }
  };

  /* ---------- APPLY ---------- */
  const handleSubmitApplication = async () => {
    if (!job?._id) return showToast("error", "Job not found");

    if (!hasResume || resumeExists === false) {
      showToast("error", "Resume file missing. Please reupload in profile.");
      setTimeout(() => navigate("/profile"), 800);
      return;
    }

    try {
      setSubmitting(true);
      await api.post(API.APPLICATIONS.APPLY(job._id));
      showToast("success", "Application submitted");
      setTimeout(onClose, 800);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Apply failed");
    } finally {
      setSubmitting(false);
    }
  };

  const score = Math.min(100, Math.max(0, aiResult?.score || 0));

  return createPortal(
    <>
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((p) => ({ ...p, show: false }))}
      />

      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl bg-white dark:bg-[#111218] rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start p-6 border-b dark:border-white/10">
            <div>
              <h2 className="text-xl font-bold">Confirm Application</h2>
              <p className="text-sm text-slate-500 mt-1">
                Review job details and resume compatibility
              </p>
            </div>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
            <div className="space-y-4">
              <h3 className="font-bold text-lg">{job?.title}</h3>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {job?.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase size={16} /> {job?.jobType}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> {job?.experienceRequired}
                </span>
                <span className="flex items-center gap-2">
                  <IndianRupee size={16} /> {job?.salary || "Not disclosed"}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold">Job Description</p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {job?.description}
                </p>
              </div>
            </div>

            {/* RESUME + AI */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border dark:border-white/10">
                <p className="font-semibold mb-2">Resume Status</p>

                {hasResume && resumeExists !== false ? (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle size={18} />
                    {resumeExists === null ? "Checking resume..." : "Resume uploaded"}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertTriangle size={18} />
                    Resume not uploaded
                  </div>
                )}
              </div>

              {aiResult && (
                <div className="p-4 rounded-2xl border dark:border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">
                      ATS Match Score: {score}/100
                    </p>
                    <span
                      className={`text-sm font-semibold ${
                        score >= 75
                          ? "text-emerald-600"
                          : score >= 50
                          ? "text-yellow-600"
                          : "text-red-500"
                      }`}
                    >
                      {score >= 75
                        ? "Strong Match"
                        : score >= 50
                        ? "Moderate Match"
                        : "Low Match"}
                    </span>
                  </div>

                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        score >= 75
                          ? "bg-emerald-500"
                          : score >= 50
                          ? "bg-yellow-400"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold">Matched Skills</p>
                      <p className="text-slate-600">
                        {aiResult.matchedSkills?.join(", ") || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">Missing Skills</p>
                      <p className="text-slate-600">
                        {aiResult.missingSkills?.join(", ") || "None 🎉"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700">
                    <b>Feedback:</b> {aiResult.feedback}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 border-t dark:border-white/10 flex justify-end gap-3">
            <button
              onClick={handleCheckScore}
              disabled={checking || submitting}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold"
            >
              {checking ? "Checking..." : "Check Resume Score"}
            </button>

            <button
              onClick={handleSubmitApplication}
              disabled={checking || submitting}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-semibold"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ApplyModal;
