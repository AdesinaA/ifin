"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Components
import AuthLayout from "@/components/Auth/AuthLayout";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { useToast } from "@/components/toast/UseToast";

// Icons
import { ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";

const SignUpComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

  const { showToast, ToastComponent } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordRules = [
    { regex: /.{8,}/, text: "8 characters" },
    { regex: /[A-Z]/, text: "Uppercase letter" },
    { regex: /[a-z]/, text: "Lowercase letter" },
    { regex: /[0-9]/, text: "Number" },
    { regex: /[^A-Za-z0-9]/, text: "Special character" },
  ];

  const isPasswordValid = passwordRules.every((rule) =>
    rule.regex.test(formData.password)
  );

  const canSubmit =
    isPasswordValid &&
    formData.name.trim() !== "" &&
    formData.email.trim() !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = referralCode
      ? { ...formData, referralCode }
      : formData;

    try {
      const response = await axios.post("/api/signup", payload);

      showToast(response?.data?.data?.message || "Account created", {
        type: "success",
      });

      localStorage.setItem("signup_email", formData.email);

      setTimeout(() => {
        router.push("/auth/verify-email");
      }, 1500);
    } catch (error) {
      showToast(
        error?.response?.data?.message ||
          "Unable to create account. Please try again.",
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  /* const legalNote = (
    <p className="text-sm text-navyMuted text-center">
      By creating an account, you agree to IfinOcean’s{" "}
      <Link href="/terms" className="text-gold font-medium">
        Terms of Service & Privacy Policy
      </Link>
      .
    </p>
  ); */

  return (
    <AuthLayout
      title="Create your account"
      des="Start your investment journey with a secure account"
     /* other={legalNote}*/
    >
      {ToastComponent}

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <Input
          label="Full name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
        />

        {/* Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />

            <button
              type="button"
              className="absolute right-3 top-[38px] text-navyMuted hover:text-navy"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {isPasswordFocused && formData.password && (
            <ul className="grid grid-cols-2 gap-3 text-sm mt-2">
              {passwordRules.map((rule, index) => {
                const passed = rule.regex.test(formData.password);
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
        </div>

        <Button type="submit" isLoading={loading} disabled={!canSubmit}>
          Sign up
          <ArrowRight size={18} />
        </Button>
      </form>

      <p className="text-sm text-navyMuted text-center mt-6">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-gold font-medium">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpComponent;