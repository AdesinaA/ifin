"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CaretDown, Copy } from "@phosphor-icons/react/dist/ssr";

const DepositModal = ({ onClose, data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "0xB77438455dEA06b61390ef0d0f74Ec5FC9aA54b6";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    /* OVERLAY */
    <div className="fixed inset-0 bg-navy/70 backdrop-blur-sm flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="bg-white rounded-2xl w-[95%] md:w-[560px] max-h-[90vh] overflow-y-auto p-6 space-y-8 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-navy">
              Wallet deposit
            </h1>
            <p className="text-sm text-navyMuted">
              Send funds to your personal deposit address.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy/5 transition"
          >
            <X size={18} className="text-navy" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* Coin */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-navyMuted">
              Asset
            </label>
            <div className="border border-navy/10 rounded-lg py-2 px-3 flex items-center gap-2">
              <Image
                src="/Images/DogeCoinLogo.svg"
                width={20}
                height={20}
                alt="USDT"
              />
              <span className="text-sm font-medium text-navy">USDT</span>
            </div>
          </div>

          {/* Network */}
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-navyMuted">
              Network
            </label>
            <div className="border border-navy/10 rounded-lg py-2 px-3 flex justify-between items-center">
              <span className="text-sm text-navy">USDT</span>
              <CaretDown size={18} className="text-navyMuted" />
            </div>
          </div>

          {/* ADDRESS BLOCK */}
          <div className="border border-gold/30 rounded-xl p-4 bg-gold/5 space-y-2">

            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-navyMuted">
                Deposit address
              </span>
              {isCopied && (
                <span className="text-xs font-medium text-gold">
                  Address Copied
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 bg-white border border-navy/10 rounded-lg p-2">
              <span className="text-sm text-navy truncate flex-1">
                {walletAddress}
              </span>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-gold text-sm font-medium hover:opacity-80"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-4 text-xs text-navyMuted">

          <div className="space-y-2">
            <div className="flex justify-between border-b border-navy/10 pb-2">
              <span>Minimum deposit</span>
              <span className="font-medium text-navy">$1 USDT</span>
            </div>

            <div className="flex justify-between">
              <span>Deposit arrival</span>
              <span className="font-medium text-navy">14 confirmations</span>
            </div>

            <div className="flex justify-between">
              <span>Withdrawal unlocked</span>
              <span className="font-medium text-navy">32 confirmations</span>
            </div>
          </div>

          <div className="pt-3 border-t border-navy/10">
            <p className="font-medium text-navy mb-1">
              Important
            </p>
            <p>
              Only send <strong>USDT</strong> to this address.
              Other assets will not be credited and cannot be recovered.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DepositModal;