import React, { useEffect, useState } from "react";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";
import { createPortal } from "react-dom";
import api from "../../../api/axios";
import Toast from "../../../components/ui/Toast";
import { API } from "../../../constants/apiEndpoints";

const ApplyModal = ({ open, onClose, job, user }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => {
    if (open) {
      setResumeFile(null);
      setAiResult(null);
      setChecking(false);
      setSubmitting(false);
      setToast({ show: false, type: "success", message: "" });
    }
  }, [open]);

  if (!open) return null;

  

  const handleCheckScore = async () => {
    if (!job?._id) return showToast("error", "Job not found!");
    if (!resumeFile)
      return showToast("error", "Please upload your resume (PDF/DOCX)");

    try {
      setChecking(true);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await api.post(API.AI.RESUME_SCORE(job._id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAiResult(res.data);
      showToast("success", "Resume score generated ");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Score check failed");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!job?._id) return showToast("error", "Job not found!");
    if (!resumeFile)
      return showToast("error", "Please upload your resume (PDF/DOCX)");

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      await api.post(API.APPLICATIONS.APPLY(job._id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("success", "Applied successfully");

      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Apply failed");
    } finally {
      setSubmitting(false);
    }
  };
  const clamp = (n) => Math.max(0, Math.min(100, Number(n || 0)));

  const getScoreTheme = (score) => {
    const s = clamp(score);

    if (s >= 75) {
      return {
        label: "Strong Match ✅",
        badge: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
        bar: "bg-emerald-400",
        card: "border-emerald-500/25 bg-emerald-500/10",
        text: "text-emerald-300",
      };
    }
    if (s >= 50) {
      return {
        label: "Moderate Match ⚡",
        badge: "bg-yellow-500/15 text-yellow-200 border-yellow-500/30",
        bar: "bg-yellow-400",
        card: "border-yellow-500/25 bg-yellow-500/10",
        text: "text-yellow-300",
      };
    }
    return {
      label: "Low Match ❌",
      badge: "bg-red-500/15 text-red-200 border-red-500/30",
      bar: "bg-red-400",
      card: "border-red-500/25 bg-red-500/10",
      text: "text-red-300",
    };
  };

  return createPortal(
    <>
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-3 sm:px-6"
        onClick={onClose}
      >
        <div
          className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-white/10 shrink-0">
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

          <div className="px-6 py-6 space-y-5 overflow-y-auto flex-1">
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

            {/* Resume upload */}

            <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#0B0B0F]/30">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Upload Resume
              </p>

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="mt-3 w-full border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2 text-sm bg-white dark:bg-[#111218] dark:text-white"
              />

              {resumeFile && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  Selected: <b>{resumeFile.name}</b>
                </p>
              )}
            </div>

            {/* ai score result*/}

            {aiResult &&
              (() => {
                const theme = getScoreTheme(aiResult.score);
                const score = clamp(aiResult.score);

                return (
                  <div className={`rounded-2xl border p-5 ${theme.card}`}>
                    
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          AI Resume Analysis
                        </p>

                        <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                          ATS Match Score:{" "}
                          <span className={`${theme.text}`}>{score}/100</span>
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {theme.label}
                        </p>
                      </div>

                      <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
                        <div
                          className={`px-4 py-2 rounded-full text-xs font-bold border ${theme.badge}`}
                        >
                          ATS Compatibility
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Matched: <b>{aiResult.matchedSkills?.length || 0}</b>{" "}
                          • Missing:{" "}
                          <b>{aiResult.missingSkills?.length || 0}</b>
                        </p>
                      </div>
                    </div>

                    
                    
                    <div className="mt-4">
                      <div className="w-full h-3 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${theme.bar} transition-all`}
                          style={{ width: `${score}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        Keyword Match: <b>{score}%</b> • Tip: Add missing skills
                        in Projects section
                      </p>
                    </div>

                    
                    
                    <div className="mt-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4">
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        <b className="text-slate-900 dark:text-white">
                          Feedback:
                        </b>{" "}
                        {aiResult.feedback}
                      </p>
                    </div>

                    
                    
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      
                      <div className="rounded-xl bg-white/40 dark:bg-black/20 border border-slate-200 dark:border-white/10 p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 dark:text-white">
                             Matched Skills
                          </p>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {aiResult.matchedSkills?.length || 0}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {(aiResult.matchedSkills || [])
                            .slice(0, 14)
                            .map((s, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border border-emerald-500/25"
                              >
                                {s}
                              </span>
                            ))}

                          {(aiResult.matchedSkills || []).length === 0 && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              No matched skills detected.
                            </p>
                          )}
                        </div>
                      </div>

                      
                      
                      <div className="rounded-xl bg-white/40 dark:bg-black/20 border border-slate-200 dark:border-white/10 p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 dark:text-white">
                             Missing Skills
                          </p>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {aiResult.missingSkills?.length || 0}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {(aiResult.missingSkills || [])
                            .slice(0, 14)
                            .map((s, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-700 dark:text-red-200 border border-red-500/25"
                              >
                                {s}
                              </span>
                            ))}

                          {(aiResult.missingSkills || []).length === 0 && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Looks great! No missing skills found 🎉
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    
                    {/* <div className="mt-5 flex flex-col sm:flex-row gap-3">
                       <button
                        type="button"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-sm transition"
                        onClick={() =>
                          showToast(
                            "success",
                            "Coming soon: Resume improvement tips ",
                          )
                        }
                      >
                        Improve Resume Tips
                      </button> 

                      <button
                        type="button"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-sm transition"
                        onClick={() =>
                          showToast(
                            "success",
                            "Coming soon: Course recommendations ",
                          )
                        }
                      >
                        Recommended Skills
                      </button> 
                    </div> */}
                  </div>
                );
              })()}

            
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3">
              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                Tip: Check Resume Score first, then submit application 
              </p>
            </div>
          </div>

          

          <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Tip: Keep your profile updated for better chances.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end w-full sm:w-auto">
              <button
                onClick={onClose}
                disabled={checking || submitting}
                className="px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCheckScore}
                disabled={checking || submitting}
                className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
              >
                {checking ? "Checking..." : "Check Resume Score"}
              </button>

              <button
                onClick={handleSubmitApplication}
                disabled={checking || submitting}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ApplyModal;
