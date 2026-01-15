"use client";

import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Input from "@/components/Auth/Input";

const PersonalSettingsModal = ({ onClose, initialData, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `/api/dashboard/update-personal-details`;
    let data = JSON.stringify(formData);

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
            window.location.reload();
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

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundSecondary py-10 px-5 md:p-10 rounded-xl w-[95%] md:w-[580px] h-[500px] md:h-auto overflow-scroll scrollable-box space-y-10">
        <h2 className="text-center font-medium text-xl">
          Update Profile Information
        </h2>

        <div className="space-y-2">
          {errorMsg && <p className="text-error text-2xl">{errorMsg}</p>}
          {successMsg && (
            <p className="text-formPrimary text-2xl">{successMsg}</p>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              id="name"
              placeholder="Enter first name"
              onChange={handleInputChange}
              value={formData?.name}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              onChange={handleInputChange}
              value={formData?.email}
            />

            <Input
              label="Phone Number"
              type="phone"
              name="phone"
              id="phone"
              placeholder="Enter phone number"
              onChange={handleInputChange}
              value={formData?.phone}
            />

            <Input
              label="Addresss"
              type="address"
              name="address"
              id="address"
              placeholder="Enter your address "
              onChange={handleInputChange}
              value={formData?.address}
            />

            <div className="flex gap-5">
              <div className="w-1/2">
                <Input
                  label="Country"
                  type="country"
                  name="country"
                  id="country"
                  placeholder="Enter your country"
                  onChange={handleInputChange}
                  value={formData?.country}
                />
              </div>

              <div className="w-1/2">
                <Input
                  label="State"
                  type="state"
                  name="state"
                  id="state"
                  placeholder="Enter your state"
                  onChange={handleInputChange}
                  value={formData?.state}
                />
              </div>
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

              <button
                type="submit"
                className={` bg-formPrimary border border-formPrimary  font-medium
            text-white px-7 py-2 rounded-lg ${
              formData?.name === "" ||
              formData?.email === "" ||
              formData?.address === "" ||
              formData?.country === "" ||
              formData?.state === "" ||
              formData?.phone === "" ||
              loading
                ? " opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            } transition-colors w-1/2`}
                disabled={
                  formData?.name === "" ||
                  formData?.email === "" ||
                  formData?.address === "" ||
                  formData?.country === "" ||
                  formData?.state === "" ||
                  formData?.phone === ""
                }
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalSettingsModal;
