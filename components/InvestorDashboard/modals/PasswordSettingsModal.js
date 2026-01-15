"use client";

// Library imports
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// componentss
import Input from "@/components/Auth/Input";
import Button from "@/components/Auth/Button";

// Icons
import { Eye, EyeSlash, XCircle, X } from "@phosphor-icons/react/dist/ssr";

const PasswordSettingsModal = ({ onClose, token }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
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

  const handleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleShowVerifyPassword = () =>
    setShowVerifyPassword(!showVerifyPassword);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `/api/dashboard/update-password`;

    let data = JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      if (response.status === 200) {
        setLoading(false);
        if (response?.data.status === 200) {
          setSuccessMsg(response?.data?.data?.message);
          setTimeout(() => {
            setSuccessMsg("");
          }, 1000);
          setTimeout(() => {
            onClose();
            // window.location.reload();
          }, 1500);
        } else {
          setErrorMsg(response?.data?.error.message);
          setTimeout(() => {
            setErrorMsg("");
          }, 2000);
          return;
        }
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.data?.message);
      setLoading(false);
      throw error;
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

  const handleOldPasswordChange = (e) => {
    const value = e.target.value;
    setOldPassword(value);
  };

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundSecondary md:p-10 px-5 py-10 rounded-xl w-[95%] md:w-[580px] overflow-scroll scrollable-box space-y-10">
        <h2 className="text-center font-medium text-xl">Update Password</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-7">
          <div className="space-y-2">
            <div className="relative">
              <Input
                label="Current Password"
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />

              <div className="absolute top-9 right-3">
                {showNewPassword ? (
                  <EyeSlash onClick={handleShowOldPassword} size={25} />
                ) : (
                  <Eye onClick={handleShowOldPassword} size={25} />
                )}
              </div>
            </div>

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

            {errorMsg && (
              <div className="text-error border border-error bg-[#FDF7F6] flex gap-2 items-center py-2 px-3 rounded-md">
                <XCircle size={15} />
                <p className="text-red-500 text-sm">{errorMsg}</p>
              </div>
            )}

            {successMsg && (
              <div className="text-error border border-formPrimary bg-[#FDF7F6] flex gap-2 items-center py-2 px-3 rounded-md">
                <XCircle size={15} />
                <p className="text-formPrimary text-sm">
                  Passwords do not match
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-start gap-3 text-white text-center">
            <button
              type="button"
              className="bg-backgroundSecondary border border-borderColor text-label w-1/2 py-2 rounded-lg capitalize cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>

            {loading ? (
              <button
                type="button"
                className=" bg-formPrimary opacity-30 border border-formPrimary font-medium text-white 
                px-4 py-2 rounded-lg cursor-not-allowed transition-colors w-1/2"
                disabled
              >
                Loading...
              </button>
            ) : (
              <>
                {isPasswordValid && !passwordMismatch ? (
                  <button
                    type="submit"
                    className=" bg-formPrimary border border-formPrimary font-medium text-white 
             px-4 py-2 rounded-lg  transition-colors w-1/2"
                  >
                    Complete setup
                  </button>
                ) : (
                  <button
                    type="button"
                    className=" bg-formPrimary border border-formPrimary opacity-30  font-medium text-white 
              px-4 py-2 rounded-lg cursor-not-allowed transition-colors w-1/2"
                    disabled
                  >
                    Complete setup
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordSettingsModal;
