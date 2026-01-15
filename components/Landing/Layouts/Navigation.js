"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { X } from "@phosphor-icons/react/dist/ssr";

const Navigation = ({ modalControl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/90 backdrop-blur border-b border-navyLight">
      <div className="w-[90%] mx-auto flex justify-between items-center py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
        <Image
          src="/Images/b.JPG"
          alt="IfinOcean logo"
          width={40}
          height={30}
          className="w-10 h-auto"
        />

          <span className="text-textInverse font-semibold text-lg tracking-tight">
            IfinOcean
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-textInverse"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center space-x-10">
          {[
            { href: "/", label: "Home", clickable: true },
            { label: "Features" },
            { label: "Packages" },
            { label: "FAQ" },
            { label: "Contact" },
          ].map((link) => (
            <li key={link.label}>
              {link.clickable ? (
                <Link
                  href={link.href}
                  className={`text-sm ${
                    pathname === link.href
                      ? "text-gold font-medium"
                      : "text-textInverse/80 hover:text-gold"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-sm text-textInverse/50 cursor-not-allowed">
                  {link.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-sm text-textInverse/80 hover:text-gold transition-colors"
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            className="text-sm font-medium bg-gold text-navy px-5 py-2 rounded-lg hover:bg-goldLight transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center">
          <button
            className="absolute top-5 right-5 text-textInverse"
            onClick={toggleMenu}
          >
            <X size={28} />
          </button>

          <ul className="space-y-8 text-center">
            {["Home", "Features", "Packages", "FAQ", "Contact"].map((label) => (
              <li key={label}>
                <span className="text-lg text-textInverse/80">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 w-2/3">
            <Link
              href="/auth/signin"
              className="text-center text-textInverse/80"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="text-center bg-gold text-navy py-3 rounded-lg font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
