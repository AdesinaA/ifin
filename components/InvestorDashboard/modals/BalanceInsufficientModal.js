import Image from "next/image";
import Link from "next/link";

import { X } from "@phosphor-icons/react/dist/ssr";

const BalanceInsufficientModal = ({ onClose, withdrawal }) => {
  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div
        className="bg-white px-5 py-10 md:p-10 rounded-xl w-[95%] md:w-[520px] overflow-scroll
       scrollable-box space-y-7 relative"
      >
        <div className="space-y-7">
          <Image
            src={`/Images/caution_icon.svg`}
            width={105}
            height={105}
            alt="Celebration Icon"
            className="mx-auto block"
          />

          {/* Haeder text content */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">
              {" "}
              {withdrawal
                ? "Insufficient Earning Balance"
                : "Insufficient Wallet Balance"}
            </h2>
            <p className="text-sm">
              {withdrawal
                ? `Oops! Your earning balance is insufficient to complete this withdrawal. 
                Please wait till your earnings accumulate to proceed or enter a
              value less than or equal to your earnigns.`
                : ` Oops! Your wallet balance is insufficient to complete this
              investment. Please add funds to your wallet to proceed or choose a
              package within your available balance.`}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div
          className={`flex items-start gap-3 
        text-white text-center ${withdrawal ? "justify-center" : ""}`}
        >
          <button
            type="button"
            className="bg-backgroundSecondary border border-borderColor text-label w-1/2 py-3 rounded-lg capitalize cursor-pointer"
            onClick={onClose}
          >
            Go back
          </button>
          {!withdrawal && (
            <Link
              href={`/dashboard/deposit`}
              className="bg-gold border border-formPrimary w-1/2 py-3 rounded-lg capitalize cursor-pointer"
            >
              Add Funds
            </Link>
          )}
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

export default BalanceInsufficientModal;
