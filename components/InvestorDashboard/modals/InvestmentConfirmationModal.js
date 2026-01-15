import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import { X } from "@phosphor-icons/react/dist/ssr";

const InvestmentConfirmationModal = ({
  onClose,
  pkg,
  maturityDate,
  handleBack,
}) => {
  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div
        className="bg-backgroundSecondary px-5 py-10 md:p-10 rounded-xl w-[95%] md:w-[520px] h-[500px] md:h-auto overflow-scroll
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

          {/* Haeder text content */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">Investment Confirmed</h2>
            <p className="text-white">
              Your investment has been successfully
              processed. Thank you for trusting us to grow your portfolio
            </p>
          </div>
        </div>

        {/* Payment summary */}
        <div className="bg-backgroundSecondary rounded-xl p-5 space-y-5">
          <h3 className="text-white text-sm">Payment Summary</h3>

          <div className="space-y-3">
            {/* Package name */}
            <div className="flex items-center justify-between text-white">
              <h4 className="text-grey">Package Name</h4>
              <p className="font-medium">{pkg?.package_name}</p>
            </div>

            {/* Amount invested */}
            <div className="flex items-center justify-between text-white">
              <h4 className="text-grey">Amount Invested</h4>
              <p className="font-medium">{pkg?.invested_amount}</p>
            </div>

            {/* Expected return */}
            <div className="flex items-center justify-between text-white">
              <h4 className="text-grey">Expected Returns</h4>
              <p className="font-medium">{pkg?.package_return}</p>
            </div>

            {/* ROI */}
            <div className="flex items-center justify-between text-white">
              <h4 className="text-grey">ROI</h4>
              <p className="font-medium">{pkg?.roi}</p>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between text-white">
              <h4 className="text-grey">Duration</h4>
              <p className="font-medium">{pkg?.duration} Weeks</p>
            </div>

            {/* Maturity Date */}
            <div className="flex items-center justify-between text-white">
              <h4 className="text-grey">Maturity Date</h4>
              <p className="font-medium">{maturityDate}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-start gap-3 text-white text-center">
          <button
            type="button"
            className="bg-backgroundSecondary border border-borderColor text-label w-1/2 py-3 rounded-lg capitalize cursor-pointer"
            onClick={handleBack}
          >
            Invest Again
          </button>
          <Link
            href={`/dashboard/investments`}
            className="bg-formPrimary border border-formPrimary w-1/2 py-3 rounded-lg capitalize cursor-pointer"
          >
            View Investment
          </Link>
        </div>

        <div
          className="w-10 h-10 rounded-full flex justify-center items-center bg-backgroundSecondary border
           border-borderColor/50 cursor-pointer absolute top-0 right-5"
          onClick={onClose}
        >
          <X size={20} />
        </div>
      </div>
    </div>
  );
};

export default InvestmentConfirmationModal;
