"use client";

import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";

export function CustomToast({
  message,
  type = "default",
  duration = 3500,
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

  const baseClasses = `
    fixed top-6 right-6 z-50
    min-w-[260px] max-w-sm
    px-4 py-3
    rounded-lg
    shadow-lg
    flex items-center justify-between gap-4
    animate-slideIn
    border
    bg-navy
    text-sm
  `;

  const typeClasses = {
    default: "border-navyMuted text-navyMuted",
    success: "border-gold text-gold",
    error: "border-red-500 text-red-400",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span className="leading-snug">{message}</span>

      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="text-navyMuted hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}
