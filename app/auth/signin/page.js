"use client";

// Library imports
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Components
import AuthLayout from "@/components/Auth/AuthLayout";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { useToast } from "@/components/toast/UseToast";

// Icons
import { ArrowRight, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";

const SignIn = () => {
  const router = useRouter();

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

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const url = "/api/signin";

    try {
      const response = await axios.post(url, formData);
      const responseData = response.data.data;

      if (responseData) {
        window.localStorage.setItem("signup_email", formData.email);
        showToast(responseData?.message, { type: "success" });
        setTimeout(() => {
          router.push("/dashboard");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const email = formData.email;
    const password = formData.password;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setLoading(false);

      showToast(result.error, { type: "error" });
    } else {
      setLoading(false);

      showToast("Login successfull", { type: "success" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      des={`Start your investment journey today`}
    >
      {ToastComponent}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          onChange={handleFormInput}
        />

        <div className="relative">
          <Input
            label="Password"
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleFormInput}
          />
          <p className="text-sm text-faded -mt-3">
            Forgot password?{" "}
            <Link
              href={`/auth/reset-password`}
              className="text-formPrimary font-medium"
            >
              Reset
            </Link>
          </p>

          <div className="absolute top-9 right-3">
            {showPassword ? (
              <EyeSlash onClick={handleShowPassword} size={25} />
            ) : (
              <Eye onClick={handleShowPassword} size={25} />
            )}
          </div>
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
            {formData?.name !== "" && formData?.email !== "" ? (
              <Button type="submit">
                Sign In
                <ArrowRight size={20} />
              </Button>
            ) : (
              <button
                type="button"
                className={`w-full bg-[#EFF6FF]  font-medium
            text-white px-4 py-2 rounded-lg cursor-not-allowed transition-colors `}
                disabled
              >
                Sign In
              </button>
            )}
          </>
        )}
      </form>

      <p className="text-sm text-faded text-center">
        Don&apos;t have an account?{" "}
        <Link href={`/auth/signup`} className="text-formPrimary font-medium">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
