"use client";

// Library imports
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading placeholder
  }

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div
      className={`lg:flex lg:flex-1 relative ${
        showSider ? "md:h-screen overflow-hidden" : "md:overflow-scroll"
      } h-screen lg:overflow-hidden bg-greyBg `}
    >
      {/* SIDEBAR */}
      <div
        className={`${
          showSider ? "block md:z-50 shadow-md" : "hidden lg:block"
        } lg:block md:h-full lg:h-screen overflow-hidden md:w-2/5 lg:w-1/5 2xl:w-[15%] relative`}
      >
        <SideNavbar
          showSider={showSider}
          toggleSidebar={toggleSidebar}
          signOut={signOut}
        />
      </div>

      <div
        className={`md:w-full lg:space-y-20 lg:w-4/5 2xl:w-[85%] ${
          showSider ? "md:absolute top-0 inset-0 bg-slate-200" : ""
        }`}
      >
        {/* Top Nav */}
        <div>
          <TopNavbar
            data={session}
            name={session?.user?.name}
            signOut={signOut}
          />
        </div>

        <main
          className={`w-full pb-14 px-3 md:px-5 pt-20 lg:pt-0 h-full overflow-scroll `}
        >
          {children}
        </main>
      </div>

      <div
        className={`fixed bottom-2 left-0 flex items-center lg:hidden justify-center bg-formPrimary rounded-r-3xl p-3 ${
          showSider ? "hidden" : ""
        }`}
        onClick={toggleSidebar}
      >
        {showSider ? <EyeSlash size={20} /> : <Eye size={20} />}
      </div>
    </div>
  );
};

export default DashboardLayoutComponent;
