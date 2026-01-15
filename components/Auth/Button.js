import React from "react";

const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy/90 focus:ring-navy",
    gold:
      "bg-gold text-navy hover:bg-gold/90 focus:ring-gold",
    outline:
      "border border-navy text-navy hover:bg-navy/5 focus:ring-navy",
    ghost:
      "text-navy hover:bg-navy/5 focus:ring-navy",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Processing…" : children}
    </button>
  );
};

export default Button;
