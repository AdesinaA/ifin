"use client";

import { useState, useEffect } from "react";

import { X } from "@phosphor-icons/react/dist/ssr";

export function CustomToast({
  message,
  type = "default",
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const baseClasses =
    "fixed top-5 right-5 py-2 px-4 font-medium rounded-md flex items-center justify-between shadow-md z-50 animate-slideIn";
  const typeClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-transparent text-[#1D4ED8] border border-[#1D4ED8]",
    error: "bg-transparent text-red-600 border border-red-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 text-xl font-bold focus:outline-none"
      >
        <X size={20} />
      </button>
    </div>
  );
}
