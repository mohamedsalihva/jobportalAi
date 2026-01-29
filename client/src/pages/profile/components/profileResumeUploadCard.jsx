import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import Toast from "../../../components/ui/Toast";
import { API } from "../../../constants/apiEndpoints";
import { Upload, ExternalLink } from "lucide-react";

const ProfileResumeUploadCard = ({ resumePath, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const handleUpload = async () => {
    if (!file) {
      showToast("error", "Please select a PDF resume");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      await api.post(API.PROFILE.UPLOAD_RESUME, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("success", "Resume uploaded successfully");

      setFile(null);

     setTimeout(() => {
      onUploaded && onUploaded();
     },900);
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Resume upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={hideToast}
      />

      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
        Resume
      </h2>

      {resumePath ? (
        <div className="mt-3 space-y-3">
          <a
            href={`http://localhost:3000/${resumePath}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-300 font-extrabold hover:underline"
          >
            View Resume <ExternalLink size={16} />
          </a>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            You can replace your resume anytime.
          </p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Upload your resume (PDF) to apply for jobs and check resume score.
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-extrabold py-2.5 rounded-2xl hover:bg-amber-400 transition disabled:opacity-60"
        >
          <Upload size={16} />
          {uploading
            ? "Uploading..."
            : resumePath
            ? "Replace Resume"
            : "Upload Resume"}
        </button>
      </div>
    </div>
  );
};

export default ProfileResumeUploadCard;
