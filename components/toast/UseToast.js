"use client";

import { useState, useCallback } from "react";
import { CustomToast } from "./CustomToast";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, options = {}) => {
    setToast({ message, ...options });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const ToastComponent = toast ? (
    <CustomToast {...toast} onClose={hideToast} />
  ) : null;

  return { showToast, ToastComponent };
}
