"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [showSider, setShowSider] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleSidebar = () => {
    setShowSider((prev) => !prev);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <SidebarContext.Provider value={{ showSider, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
