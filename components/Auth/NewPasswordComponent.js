"use client";

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const { showToast, ToastComponent } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowNewPasswordRules(false);
        setShowVerifyPasswordRules(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const passwordRules = [
    { regex: /.{8,}/, text: "8 characters" },
    { regex: /[A-Z]/, text: "Uppercase letter" },
    { regex: /[a-z]/, text: "Lowercase letter" },
    { regex: /[0-9]/, text: "Number" },
    { regex: /[^A-Za-z0-9]/, text: "Special character" },
  ];

  const isPasswordValid = passwordRules.every((rule) =>
    rule.regex.test(newPassword)
  );

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordMismatch(verifyPassword && value !== verifyPassword);
  };

  const handleVerifyPasswordChange = (e) => {
    const value = e.target.value;
    setVerifyPassword(value);
    setPasswordMismatch(newPassword && value !== newPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/new-password",
        { password: newPassword },
        { headers: { resetToken: token } }
      );

      showToast(response?.data?.data?.message || "Password updated", {
        type: "success",
      });

      setTimeout(() => setShowConfirmationModal(true), 1500);
    } catch (error) {
      showToast(
        error?.response?.data?.message ||
          "Unexpected error occurred. Please try again.",
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Create New Password"
        des="Secure your account with a strong password"
      >
        {ToastComponent}

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="space-y-7 mt-6"
        >
          {/* New password */}
          <div className="relative">
            <Input
              label="New password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              onFocus={() => setShowNewPasswordRules(true)}
              placeholder="Enter new password"
            />

            <button
              type="button"
              className="absolute right-3 top-[38px] text-navyMuted hover:text-navy"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {showNewPasswordRules && (
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {passwordRules.map((rule, index) => {
                const passed = rule.regex.test(newPassword);
                return (
                  <li
                    key={index}
                    className={`flex items-center gap-2 ${
                      passed ? "text-gold" : "text-navyMuted"
                    }`}
                  >
                    {passed ? "✓" : "✕"} {rule.text}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Verify password */}
          <div className="relative">
            <Input
              label="Confirm password"
              type={showVerifyPassword ? "text" : "password"}
              value={verifyPassword}
              onChange={handleVerifyPasswordChange}
              onFocus={() => setShowVerifyPasswordRules(true)}
              placeholder="Re-enter password"
              error={passwordMismatch ? "Passwords do not match" : ""}
            />

            <button
              type="button"
              className="absolute right-3 top-[38px] text-navyMuted hover:text-navy"
              onClick={() => setShowVerifyPassword(!showVerifyPassword)}
            >
              {showVerifyPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {passwordMismatch && (
            <div className="flex items-center gap-2 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-600">
              <XCircle size={16} />
              Passwords do not match
            </div>
          )}

          <Button
            type="submit"
            isLoading={loading}
            disabled={!isPasswordValid || passwordMismatch}
          >
            Complete setup
          </Button>
        </form>

        <p className="text-sm text-navyMuted text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-gold font-medium">
            Login
          </Link>
        </p>
      </AuthLayout>

      {/* Confirmation modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[90%] max-w-md rounded-xl bg-white p-8 text-center space-y-4">
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="absolute right-4 top-4 text-navyMuted hover:text-navy"
            >
              <X size={22} />
            </button>

            <Image
              src="/Images/checkIcon.svg"
              width={64}
              height={64}
              alt="Success"
              className="mx-auto"
            />

            <h2 className="text-2xl font-semibold text-navy">
              Password reset complete
            </h2>

            <p className="text-sm text-navyMuted">
              Your password has been successfully updated.
            </p>

            <Link
              href="/auth/signin"
              className="block w-full rounded-lg bg-gold px-4 py-3 font-medium text-navy hover:opacity-90"
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