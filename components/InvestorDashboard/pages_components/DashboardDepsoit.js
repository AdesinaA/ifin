"use client";

// Library imports
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import TransactionTable from "../tables/TransactionTable";
import TransactionViewModal from "../modals/TransactionViewModal";

// Hooks
import useToggle from "@/hooks/UseToggle";

// Icons
import { CaretDown, Copy, Minus, Plus } from "@phosphor-icons/react/dist/ssr";

const DashboardDepsoit = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "0xB77438455dEA06b61390ef0d0f74Ec5FC9aA54b6";
  // session?.user?.depositAddress;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const items = [
    {
      title: "How does this Platform work?",
      content: `Users can create an account, choose from a selection of investment packages, deposit funds, and track their earnings. The platform also provides tools to manage transactions, view balances, and withdraw funds seamlessly.`,
    },
    {
      title: "What is the minimum amount I can invest?",
      content:
        "The minimum investment amount depends on the package you choose. For most packages, the starting amount is clearly listed in the package details.",
    },
    {
      title: "Can I invest in multiple packages at the same time?",
      content:
        "Yes, users are allowed to diversify their investments by selecting multiple packages simultaneously.",
    },
    {
      title: "What are the withdrawal Limits?",
      content:
        "Withdrawal limits vary based on your account type and the terms of your investment package. Specific details are listed in the 'Withdraw' section.",
    },
    {
      title: "Is my money safe on this platform?",
      content:
        "Yes, we prioritize your security. We use encryption, two-factor authentication (2FA), and comply with industry standards to protect your funds and personal data.",
    },
    {
      title: "What happens if I lose access to my account?",
      content:
        "If you lose access, contact our support team immediately. You will be required to verify your identity to regain access to your account.",
    },
  ];

  const [openItems, setOpenItems] = useState(items.map((item) => false));

  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) => {
      const newOpenItems = [...prevOpenItems];

      if (newOpenItems[index]) {
        newOpenItems[index] = false;
      } else {
        newOpenItems.fill(false);
        newOpenItems[index] = true;
      }

      return newOpenItems;
    });
  };

  const transactions = [
    {
      id: "1",
      date: "2025-01-08 19:56:12",
      network: "Deposit",
      qty: 32.19,
      address: "DFXxMWpbzzJwzoAVqv5UttTRmWA7pFy2pmahwv2RRrLoL",
      txid: "5nBrhxPURreLyh3DFKuYUcNihFzb5U5FnovjUWG8yQS6KuLp7xSFc7tCA6pbF6tWHxVV1GCNDt64oZm8HBtgd9U",
      status: "Active",
    },
    {
      id: "2",
      date: "2025-01-05 19:09:42",
      network: "Investment",
      qty: 89.34,
      address: "D5XMWpbzzJwzoAVqv5UttTRmWA7pFy2pmahwv2RRrLoL",
      txid: "5nBrhxPURreLyh3DFKuYUcNihFzb5U5FnovjUWG8yQS6KuLp7xSFc7tCA6pbF6tWHxVV1GCNDt64oZm8HBtgd9U",
      status: "Active",
    },
    {
      id: "3",
      date: "2025-01-01 20:32:27",
      network: "Withdrawal",
      qty: 464.76,
      address: "D5XMWpbzzJwzoAVqv5UttTRmWA7pFy2pmahwv2RRrLoL",
      txid: "5nBrhxPURreLyh3DFKuYUcNihFzb5U5FnovjUWG8yQS6KuLp7xSFc7tCA6pbF6tWHxVV1GCNDt64oZm8HBtgd9U",
      status: "Failed",
    },
  ];

  const { isOpen: isModalOpen, toggle: toggleModal } = useToggle();

  const [selectedTx, setSelectedTx] = useState(null);

  const handleToggle = (id) => {
    if (id === null) {
      setSelectedTx(null);
      toggleModal();
      return;
    }

    const selectedTransaction = transactions.find((tx) => tx.id === id);
    setSelectedTx(selectedTransaction);
    toggleModal();
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      <div
        className={`space-y-5 lg:pb-5 pt-3 md:pt-1 scrollable-box ${
          isModalOpen ? "h-[50vh] lg:h-screen overflow-hidden" : ""
        } bg-greyBg`}
      >
        {/* Header */}
        <div>
          <PagesHeader
            heading="Wallet Deposit"
            des="Here's an overview of your portfolio today."
          />
        </div>

        {/* Depost & faq */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-10 spacey-10 md:space-y-0">
          <div className="bg-white p-5 rounded-xl space-y-10 w-full">
            <div className="space-y-5">
              <div className="space-y-1 cursor-not-allowed">
                <label className="text-sm text-label">Coin</label>
                <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center">
                  <Image
                    src={`/Images/DogeCoinLogo.svg`}
                    width={22}
                    height={22}
                    alt="USDT logo"
                  />
                  <p>USDT</p>
                  <p className="text-sm text-grey">USDT</p>
                </div>
              </div>

              <div className="space-y-1 cursor-not-allowed">
                <label className="text-sm text-label">Select Network</label>
                <div className="border border-borderColor rounded-md py-2 px-3 flex gap-2 items-center justify-between">
                  <p>USDT</p>
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
                      <p className="text-sm text-formPrimary">
                        Address Copied!
                      </p>
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

            <div className="space-y-5">
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
                <h2 className="">Important</h2>
                <p className="text-grey">
                  Ensure that only USDT is sent to this address. Deposits made
                  in other cryptocurrencies will not be credited to your balance
                  and cannot be refunded.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="xl:w-1/2 w-full space-y-3">
            <h2>Faq</h2>

            <div className="space-y-3 mx-auto">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`border-[0.5px] border-[#D2D3D880] bg-white p-5 rounded-md space-y-2 ${
                    openItems[index] ? "active" : ""
                  }`}
                >
                  <div
                    className="flex justify-between"
                    onClick={() => toggleItem(index)}
                  >
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    {openItems[index] ? <Minus /> : <Plus />}
                  </div>

                  {openItems[index] && (
                    <div className="">
                      <p className="text-sm text-faded">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Transaction */}
        {/* <div>
          <TransactionTable
            transactions={transactions}
            handleDetailsToggle={handleToggle}
          />
        </div> */}
      </div>

      {isModalOpen && (
        <TransactionViewModal
          selectedTx={selectedTx}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default DashboardDepsoit;
