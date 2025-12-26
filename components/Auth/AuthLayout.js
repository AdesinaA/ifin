import React from "react";

const AuthLayout = ({ children, title, des, other, verifyEmail }) => {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="md:max-w-[470px] w-full space-y-10 bg-white md:p-10 py-10 px-4 rounded-3xl shadow-sm">
        {/* Haeder */}
        <div className="text-center">
          <h2 className="text-3xl font-medium ">{title}</h2>
          <p className="text-faded">{des}</p>
          {verifyEmail && (
            <p className="text-faded">
              We&apos;ve sent a verification code to{" "}
              <span className="text-formPrimary">{verifyEmail}</span>
            </p>
          )}
        </div>

        <div className="space-y-8">{children}</div>
      </div>

      {other && (
        <div className="text-center md:w-1/2 xl:w-1/3 mx-auto">{other}</div>
      )}
    </div>
  );
};

export default AuthLayout;
