"use client";

import { useState, useEffect } from "react";

// Components
import PagesHeader from "@/components/Landing/Layouts/PagesHeader";
import RefferalTableOption from "../others/RefferalTableOption";
import ReferralTree from "../others/RefferalTree";
import OverviewStatisticsCard from "../cards/OverviewStatisticsCard";
import ReferralEarningsHistory from "../others/ReferralEarningsHistory";
import ReferralAnalytics from "../others/ReferralAnalytics";



// Icons
import { Copy } from "@phosphor-icons/react/dist/ssr";

const DashboardRefferals = ({ data }) => {
  /* =======================
     TAB CONFIG
  ======================== */

  const [directReferrals, setDirectReferrals] = useState(0);
  const [networkSize, setNetworkSize] = useState(0);
    
  const [activeTab, setActiveTab] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const tabs = [
    {
      id: 0,
      name: "List",
      enabled: true,
      content: ( <RefferalTableOption 
        data={data}
        onCount={setDirectReferrals} 
        />
      )
    },
    {
      id: 1,
      name: "Tree",
      enabled: true,
      content: ( <ReferralTree 
        data={data}
        onCount={setNetworkSize} 
        />
      )
    },
    {
      id: 2,
      name: "Earnings",
      enabled: false,
      content: <ReferralEarningsHistory data={data} />,
    },
    {
      id: 3,
      name: "Analytics",
      enabled: false,
      content: <ReferralAnalytics data={data} />,
    },
  ];


  const referralLink = data?.user?.referralLink;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="space-y-8 lg:pb-5 pt-3 scrollable-box bg-greyBg">
      {/* HEADER */}
      <PagesHeader
        heading="Network"
        des="Invite people you trust and manage your growing network."
      />

      {/* REFERRAL SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <OverviewStatisticsCard
          heading="Referral Earnings"
          des={data?.user?.referralEarnings || 0}
        >
          <p>USDT</p>
        </OverviewStatisticsCard>

        <OverviewStatisticsCard
          heading="Direct Referrals"
          des={directReferrals}
        />

       {/* <OverviewStatisticsCard
          heading="Network Size"
          des={networkSize}
        /> */}
      </div>

      {/* INVITE CARD */}
      <section className="bg-backgroundPrimary rounded-xl p-5 space-y-3 max-w-2xl">
        <div>
          <h3 className="text-sm font-medium">Invite people</h3>
          <p className="text-sm text-grey">
            Share your invite link to bring people into your network.
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 border rounded-lg px-3 py-2 bg-[#F9FAFB]">
          <span className="truncate text-sm font-medium text-[#344054]">
            {referralLink}
          </span>

          <button
            onClick={copyToClipboard}
            className="text-sm font-medium text-formPrimary flex items-center gap-1"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>

        {isCopied && (
          <p className="text-xs text-green-600 font-medium">
            Link copied successfully
          </p>
        )}
      </section>

      {/* NETWORK VIEWS */}
      <section className="bg-backgroundPrimary rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Your network</h3>
            <p className="text-sm text-grey">
              People who joined using your invite link.
            </p>
          </div>

          {/* TAB SWITCH */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                disabled={!tab.enabled}
                onClick={() => tab.enabled && setActiveTab(tab.id)}
                className={`px-4 py-1.5 text-sm rounded-md border transition
                  ${
                    activeTab === tab.id && tab.enabled
                      ? "bg-formPrimary text-white"
                      : "border-borderColor text-[#344054]"
                  }
                  ${
                    !tab.enabled
                      ? "opacity-40 cursor-not-allowed bg-gray-100"
                      : ""
                  }
                `}
              >
                {tab.name === "List"
                  ? "Direct Referrals"
                  : tab.name === "Tree"
                  ? "Network Structure"
                  : tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        {tabs[activeTab] && tabs[activeTab].enabled === true && (
          <div className="pt-4">{tabs[activeTab].content}</div>
        )}
          
      </section>
    </div>
  );
};

export default DashboardRefferals;