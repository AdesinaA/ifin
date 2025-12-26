"use client";

// LibrRY
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Components
import AuthLayout from "@/components/Auth/AuthLayout";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { useToast } from "@/components/toast/UseToast";

// Icons
import { ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react";

const SignUpComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  console.log("ref", ref);

  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();
  const [formData, setFormData] = useState({});
  const handleFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const passwordRules = [
    { regex: /.{8,}/, text: "8 Characters" },
    { regex: /[A-Z]/, text: "Uppercase" },
    { regex: /[a-z]/, text: "Lowercase" },
    { regex: /[0-9]/, text: "Number" },
    { regex: /[^A-Za-z0-9]/, text: "Special Character" },
  ];

  const isPasswordPassed = passwordRules.every((rule) =>
    rule.regex.test(formData?.password)
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = "/api/signup";

    const newFormData = ref
      ? {
          ...formData,
          referralCode: ref,
        }
      : formData;

    try {
      const response = await axios.post(url, newFormData);
      const responseData = response.data.data;

      if (responseData) {
        window.localStorage.setItem("signup_email", formData.email);
        showToast(responseData?.message, { type: "success" });
        setTimeout(() => {
          router.push("/auth/verify-email");
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
      // TODO: Handle error (e.g., show error message to user)
    }
  };

  const other = (
    <p className="text-sm text-faded text-center">
      By creating an account, you acknowledge that you agree to IfinOcean&apos;s{" "}
      <Link href={`/signin`} className="text-formPrimary font-medium">
        Terms of Service & Privacy Policy.
      </Link>
    </p>
  );

  return (
    <AuthLayout
      title="Create Your Account"
      des={`Start your investment journey today`}
      other={other}
    >
      {ToastComponent}
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Input
          label="Full Name"
          type="text"
          name="name"
          id="name"
          placeholder="Enter first name"
          onChange={handleFormInput}
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          onChange={handleFormInput}
        />
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleFormInput}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />

            <div className="absolute top-9 right-3">
              {showPassword ? (
                <EyeSlash
                  onClick={handleShowPassword}
                  size={25}
                  className="cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={handleShowPassword}
                  size={25}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>

          {isPasswordFocused && formData.password && (
            <ul className="flex flex-wrap gap-5 items-center">
              {passwordRules.map((rule, index) => (
                <li
                  key={index}
                  className={`flex items-center text-sm ${
                    rule.regex.test(formData?.password)
                      ? "text-formPrimary"
                      : "text-faded"
                  }`}
                >
                  {rule.regex.test(formData?.password) ? (
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
            {isPasswordPassed &&
            formData?.name !== "" &&
            formData?.email !== "" ? (
              <Button type="submit">
                Sign Up
                <ArrowRight size={20} />
              </Button>
            ) : (
              <button
                type="button"
                className={`w-full bg-[#EFF6FF]  font-medium
            text-white px-4 py-2 rounded-lg cursor-not-allowed transition-colors `}
                disabled
              >
                Sign Up
              </button>
            )}
          </>
        )}
      </form>

      <p className="text-sm text-faded text-center">
        Already have an account?{" "}
        <Link href={`/auth/signin`} className="text-formPrimary font-medium">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpComponent;
