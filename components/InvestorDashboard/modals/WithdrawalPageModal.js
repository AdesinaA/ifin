"use client";

import { useState } from "react";

import Image from "next/image";
import GeneralLoader from "@/components/GenreralLoader";
import Link from "next/link";

import { X } from "@phosphor-icons/react/dist/ssr";

const WithdrawalPageModal = ({
  onClose,
  handleSubmit,
  isSucces,
  isLoading,
}) => {
  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      {isLoading ? (
        <div
          className="bg-backgroundSecondary px-5 py-10 md:px-10 md:pt-20 md:pb-10 rounded-xl w-[95%] md:w-[450px] overflow-scroll
  scrollable-box relative"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-formPrimary mx-auto mb-20"></div>

          <div className="space-y-5">
            <p className="text-center text-xl font-medium">
              Transaction Pending
            </p>

            <Link
              href={`/`}
              className="text-formPrimary text-xs text-center block"
            >
              View on Explorer
            </Link>

            <button
              type="button"
              className="bg-backgroundSecondary border
             border-borderColor text-label w-1/2 py-3 rounded-lg capitalize cursor-pointer text-center block mx-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          {isSucces ? (
            <div
              className="bg-backgroundSecondary px-5 py-10 md:pt-10 md:pb-5 md:px-10 rounded-xl w-[95%] md:w-[520px] h-[500px] md:h-auto overflow-scroll
           scrollable-box space-y-7 relative"
            >
              {/* Haeder */}
              <div className="space-y-7">
                <Image
                  src={`/Images/celebration_icon.svg`}
                  width={150}
                  height={130}
                  alt="Celebration Icon"
                  className="mx-auto block"
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-medium">Withdrawal Successful</h2>
                <p>
                  Your funds have been successfully sent to the provided wallet
                  address.
                </p>
                <p>Transaction ID: </p>
              </div>

              <div className="space-y-5 text-center">
                <p>
                  Funds should reflect in your wallet shortly. If you encounter
                  any issues, please reach out to our support team.
                </p>
                <button
                  type="button"
                  href={`/dashboard/deposit`}
                  className="bg-formPrimary border border-formPrimary w-full py-3 rounded-lg capitalize cursor-pointer"
                  onClick={onClose}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <div
              className="bg-backgroundSecondary px-5 py-10 md:p-10 rounded-xl w-[95%] md:w-[450px] overflow-scroll
       scrollable-box space-y-7 relative"
            >
              <div className="space-y-7">
                <Image
                  src={`/Images/wwarning_yellow.svg`}
                  width={105}
                  height={105}
                  alt="Celebration Icon"
                  className="mx-auto block"
                />

                {/* Haeder text content */}
                <div className="space-y-2 text-center">
                  <h2 className="text-xl font-medium">Important Information</h2>
                  <p className="text-sm">
                    Before proceeding, please ensure that your destination
                    platform supports USDT and the selected network
                    type. Transactions are irreversible, and incorrect details
                    may result in the loss of funds.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-start gap-3 text-white text-center">
                <button
                  type="button"
                  className="bg-backgroundSecondary border border-borderColor text-label w-1/2 py-3 rounded-lg capitalize cursor-pointer"
                  onClick={onClose}
                >
                  Go back
                </button>
                <button
                  type="button"
                  className="bg-formPrimary border border-formPrimary w-1/2 py-3 rounded-lg capitalize cursor-pointer"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>

              <div
                className="w-10 h-10 rounded-full flex justify-center items-center bg-backgroundSecondary border
           border-borderColor/50 cursor-pointer absolute top-0 right-5"
                onClick={onClose}
              >
                <X size={20} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WithdrawalPageModal;
