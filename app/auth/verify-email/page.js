"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import AuthLayout from "@/components/Auth/AuthLayout";
import Button from "@/components/Auth/Button";
import { useToast } from "@/components/toast/UseToast";

const VerifyEmail = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { showToast, ToastComponent } = useToast();

  const isCodeComplete = code.every((code) => code !== "");
  const inputRefs = useRef([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const resetEmail =
    typeof window !== "undefined"
      ? window.localStorage.getItem("signup_email")
      : null;

  useEffect(() => {
    register("code", {
      required: "Verification code is required",
      validate: (value) =>
        value.length === 6 || "Verification code must be 6 digits",
    });
  }, [register]);

  const handleCodeChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setValue("code", newCode.join(""));

      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value.length > 1) {
      // Handle pasting
      const pastedValue = value.slice(0, 6);
      const newCode = pastedValue
        .split("")
        .concat(Array(6 - pastedValue.length).fill(""));
      setCode(newCode);
      setValue("code", newCode.join(""));
      if (pastedValue.length === 6) {
        inputRefs.current[5].focus();
      } else {
        inputRefs.current[pastedValue.length].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      setValue("code", newCode.join(""));
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const [loading, setLoading] = useState(false);

  const onVerificationSubmit = async (data) => {
    setLoading(true);
    const url = "/api/verify-email";

    const dataToBeSent = {
      code: data.code,
    };

    try {
      const response = await axios.post(url, dataToBeSent);
      const responseData = response.data.data;

      if (responseData) {
        window.localStorage.removeItem("signup_email");
        showToast(responseData?.message, { type: "success" });
        setTimeout(() => {
          router.push("/auth/signin");
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

  return (
    <AuthLayout title="Verify Your Email" verifyEmail={resetEmail}>
      {ToastComponent}
      <form
        onSubmit={handleSubmit(onVerificationSubmit)}
        className="mt-8 space-y-10"
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-formPrimary"
              />
            ))}
          </div>
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
          <p className="text-sm text-faded text-center">
            Didn&apos;t Receive Your Code?{" "}
            <button type="button" className="text-formPrimary font-medium">
              Resend
            </button>
          </p>
        </div>

        <div className="space-y-2">
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
              {isCodeComplete ? (
                <Button type="submit">Verify email</Button>
              ) : (
                <button
                  type="button"
                  className={`w-full bg-[#EFF6FF]  font-medium
            text-white px-4 py-2 rounded-lg cursor-not-allowed transition-colors `}
                  disabled
                >
                  Verify email
                </button>
              )}
            </>
          )}

          <p className="text-center">
            <Link href="/auth/signin" className="text-faded text-center">
              Go back
            </Link>
          </p>
        </div>
      </form>

      <p className="text-sm text-faded text-center">
        Already have an account?{" "}
        <Link href={`/auth/signup`} className="text-formPrimary font-medium">
          Login{" "}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default VerifyEmail;
