"use client";

import { useState, useCallback } from "react";
import { CustomToast } from "./CustomToast";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, options = {}) => {
      if (!message) return;

      setToast({
        message,
        type: options.type || "default", // default | success | error
        duration: options.duration || 3500,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const ToastComponent = toast ? (
    <CustomToast {...toast} onClose={hideToast} />
  ) : null;

  return {
    showToast,
    ToastComponent,
  };
}