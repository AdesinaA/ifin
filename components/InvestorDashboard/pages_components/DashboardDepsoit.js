"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import TransactionViewModal from "../modals/TransactionViewModal";

// Hooks
import useToggle from "@/hooks/UseToggle";

// Icons
import { CaretDown, Copy } from "@phosphor-icons/react/dist/ssr";

const DashboardDeposit = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const walletAddress =
    "0xB77438455dEA06b61390ef0d0f74Ec5FC9aA54b6";

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const { isOpen: isModalOpen, toggle: toggleModal } = useToggle();
  const [selectedTx, setSelectedTx] = useState(null);

  if (status === "loading") return null;

  return (
    <>
      <div className="space-y-8 pt-3 pb-10 bg-greyBg">

        {/* Header */}
        <PagesHeader
          heading="Wallet deposit"
          des="Send USDT to your assigned wallet address to fund your account."
        />

        {/* Deposit panel */}
        <section className="bg-white rounded-2xl border border-navy/10 p-6 space-y-8 max-w-3xl">

          {/* Editorial intro */}
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gold">
              Deposit details
            </p>
            <h3 className="text-sm font-medium text-navy">
              USDT wallet information
            </h3>
          </div>

          {/* Coin */}
          <div className="space-y-1">
            <label className="text-xs text-navyMuted uppercase">
              Asset
            </label>
            <div className="border border-navy/10 rounded-md px-3 py-2 flex items-center gap-2 bg-white">
              <Image
                src="/Images/DogeCoinLogo.svg"
                width={20}
                height={20}
                alt="USDT"
              />
              <span className="font-medium text-navy">USDT</span>
              <span className="text-xs text-navyMuted">Tether</span>
            </div>
          </div>

          {/* Network */}
          <div className="space-y-1">
            <label className="text-xs text-navyMuted uppercase">
              Network
            </label>
            <div className="border border-navy/10 rounded-md px-3 py-2 flex justify-between items-center bg-white">
              <span className="text-navy">USDT (TRC20)</span>
              <CaretDown size={16} className="text-navyMuted" />
            </div>
          </div>

          {/* Wallet address */}
          <div className="border border-gold/30 rounded-xl p-4 bg-white space-y-3">

            <div className="flex justify-between items-center">
              <p className="text-xs uppercase tracking-wide text-gold">
                Wallet address
              </p>
              {isCopied && (
                <span className="text-xs text-gold">
                  Copied
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 bg-[#FAFAFA] border border-navy/10 rounded-md px-3 py-2">
              <span className="text-sm text-navy truncate flex-1">
                {walletAddress}
              </span>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-gold text-sm font-medium"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
          </div>

          {/* Rules */}
          <div className="grid sm:grid-cols-2 gap-6 text-sm">

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wide text-navyMuted">
                Deposit conditions
              </h4>

              <ul className="space-y-1 text-navy">
                <li className="flex justify-between">
                  <span>Minimum deposit</span>
                  <strong>$1 USDT</strong>
                </li>
                <li className="flex justify-between">
                  <span>Deposit arrival</span>
                  <strong>14 confirmations</strong>
                </li>
                <li className="flex justify-between">
                  <span>Withdrawal unlock</span>
                  <strong>32 confirmations</strong>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wide text-navyMuted">
                Important
              </h4>
              <p className="text-navyMuted leading-relaxed">
                Only USDT sent to this address will be credited.
                Deposits made in other assets cannot be recovered.
              </p>
            </div>
          </div>

        </section>
      </div>

      {isModalOpen && (
        <TransactionViewModal
          selectedTx={selectedTx}
          handleToggle={toggleModal}
        />
      )}
    </>
  );
};

export default DashboardDeposit;