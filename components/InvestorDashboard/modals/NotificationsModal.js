"use client";

import Image from "next/image";
import { useState } from "react";

import useToggle from "@/hooks/UseToggle";

const NotificationsModal = ({ onClose }) => {
  const { isOpen: isTransactionAlert, toggle: toggleTransactionAlert } =
    useToggle();

  const { isOpen: isSystemUpdateAlert, toggle: toggleSystemUpdateAlert } =
    useToggle();

  const { isOpen: isPromotionsAlert, toggle: togglePromotionsAlert } =
    useToggle();

  const { isOpen: isLoading, toggle: toggleLoading } = useToggle();

  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = async (e) => {
    const formData = {
      transaction_alert: isTransactionAlert,
      system_alert: isSystemUpdateAlert,
      promotion_alert: isPromotionsAlert,
      delivery_methods: selectedOption,
    };
    e.preventDefault();

    toggleLoading(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      toggleLoading(false);
      onClose();
    }, 2000);

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundSecondary md:p-10 px-5 py-10 rounded-xl w-[95%] md:w-[580px] overflow-scroll scrollable-box space-y-10">
        <h2 className="text-center font-medium text-xl">
          Notification Preferences
        </h2>

        {/* Content */}
        <div className="space-y-5">
          <div className="flex flex-row items-center justify-between gap-5">
            {/* Text content */}
            <div>
              <h3 className="font-medium">Transaction Alerts</h3>
              <p className="text-faded text-sm w-3/4">
                Receive notifications about deposits, withdrawals, and
                investments.
              </p>
            </div>

            {/* CTA */}
            <div onClick={toggleTransactionAlert}>
              {isTransactionAlert ? (
                <Image
                  src={`/Images/toggle_left_icon.svg`}
                  width={40}
                  height={40}
                  alt="Toggle left"
                  className="transition-all duration-500"
                />
              ) : (
                <Image
                  src={`/Images/toggle_right_icon.svg`}
                  width={40}
                  height={40}
                  alt="Toggle right"
                  className="transition-all duration-500"
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-5">
            {/* Text content */}
            <div>
              <h3 className="font-medium">System Updates</h3>
              <p className="text-faded text-sm w-3/4">
                Stay informed about platform updates and maintenance schedules.
              </p>
            </div>

            {/* CTA */}
            <div onClick={toggleSystemUpdateAlert}>
              {isSystemUpdateAlert ? (
                <Image
                  src={`/Images/toggle_left_icon.svg`}
                  width={40}
                  height={40}
                  alt="Toggle left"
                  className="transition-all duration-500"
                />
              ) : (
                <Image
                  src={`/Images/toggle_right_icon.svg`}
                  width={40}
                  height={40}
                  alt="Toggle right"
                  className="transition-all duration-500"
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-5">
            {/* Text content */}
            <div>
              <h3 className="font-medium">Promotions</h3>
              <p className="text-faded text-sm w-3/4">
                Get alerts on offers, latest updates, and investment
                opportunities.
              </p>
            </div>

            {/* CTA */}
            <div onClick={togglePromotionsAlert}>
              {isPromotionsAlert ? (
                <Image
                  src={`/Images/toggle_left_icon.svg`}
                  width={40}
                  height={40}
                  alt="Toggle left"
                  className="transition-all duration-500"
                />
              ) : (
                <Image
                  src={`/Images/toggle_right_icon.svg`}
                  width={40}
                  height={40}
                  alt="Toggle right"
                  className="transition-all duration-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Delivery methods</h3>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center">
              <label>Email</label>
              <input
                type="radio"
                name="notificationType"
                value="email"
                checked={selectedOption === "email"}
                onChange={(e) => setSelectedOption(e.target.value)}
                required
                className="radio-button rounded-full"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>Push Notifications</label>
              <input
                type="radio"
                name="notificationType"
                value="push"
                checked={selectedOption === "push"}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="radio-button rounded-full"
                required
              />
            </div>
          </form>
        </div>

        <div className="flex items-start gap-3 text-white text-center">
          <button
            type="button"
            className="bg-backgroundSecondary border border-borderColor text-label w-1/2 py-2 rounded-lg capitalize cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`bg-formPrimary border border-formPrimary ${
              isLoading ? "opacity-30" : ""
            }   font-medium text-white 
              px-4 py-2 rounded-lg cursor-not-allowed transition-colors w-1/2`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
