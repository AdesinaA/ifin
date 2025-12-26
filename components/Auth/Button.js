import React from "react";

const Button = ({ children, isLoading, ...props }) => {
  return (
    <button
      className={`w-full bg-formPrimary flex gap-2 items-center justify-center font-medium
         text-white px-4 py-3 rounded-lg hover:bg-opacity-70 transition-colors ${
           isLoading ? "opacity-50 cursor-not-allowed" : ""
         }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
