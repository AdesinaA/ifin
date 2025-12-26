"use client";

import { useState } from "react";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import RefferalTableOption from "../others/RefferalTableOption";
import ReferralTree from "../others/RefferalTree";

// Icons
import { Copy } from "@phosphor-icons/react/dist/ssr";

const DashboardRefferals = ({ data }) => {
  const tabs = [
    { id: 0, name: `Table`, content: <RefferalTableOption data={data} /> },
    { id: 1, name: `Tree`, content: <ReferralTree data={data} /> },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const [isCopied, setIsCopied] = useState(false);

  const refferalLink = data?.user?.referralLink;
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(refferalLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <div
        className={`space-y-7 lg:pb-5 pt-3 md:pt-1 scrollable-box bg-greyBg relative  `}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <PagesHeader
              heading="Your Refferal Network"
              des="View and track all your refferal activities."
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                type="button"
                className={`py-2 px-5 w-1/2 md:w-auto rounded-md border ${
                  activeTab === tab.id
                    ? "bg-formPrimary text-white"
                    : "border-borderColor"
                } cursor-pointer transition-all duration-500`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className={`w-full space-y-2`}>
          <div className="flex justify-between">
            <label className="text-sm">Your Refferal link</label>
            {isCopied && (
              <p className="text-sm text-formPrimary">Link Copied!</p>
            )}
          </div>

          <div className="bg-[#F9F9F9] border border-formPrimary rounded-md p-2 flex flex-wrap items-center gap-2">
            <div className="flex-grow min-w-0">
              <span className="block truncate">{refferalLink}</span>
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

        <div>{tabs[activeTab].content}</div>
      </div>
    </>
  );
};

export default DashboardRefferals;
