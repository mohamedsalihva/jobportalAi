import React, { useEffect } from "react";

const Toast = ({ show, type = "success", message, onClose }) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  const styles =
    type === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div className={`border ${styles} rounded-2xl px-5 py-3 shadow-lg`}>
        <p className="text-sm font-bold">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
