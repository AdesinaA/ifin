"use client";

// Library imports
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// Components
import AuthLayout from "@/components/Auth/AuthLayout";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { useToast } from "@/components/toast/UseToast";

// Icons
import { Eye, EyeSlash, XCircle, X } from "@phosphor-icons/react/dist/ssr";

const NewPasswordComponent = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showNewPasswordRules, setShowNewPasswordRules] = useState(false);
  const [showVerifyPasswordRules, setShowVerifyPasswordRules] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const formRef = useRef(null);
  const newPasswordRef = useRef(null);
  const verifyPasswordRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowNewPasswordRules(false);
        setShowVerifyPasswordRules(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleShowVerifyPassword = () =>
    setShowVerifyPassword(!showVerifyPassword);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      password: newPassword,
    };

    const headers = {
      resetToken: token,
    };

    setLoading(true);
    const url = "/api/new-password";

    try {
      const response = await axios.post(url, data, { headers });

      const responseData = response.data.data;

      if (responseData) {
        showToast(responseData?.message, { type: "success" });

        setTimeout(() => {
          handleShowConfirmationModal();
        }, 2000);
      }

      if (response.data.status === 400) {
        showToast(response?.data?.error?.message, { type: "error" });
      }

      setLoading(false);
    } catch (error) {
      showToast("Unexpected error occurred, please try again!", {
        type: "error",
      });
      setLoading(false);
    }
  };

  const passwordRules = [
    { regex: /.{8,}/, text: "8 Characters" },
    { regex: /[A-Z]/, text: "Uppercase" },
    { regex: /[a-z]/, text: "Lowercase" },
    { regex: /[0-9]/, text: "Number" },
    { regex: /[^A-Za-z0-9]/, text: "Special Character" },
  ];

  const isPasswordValid = passwordRules.every((rule) =>
    rule.regex.test(newPassword)
  );

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordMismatch(value !== verifyPassword);
  };

  const handleVerifyPasswordChange = (e) => {
    const value = e.target.value;
    setVerifyPassword(value);
    setPasswordMismatch(value !== newPassword);
  };

  return (
    <>
      <AuthLayout
        title="Create New Password"
        des="Create a secure password for your account"
      >
        {ToastComponent}
        <form ref={formRef} onSubmit={onSubmit} className="mt-8 space-y-7">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  onFocus={() => setShowNewPasswordRules(true)}
                  ref={newPasswordRef}
                />
                <div className="absolute top-9 right-3">
                  {showNewPassword ? (
                    <EyeSlash onClick={handleShowNewPassword} size={25} />
                  ) : (
                    <Eye onClick={handleShowNewPassword} size={25} />
                  )}
                </div>
              </div>

              {showNewPasswordRules && (
                <ul className="flex flex-wrap gap-5 items-center">
                  {passwordRules.map((rule, index) => (
                    <li
                      key={index}
                      className={`flex items-center text-sm ${
                        rule.regex.test(newPassword)
                          ? "text-formPrimary"
                          : "text-faded"
                      }`}
                    >
                      {rule.regex.test(newPassword) ? (
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {rule.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Verify Password"
                  type={showVerifyPassword ? "text" : "password"}
                  value={verifyPassword}
                  onChange={handleVerifyPasswordChange}
                  onFocus={() => setShowVerifyPasswordRules(true)}
                  ref={verifyPasswordRef}
                />
                <div className="absolute top-9 right-3">
                  {showVerifyPassword ? (
                    <EyeSlash onClick={handleShowVerifyPassword} size={25} />
                  ) : (
                    <Eye onClick={handleShowVerifyPassword} size={25} />
                  )}
                </div>
              </div>
              {showVerifyPasswordRules && (
                <ul className="flex flex-wrap gap-5 items-center">
                  {passwordRules.map((rule, index) => (
                    <li
                      key={index}
                      className={`flex items-center text-sm ${
                        rule.regex.test(verifyPassword)
                          ? "text-formPrimary"
                          : "text-faded"
                      }`}
                    >
                      {rule.regex.test(verifyPassword) ? (
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {rule.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {passwordMismatch && (
              <div className="text-error border border-error bg-[#FDF7F6] flex gap-2 items-center py-2 px-3 rounded-md">
                <XCircle size={15} />
                <p className="text-red-500 text-sm">Passwords do not match</p>
              </div>
            )}
          </div>

          {loading ? (
            <button
              type="button"
              className={`w-full bg-[#EFF6FF]  font-medium
         text-white px-4 py-3 rounded-lg cursor-not-allowed transition-colors `}
              disabled
            >
              Loading...
            </button>
          ) : (
            <>
              {isPasswordValid && !passwordMismatch ? (
                <Button type="submit">Complete setup</Button>
              ) : (
                <button
                  type="button"
                  className="w-full bg-[#EFF6FF] font-medium text-white 
              px-4 py-3 rounded-lg cursor-not-allowed transition-colors"
                  disabled
                >
                  Complete setup
                </button>
              )}
            </>
          )}
        </form>

        <p className="text-sm text-faded text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-formPrimary font-medium">
            Login
          </Link>
        </p>
      </AuthLayout>

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white space-y-5 py-5 px-4 md:p-8 w-[95%] rounded-lg md:w-3/5 lg:w-2/5 2xl:w-1/4 relative">
            <div
              className="absolute top-5 right-5 cursor-pointer"
              onClick={handleShowConfirmationModal}
            >
              <X size={25} />
            </div>
            <div>
              <Image
                src={`/Images/checkIcon.svg`}
                width={64}
                height={64}
                alt="Check Icon"
                className="mx-auto"
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-medium ">Password Reset Complete</h2>
              <p className="text-faded">
                Your password has been successfully updated.
              </p>
            </div>

            <Link
              href={`/auth/signin`}
              className="w-full bg-formPrimary block font-medium text-white 
              px-4 py-3 rounded-lg transition-colors text-center"
            >
              Return to login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPasswordComponent;
