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
  <Image
    src="/images/ifin.svg"
    alt="IfinOcean Logo"
    width={40}
    height={40}
    className="lg:w-12 lg:h-12"
    priority
  />
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
