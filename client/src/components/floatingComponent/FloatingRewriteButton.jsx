import React, { useState } from "react";
import api from "../../api/axios";
import Toast from "../ui/Toast";

const FloatingRewriteButton = ({ jobId }) => {
  const [isRewriting, setIsRewriting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) =>
    setToast({ show: true, type, message });

  const rewriteResume = async () => {
    try {
      setIsRewriting(true);

      const response = await api.post(
        `/ai/resume-rewrite/${jobId}`,
        {},
        { responseType: "blob" }
      );

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      let message = "Failed to rewrite resume";
      try {
        if (err?.response?.data instanceof Blob) {
          const text = await err.response.data.text();
          const parsed = JSON.parse(text);
          message = parsed?.message || message;
        } else if (err?.response?.data?.message) {
          message = err.response.data.message;
        }
      } catch (_) {
        // keep fallback message
      }
      console.error("Rewrite failed", err);
      showToast("error", message);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <>
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((p) => ({ ...p, show: false }))}
      />
      <button
        onClick={rewriteResume}
        disabled={isRewriting}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition z-50"
      >
        {isRewriting ? "Rewriting..." : "Optimize Resume"}
      </button>
    </>
  );
};

export default FloatingRewriteButton;
