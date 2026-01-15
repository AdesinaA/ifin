"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  SquaresFour,
  Package,
  Scroll,
  HandArrowDown,
  UsersThree,
  GearSix,
  Question,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";

const SideNavbar = ({ showSider, toggleSidebar, signOut }) => {
  const pathname = usePathname();

  const go = (path) => () => (window.location.href = path);

  const sections = [
    {
      label: "Primary",
      items: [
        { name: "Overview", icon: <SquaresFour size={18} />, link: "/dashboard" },
        { name: "Plans", icon: <Package size={18} />, link: "/dashboard/packages" },
        {
          name: "Allocations",
          icon: <Package size={18} />,
          link: "/dashboard/investments",
        },
      ],
    },
    {
      label: "Operations",
      items: [
        {
          name: "Activity",
          icon: <Scroll size={18} />,
          link: "/dashboard/transaction_history",
        },
        {
          name: "Transfers",
          icon: <HandArrowDown size={18} />,
          link: "/dashboard/withdrawal",
        },
      ],
    },
    {
      label: "Growth",
      items: [
        {
          name: "Referrals",
          icon: <UsersThree size={18} />,
          link: "/dashboard/refferals",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          name: "Settings",
          icon: <GearSix size={18} />,
          link: "/dashboard/settings",
        },
        {
          name: "Support",
          icon: <Question size={18} />,
          link: "/dashboard/help_and_support",
        },
      ],
    },
  ];

  return (
    <aside className="h-full w-full bg-navy text-white flex flex-col px-4 py-6">

      {/* BRAND */}
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-8">
        <Image
          src="/Images/b.JPG"
          width={32}
          height={32}
          alt="IfinOcean Logo"
        />
        <span className="text-lg font-semibold tracking-tight">
          IfinOcean
        </span>
      </Link>

      {/* NAV SECTIONS */}
      <div className="flex-1 space-y-8">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-2 mb-3 text-[11px] uppercase tracking-wide text-navyMuted">
              {section.label}
            </p>

            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.link;

                return (
                  <li key={item.name}>
                    <button
                      onClick={go(item.link)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all
                        ${
                          active
                            ? "bg-navySoft text-gold relative"
                            : "text-navyMuted hover:bg-navySoft hover:text-white"
                        }`}
                    >
                      {/* gold indicator */}
                      {active && (
                        <span className="absolute left-0 top-0 h-full w-[3px] bg-gold rounded-r" />
                      )}

                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* SIGN OUT */}
      <button
        onClick={() => signOut()}
        className="mt-6 flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition"
      >
        <SignOut size={18} />
        Sign out
      </button>
    </aside>
  );
};

export default SideNavbar;