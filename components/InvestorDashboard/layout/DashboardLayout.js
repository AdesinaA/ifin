"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

// Components
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

// Hooks
import useToggle from "@/hooks/UseToggle";

// Icons
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";

const DashboardLayoutComponent = ({ children }) => {
  const { data: session, status } = useSession();
  const { isOpen: showSider, toggle: toggleSidebar } = useToggle();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || status === "loading") return null;

  return (
    <div className="h-screen w-full bg-navy text-navyMuted flex overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`${
          showSider ? "block z-50" : "hidden lg:block"
        } lg:block h-full w-[80%] md:w-2/5 lg:w-1/5 2xl:w-[15%] bg-navy border-r border-navySoft`}
      >
        <SideNavbar
          showSider={showSider}
          toggleSidebar={toggleSidebar}
          signOut={signOut}
        />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col relative">

        {/* TOP NAV */}
        <div className="sticky top-0 z-40 bg-navy border-b border-navySoft">
          <TopNavbar
            data={session}
            name={session?.user?.name}
            signOut={signOut}
          />
        </div>

        {/* CONTENT CANVAS */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-sm border border-borderColor p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE SIDEBAR TOGGLE */}
      {!showSider && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 left-0 lg:hidden bg-gold text-navy rounded-r-2xl px-3 py-2 shadow-md"
        >
          <Eye size={18} />
        </button>
      )}
    </div>
  );
};

export default DashboardLayoutComponent;