"use client";

import { useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (item) => {
    if (typeof item === "boolean") {
      setIsOpen(item);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return { isOpen, toggle };
};

export default useToggle;
