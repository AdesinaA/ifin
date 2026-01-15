"use client";

// Library importss
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Components
import AuthLayout from "@/components/Auth/AuthLayout";
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";
import { useToast } from "@/components/toast/UseToast";

// Icons
import { ArrowRight, X } from "@phosphor-icons/react/dist/ssr";

const ResetPassword = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();
  const [formData, setFormData] = useState({});
  const handleFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const url = "/api/reset-password";

    try {
      const response = await axios.post(url, formData);
      const responseData = response.data.data;

      if (responseData) {
        window.localStorage.setItem("signup_email", formData.email);
        window.localStorage.setItem("pa_reset_token", responseData.resetToken);
        handleShowConfirmationModal();
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

  return (
    <>
      <AuthLayout
        title="Reset Password"
        des={`Enter your email to receive a reset link`}
      >
        {ToastComponent}
        <form onSubmit={onSubmit} className="mt-8 ">
          <Input
            label="Email Address"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            onChange={handleFormInput}
          />

          {loading ? (
            <button
              type="button"
              className={`w-full bg-[#EFF6FF] font-medium
      text-white px-4 py-3 rounded-lg cursor-not-allowed transition-colors `}
              disabled
            >
              Loading...
            </button>
          ) : (
            <>
              {formData?.email !== "" ? (
                <Button type="submit">
                  Continue
                  <ArrowRight size={20} />
                </Button>
              ) : (
                <button
                  type="button"
                  className={`w-full bg-[#EFF6FF]  font-medium
            text-white px-4 flex gap-2 justify-center items-center py-2 rounded-lg cursor-not-allowed transition-colors `}
                  disabled
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              )}
            </>
          )}
        </form>

        <p className="text-sm text-faded text-center">
          <Link href={`/auth/signin`} className="text-formPrimary font-medium">
            Return to login
          </Link>
        </p>
      </AuthLayout>
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-backgroundPrimary space-y-5 py-5 px-4 md:p-8 w-[95%] rounded-lg md:w-3/5 lg:w-2/5 2xl:w-1/4 relative">
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
              <h2 className="text-3xl font-medium ">Check Your Email</h2>
              <p className="text-faded">
                Password reset link has been sent to your email
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

export default ResetPassword;
