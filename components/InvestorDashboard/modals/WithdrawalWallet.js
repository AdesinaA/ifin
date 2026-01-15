"use client";

// Library imports
import { useState } from "react";
import Image from "next/image";

// Components
import Input from "@/components/Auth/Input";

// Icons
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

const WithdrawalWallet = ({ onClose }) => {
  const [formData, setFormData] = useState({
    amount: "",
    wallet_address: "",
  });
  const handleFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="absolute inset-0 bg-gray-200/60 flex items-center overflow-hidden justify-center z-50">
      <div className="bg-backgroundPrimary md:p-10 px-5 py-10 rounded-xl w-[95%] md:w-[580px] overflow-scroll scrollable-box space-y-10">
        <h2 className="text-center font-medium text-xl">
          Set Your Withdrawal Wallet Address
        </h2>

        <form className="space-y-10">
          <div className="space-y-5">
            <div className="space-y-1 cursor-not-allowed">
              <label className="text-sm text-label">Coin</label>
              <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center">
                <Image
                  src={`/Images/DogeCoinLogo.svg`}
                  width={22}
                  height={22}
                  alt="Usdt logo"
                />
                <p>USDT</p>
                <p className="text-sm text-grey">Usdt</p>
              </div>
            </div>

            <div className="space-y-1 cursor-not-allowed">
              <label className="text-sm text-label">Select Network</label>
              <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center justify-between">
                <p>USDT</p>
                <CaretDown size={20} className="text-grey" />
              </div>
            </div>

            <Input
              label="Wallet Address"
              type="text"
              name="wallet_address"
              id="wallet_address"
              placeholder="Paste/Enter your USDT wallet address here"
              onChange={handleFormInput}
            />

            <div className="bg-[#FEF6E7] text-[#C57D00] rounded-md text-xs space-y-2 p-3">
              <h4 className="font-medium">Important</h4>

              <p>
                Double-check the wallet address to ensure accuracy, as
                transactions to incorrect addresses cannot be reversed. Ensure
                that the selected wallet and network support the cryptocurrency
                for seamless withdrawals. For added security, only link wallets
                you own and control.
              </p>
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
                className={`w-1/2 bg-formPrimary border border-formPrimary font-medium
            text-white px-7 py-2 rounded-lg ${
              formData?.wallet_address !== ""
                ? ""
                : "opacity-30 cursor-not-allowed"
            } transition-colors `}
                disabled={formData?.wallet_address === ""}
              >
                Add Wallet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalWallet;
