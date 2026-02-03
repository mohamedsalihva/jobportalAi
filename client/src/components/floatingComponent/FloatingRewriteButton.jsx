import React, { useState } from "react";
import api from "../../api/axios";

const FloatingRewriteButton = ({ jobId }) => {
  const [isRewriting, setIsRewriting] = useState(false);

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
      alert(message);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <button
      onClick={rewriteResume}
      disabled={isRewriting}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition z-50"
    >
      {isRewriting ? "Rewriting..." : "🤖 Optimize Resume"}
    </button>
  );
};

export default FloatingRewriteButton;
