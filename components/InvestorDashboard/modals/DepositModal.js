"use client";

// Library imports
import { useState } from "react";
import Image from "next/image";

// Icons
import { X, CaretDown, Copy } from "@phosphor-icons/react/dist/ssr";

const DepositModal = ({ onClose, data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "0xB77438455dEA06b61390ef0d0f74Ec5FC9aA54b6";
  // data?.user?.depositAddress;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-white p-5 rounded-xl w-[95%] md:w-[550px] h-[500px] md:h-auto overflow-scroll scrollable-box space-y-7">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-medium">Wallet Deposit</h1>
            <p className="text-sm">
              Here&apos;s an overview of your portfolio today.
            </p>
          </div>

          {/* Cancel */}
          <div
            className="w-10 h-10 rounded-full flex justify-center items-center bg-white border border-gray-200/50 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5">
          <div className="space-y-1 cursor-not-allowed">
            <label className="text-sm text-label">Coin</label>
            <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center">
              <Image
                src={`/Images/DogeCoinLogo.svg`}
                width={22}
                height={22}
                alt="usdt logo"
              />
              <p>USDT</p>
              <p className="text-sm text-grey">USDT</p>
            </div>
          </div>

          <div className="space-y-1 cursor-not-allowed">
            <label className="text-sm text-label">Select Network</label>
            <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center justify-between">
              <p>Usdt</p>
              <CaretDown size={20} className="text-grey" />
            </div>
          </div>

          <div className="border border-borderColor rounded-md p-3 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* <Image
              src={`/Images/depost_qr.svg`}
              width={100}
              height={100}
              alt="Deposit wallet QR Code"
              className="flex-shrink-0 mx-auto"
            /> */}

            <div className="space-y-2 w-full">
              <div className="flex justify-between">
                <label className="text-sm">Usdtaddress</label>
                {isCopied && (
                  <p className="text-sm text-formPrimary">Address Copied!</p>
                )}
              </div>

              <div className="bg-[#F9F9F9] rounded-md p-2 flex flex-wrap items-center gap-2">
                <div className="flex-grow min-w-0">
                  <span className="block truncate">{walletAddress}</span>
                </div>

                <button
                  type="button"
                  className="flex-shrink-0 text-formPrimary flex items-center gap-1"
                  onClick={copyToClipboard}
                >
                  <Copy size={20} />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-b-borderColor">
              <h2 className=" text-grey">Minimum deposit</h2>
              <span className="font-medium ">$1 worth of USDT</span>
            </div>

            <div className="flex justify-between items-center">
              <h2 className=" text-grey">Deposit Arrival</h2>
              <span className="font-medium ">14 confirmations</span>
            </div>

            <div className="flex justify-between items-center">
              <h2 className=" text-grey">Withdrawal Unlocked</h2>
              <span className="font-medium ">32 confirmations</span>
            </div>
          </div>

          <div className="text-xs">
            <h2 className="font-medium">Important</h2>
            <p className="text-grey">
              Ensure that only USDT is sent to this address. Deposits made in
              other cryptocurrencies will not be credited to your balance and
              cannot be refunded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
