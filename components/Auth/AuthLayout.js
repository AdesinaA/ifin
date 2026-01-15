import React from "react";

const AuthLayout = ({ children, title, des, other, verifyEmail }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-navy/5">
      <div className="w-full max-w-md space-y-10 bg-white rounded-3xl px-6 py-10 shadow-sm border border-navy/10">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-navy">
            {title}
          </h2>

          {des && (
            <p className="text-sm text-navyMuted">
              {des}
            </p>
          )}

          {verifyEmail && (
            <p className="text-sm text-navyMuted">
              We&apos;ve sent a verification code to{" "}
              <span className="font-medium text-gold">
                {verifyEmail}
              </span>
            </p>
          )}
        </div>

        {/* Form content */}
        <div className="space-y-8">
          {children}
        </div>
      </div>

      {/* Footer / secondary actions */}
      {other && (
        <div className="mt-8 text-center max-w-md text-sm text-navyMuted">
          {other}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
