"use client";

// Library imports
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Countdown from "../Countdown";

// Icons
import { X } from "@phosphor-icons/react/dist/ssr";

const Navigation = ({ modalControl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="fixed w-full bg-[#1D4ED8] bg-opacity-90 space-y-1  z-50">
      {/* <Countdown /> */}
      <div className="w-[90%] mx-auto flex justify-between items-center py-2">
        {/* NavBrand */}
        <Link href="/" className="flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 120"
    className="w-12 h-auto"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B0" />
        <stop offset="25%" stopColor="#F5C542" />
        <stop offset="50%" stopColor="#E0A100" />
        <stop offset="75%" stopColor="#F5C542" />
        <stop offset="100%" stopColor="#FFF4B0" />
      </linearGradient>
    </defs>

    <g transform="translate(10 0) scale(1.2)">
      <path d="M10 85C15 83 18 78 22 72C26 66 30 62 35 65C40 68 42 75 45 82C48 89 50 92 55 92C60 92 65 88 70 85C75 82 80 85 85 88C90 91 95 90 100 87C105 84 108 85 112 87L112 100L10 100Z" fill="url(#goldGradient)" />
      <path d="M20 90C25 88 28 82 33 72C38 62 42 55 48 58C54 61 58 70 62 80C66 90 70 95 78 92C86 89 92 82 98 85C104 88 108 92 115 90L115 100L20 100Z" fill="url(#goldGradient)" />
      <path d="M30 92C35 90 40 85 45 75C50 65 54 52 60 48C66 44 70 50 74 60C78 70 82 82 88 88C94 94 100 96 106 94C112 92 116 94 120 95L120 100L30 100Z" fill="url(#goldGradient)" />
    </g>
  </svg>

  <h1 className="text-white font-semibold text-xl tracking-tight">
    IfinOcean
  </h1>
</Link>




        {/* Hamburger Menu for mobile */}
        <button
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
        {/* <button
          type="button"
          onClick={modalControl}
          className="font-medium lg:hidden text-secondary py-2 px-5 bg-white rounded-lg 
          hover:bg-opacity-90 transition-colors cursor-not-allowed"
        >
          Join waitlist
        </button> */}

        {/* NavLinks and Buttons for larger screens */}

        <ul className="hidden lg:flex items-center space-x-10">
          {[
            { href: "/", label: "Home", isClickable: true },
            { href: "/features", label: "Features", isClickable: false },
            { href: "/packages", label: "Packages", isClickable: false },
            { href: "/faq", label: "Faq", isClickable: false },
            { href: "/contact", label: "Contact", isClickable: false },
          ].map((link) => (
            <li key={link.href}>
              {link.isClickable ? (
                <Link
                  href={link.href} // Use the correct href here now
                  className={`${
                    pathname === link.href
                      ? "text-white font-bold"
                      : " text-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <span // Use a span for non-clickable links
                  className={`${
                    pathname === link.href // This won't likely match now, consider removing
                      ? "text-white font-bold"
                      : " text-slate-100"
                  } cursor-not-allowed`} // Indicate it's not clickable
                >
                  {link.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-5 items-center">
          <Link
            href={`/auth/signin`}
            className="font-medium transition-colors py-2 px-3 border
             border-white rounded-lg text-white"
          >
            Login
          </Link>
          <Link
            href={`/auth/signup`}
            className="font-medium text-secondary py-2 px-5 bg-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Get Started
          </Link>
          {/* <button
            type="button"
            onClick={modalControl}
            className="font-medium text-secondary py-2 px-5 bg-white rounded-lg 
            hover:bg-opacity-90 transition-colors cursor-pointer"
          >
            Join waitlist
          </button> */}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center">
          <div className="absolute top-4 right-4" onClick={toggleMenu}>
            <X size={32} />
          </div>
          <div className="space-y-8 text-center">
            <ul className="space-y-10">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/packages", label: "Packages" },
                { href: "/faq", label: "Faq" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      pathname === link.href ? "text-secondary" : "text-grey"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-8 flex justify-center gap-5 items-center">
              <Link
                href={`/auth/signin`}
                className="font-medium hover:text-secondary transition-colors"
              >
                Login
              </Link>
              <Link
                href={`/auth/signup`}
                className="font-medium text-white bg-secondary p-3 rounded-lg hover:bg-opacity-90 transition-colors w-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
