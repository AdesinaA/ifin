"use client";

import { useState } from "react";
import axios from "axios";

// Components
import Button from "@/components/Auth/Button";

// Icons
import { UserCircle, EnvelopeSimple, X } from "@phosphor-icons/react/dist/ssr";

const WaitlistModal = ({ onClose }) => {
  const [formData, setFormData] = useState({});
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

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const url = "/api/join-waitlist";

    try {
      const response = await axios.post(url, formData);

      const responseData = response?.data?.data;

      if (responseData) {
        setSuccessMsg(responseData?.message);
        setTimeout(() => {
          setSuccessMsg("");
          onClose();
        }, 2000);
      }

      if (response.data.status === 400) {
        setErrorMsg(response?.data?.error?.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-200/25 backdrop-blur-sm flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundSecondary rounded-3xl p-10 w-[95%] md:w-[450px] space-y-10 shadow-sm relative">
        {/* header */}
        <div className="text-center">
          <h1 className="font-bold">Ready to Invest?</h1>
          <p className="opacity-90 text-xl">Enjoy early investor benefits.</p>
        </div>

        {/* Closse */}
        <X
          size={25}
          className="absolute -top-5 right-5 cursor-pointer"
          onClick={onClose}
        />

        {/* form */}
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label htmlFor="fullName" className="block text-label">
              Full Name
            </label>
            <div className="flex gap-1 items-center p-2 rounded-lg border border-borderColor">
              <UserCircle size={25} className="text-grey" />
              <input
                type="text"
                name="fullName"
                id="full_name"
                className="w-full placeholder:text-grey outline-none "
                placeholder="Enter your full name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-label">
              Email
            </label>
            <div className="flex gap-1 items-center p-2 rounded-lg border border-borderColor">
              <EnvelopeSimple size={25} className="text-grey" />
              <input
                type="text"
                name="email"
                id="email"
                className="w-full placeholder:text-grey outline-none "
                placeholder="Enter your email"
                onChange={handleInputChange}
              />
            </div>
            <p className="text-formPrimary">{successMsg}</p>
            <p className="text-error">{errorMsg}</p>
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
              {formData?.full_name !== "" && formData?.email !== "" ? (
                <Button type="submit">Join the Waitlist now</Button>
              ) : (
                <button
                  type="button"
                  className={`w-full bg-[#EFF6FF]  font-medium
            text-white px-4 py-2 rounded-lg cursor-not-allowed transition-colors `}
                  disabled
                >
                  Join the Waitlist now
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default WaitlistModal;
